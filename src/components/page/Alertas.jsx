import { useState, useEffect } from 'react';
import reporteService from '../../services/reporteService';
import { useAuth } from '../../context/AuthContext';
import '../styles/reportes.css'; // Podemos reusar algunos estilos

export default function Alertas() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Obtenemos el usuario para saber su rol

  // Función para cargar los reportes desde el backend
  const cargarReportes = async () => {
    try {
      setLoading(true);
      const data = await reporteService.listarReportes();
      setReportes(data);
    } catch (error) {
      console.error("Error al obtener los reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar reportes al abrir la pantalla
  useEffect(() => {
    cargarReportes();
  }, []);

  // Función para que los bomberos/admin cambien el estado
  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await reporteService.cambiarEstado(id, nuevoEstado);
      alert(`El estado del reporte fue cambiado a ${nuevoEstado}`);
      cargarReportes(); // Recargar la lista para ver el cambio
    } catch (error) {
      alert("Error al actualizar el estado: " + error.message);
    }
  };

  // Función para eliminar un reporte
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este reporte? Esta acción no se puede deshacer.")) {
      try {
        await reporteService.eliminarReporte(id);
        alert("Reporte eliminado exitosamente.");
        cargarReportes(); // Recargar la lista tras eliminar
      } catch (error) {
        alert("Error al eliminar el reporte: " + error.message);
      }
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="header">
          <div>
            <p className="header-title">Panel de Alertas</p>
            <p className="header-sub">Listado de emergencias y reportes activos</p>
          </div>
          <button className="btn-secondary" onClick={cargarReportes}>
            ↻ Actualizar
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Cargando reportes...</p>
        ) : reportes.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>No hay reportes de incendios en este momento.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {reportes.map((reporte) => (
              <div
                key={reporte.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: reporte.estado === 'ACTIVO' ? '#fff5f5' : '#f5fff5'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#e24b4a' }}>📍 {reporte.direccion}</h3>
                    <p><strong>Sector:</strong> {reporte.sector} | <strong>Fecha:</strong> {reporte.fecha} a las {reporte.hora}</p>
                    <p><strong>Detalles:</strong> {reporte.observaciones}</p>
                    <p><strong>Reportado por:</strong> {reporte.usuarioNombre || 'Usuario Anónimo'} (ID: {reporte.usuarioId})</p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      backgroundColor: reporte.estado === 'ACTIVO' ? '#ffe5e5' : '#e5ffe5',
                      color: reporte.estado === 'ACTIVO' ? '#e24b4a' : '#1d9e75',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      Estado: {reporte.estado}
                    </span>

                    {/* RENDERIZADO CONDICIONAL POR ROL */}
                    {/* Solo ADMIN o FUNCIONARIO ven estos botones */}
                    {(user?.rol === 'ADMIN' || user?.rol === 'FUNCIONARIO') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {reporte.estado === 'ACTIVO' && (
                          <>
                            <button
                              onClick={() => handleCambiarEstado(reporte.id, 'CONTROLADO')}
                              style={{ padding: '5px 10px', backgroundColor: '#1d9e75', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              ✓ Marcar Controlado
                            </button>
                            <button
                              onClick={() => handleCambiarEstado(reporte.id, 'FALSA_ALARMA')}
                              style={{ padding: '5px 10px', backgroundColor: '#ef9f27', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              ✕ Falsa Alarma
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleEliminar(reporte.id)}
                          style={{ padding: '5px 10px', backgroundColor: '#e24b4a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}
                        >
                          🗑️ Eliminar Reporte
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
