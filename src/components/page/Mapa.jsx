import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import reporteService from '../../services/reporteService'

const iconoDefault = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function Mapa() {
  const [reportes, setReportes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        setLoading(true)
        const data = await reporteService.listarReportes()
        setReportes(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error al cargar reportes:", error)
        setReportes([])
      } finally {
        setLoading(false)
      }
    }
    obtenerDatos()
  }, [])

  const extraerCoordenadas = (textoDireccion) => {
    if (!textoDireccion) return null;

    try {
      const coincidencias = textoDireccion.match(/-?\d+\.\d+/g);

      if (coincidencias && coincidencias.length >= 2) {
        return {
          lat: parseFloat(coincidencias[0]),
          lng: parseFloat(coincidencias[1])
        };
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  return (
    <div style={{ padding: '28px' }}>
      <h2 style={{ marginBottom: '8px' }}>🗺️ Mapa de Emergencias</h2>
      <p style={{ color: '#888', marginBottom: '16px' }}>
        {loading 
          ? 'Conectando con la base de datos...' 
          : `Se han encontrado ${reportes.length} registros en el sistema.`}
      </p>

      <div style={{ height: '550px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <MapContainer
          center={[-33.7000, -71.2167]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {reportes.map((reporte) => {
            const coords = extraerCoordenadas(reporte.direccion);
            if (!coords) return null;

            return (
              <Marker 
                key={reporte.id} 
                position={[coords.lat, coords.lng]} 
                icon={iconoDefault}
              >
                <Popup>
                  <div style={{ minWidth: '180px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#e63946' }}>🔥 Incendio #{reporte.id}</h4>
                    <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>Sector:</strong> {reporte.sector || 'No especificado'}</p>
                    <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>Referencia:</strong> {reporte.referencia}</p>
                    <hr style={{ border: '0.1px solid #eee' }} />
                    <p style={{ fontSize: '12px', color: '#555', fontStyle: 'italic' }}>
                      {reporte.observaciones || 'Sin observaciones adicionales.'}
                    </p>
                    <p style={{ fontSize: '10px', color: '#aaa', textAlign: 'right', marginTop: '8px' }}>
                      {reporte.fecha} - {reporte.hora}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  )
}