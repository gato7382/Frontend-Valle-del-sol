import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import reporteService from '../../services/reporteService'
import { useAuth } from '../../context/AuthContext'
import '../styles/reportes.css'

// Configuración del icono de Leaflet
const iconoDefault = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

// Componente para capturar el clic en el mapa
function ClickHandler({ onUbicacionSeleccionada }) {
  useMapEvents({
    click(e) {
      onUbicacionSeleccionada(e.latlng.lat, e.latlng.lng);
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
  latitud: null,
  longitud: null
}

export default function Reportes() {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  // Efecto para inicializar fecha y hora actual
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

  // Maneja la selección de ubicación (solo permite una a la vez)
  const handleUbicacion = (lat, lon) => {
    setForm(prev => ({
      ...prev,
      latitud: lat,
      longitud: lon,
      direccion: `Ubicación GPS: ${lat.toFixed(6)}, ${lon.toFixed(6)}`
    }));
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

  const handleGenerarReporte = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para generar un reporte.')
      return
    }
    if (!form.latitud || !form.longitud) {
      alert('Por favor, selecciona la ubicación exacta en el mapa.')
      return
    }

    setLoading(true)
    try {
      // Enviamos el objeto 'form' que ya incluye latitud y longitud
      const nuevoReporte = await reporteService.crearReporte(form)
      alert(`¡Reporte #${nuevoReporte.id} creado con éxito!`)
      handleLimpiar()
    } catch (error) {
      console.error('Error al crear reporte:', error)
      alert(error.message || 'Error al conectar con el servidor')
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
            <p className="header-sub">Cuerpo de Bomberos — Valle del Sol</p>
          </div>
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Fecha</label>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Hora del incidente</label>
            <input type="time" name="hora" value={form.hora} onChange={handleChange} />
          </div>
        </div>

        <div className="field">
          <label>📍 Dirección / Coordenadas</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Haz clic en el mapa para marcar la ubicación"
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
              placeholder="Ej: Sector Norte"
            />
          </div>
          <div className="field">
            <label>Referencia</label>
            <input
              type="text"
              name="referencia"
              value={form.referencia}
              onChange={handleChange}
              placeholder="Ej: Frente al colegio"
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
            placeholder="Detalles del incidente..."
          />
        </div>

        <div className="field">
          <label>🗺️ Mapa de ubicación (Haz clic para posicionar el foco)</label>
          <div className="mapa-wrapper">
            <MapContainer
              center={[-33.6897, -71.2128]}
              zoom={13}
              style={{ height: '350px', width: '100%', borderRadius: '12px', border: '2px solid #333' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              
              <ClickHandler onUbicacionSeleccionada={handleUbicacion} />

              {/* Solo renderiza el marcador si hay coordenadas seleccionadas */}
              {form.latitud && form.longitud && (
                <Marker position={[form.latitud, form.longitud]} icon={iconoDefault}>
                  <Popup>
                    <strong>Foco del incendio</strong> <br />
                    Lat: {form.latitud.toFixed(4)} <br />
                    Lon: {form.longitud.toFixed(4)}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>

        <div className="actions">
          <button className="btn-secondary" onClick={handleLimpiar} disabled={loading}>
            ↺ Limpiar
          </button>
          <button className="btn-primary" onClick={handleGenerarReporte} disabled={loading}>
            {loading ? 'Procesando...' : 'Generar Reporte'}
          </button>
        </div>

      </div>
    </div>
  )
}