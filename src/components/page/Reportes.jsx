import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import reporteService from '../../services/reporteService'
import { useAuth } from '../../context/AuthContext'
import '../styles/reportes.css'

const iconoDefault = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function ClickHandler({ onAgregar }) {
  useMapEvents({
    click(e) {
      onAgregar({
        id: Date.now(),
        lat: e.latlng.lat,
        lon: e.latlng.lng,
      })
    }
  })
  return null
}

const initialState = {
  fecha: '',
  hora: '',
  direccion: '',
  sector: '',
  referencia: '',
  observaciones: '',
}

export default function Reportes() {
  const [form, setForm] = useState(initialState)
  const [alertas, setAlertas] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const now = new Date()
    const pad = n => String(n).padStart(2, '0')
    setForm(prev => ({
      ...prev,
      fecha: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
      hora: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    }))
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleLimpiar = () => {
    const now = new Date()
    const pad = n => String(n).padStart(2, '0')
    setForm({
      ...initialState,
      fecha: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
      hora: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    })
  }

  const agregarAlerta = (nueva) => {
    setAlertas(prev => [...prev, nueva])
  }

  const eliminarAlerta = (id) => {
    setAlertas(prev => prev.filter(a => a.id !== id))
  }

  const handleGenerarReporte = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para generar un reporte.')
      return
    }
    if (!form.direccion.trim()) {
      alert('Por favor ingresa la dirección del incendio.')
      return
    }

    setLoading(true)
    try {
      const nuevoReporte = await reporteService.crearReporte(form)
      alert(`¡Reporte #${nuevoReporte.id} creado con éxito! Estado: ${nuevoReporte.estado}`)
      handleLimpiar()
    } catch (error) {
      console.error('Error al crear reporte:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <div>
            <p className="header-title">Nuevo reporte de incendio</p>
            <p className="header-sub">Cuerpo de Bomberos — Municipalidad Valle del Sol</p>
          </div>
        </div>

        <div className="field">
          <label>Hora del incidente</label>
          <input type="time" name="hora" value={form.hora} onChange={handleChange} />
        </div>

        <div className="field">
          <label>📍 Dirección del incendio</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Ej: Av. Principal 1234, Villa Valle del Sol"
          />
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Sector / Barrio</label>
            <input
              type="text"
              name="sector"
              value={form.sector}
              onChange={handleChange}
              placeholder="Sector o barrio"
            />
          </div>
          <div className="field">
            <label>Referencia</label>
            <input
              type="text"
              name="referencia"
              value={form.referencia}
              onChange={handleChange}
              placeholder="Punto de referencia"
            />
          </div>
        </div>

        <div className="field">
          <label>Observaciones adicionales</label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            rows={3}
            placeholder="Descripción del estado actual, materiales involucrados, condiciones del lugar..."
          />
        </div>

        {/* ── MAPA ── */}
        <div className="field">
          <label>🗺️ Mapa de focos — haz clic para marcar, abre el marcador para quitar</label>
          <p className="mapa-hint">
            {alertas.length === 0
              ? 'Sin focos marcados aún.'
              : `${alertas.length} foco(s) activo(s) en el mapa.`}
          </p>
          <div className="mapa-wrapper">
            <MapContainer
              center={[-33.6897, -71.2128]}
              zoom={13}
              style={{ height: '400px', width: '100%', borderRadius: '8px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <ClickHandler onAgregar={agregarAlerta} />
              {alertas.map(alerta => (
                <Marker key={alerta.id} position={[alerta.lat, alerta.lon]} icon={iconoDefault}>
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>🔥 Foco activo</p>
                      <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        {alerta.lat.toFixed(5)}, {alerta.lon.toFixed(5)}
                      </p>
                      <button
                        onClick={() => eliminarAlerta(alerta.id)}
                        style={{
                          background: '#cc3300',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        ✕ Quitar foco
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="actions">
          <button className="btn-secondary" onClick={handleLimpiar} disabled={loading}>
            ↺ Limpiar
          </button>
          <button className="btn-primary" onClick={handleGenerarReporte} disabled={loading}>
            {loading ? 'Enviando...' : 'Generar reporte'}
          </button>
        </div>

      </div>
    </div>
  )
}