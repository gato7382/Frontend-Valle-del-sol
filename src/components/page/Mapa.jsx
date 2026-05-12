import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

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

export default function Mapa() {
  const [alertas, setAlertas] = useState([])

  return (
    <div style={{ padding: '28px' }}>
      <h2 style={{ marginBottom: '8px' }}>🗺️ Mapa de Emergencias</h2>
      <p style={{ color: '#888', marginBottom: '16px' }}>
        {alertas.length === 0
          ? 'Haz clic en el mapa para marcar un foco.'
          : `${alertas.length} foco(s) activo(s).`}
      </p>
      <div style={{ height: '500px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
        <MapContainer
          center={[-33.7000, -71.2167]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <ClickHandler onAgregar={(nueva) => setAlertas(prev => [...prev, nueva])} />
          {alertas.map(alerta => (
            <Marker key={alerta.id} position={[alerta.lat, alerta.lon]} icon={iconoDefault}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>🔥 Foco activo</p>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                    {alerta.lat.toFixed(5)}, {alerta.lon.toFixed(5)}
                  </p>
                  <button
                    onClick={() => setAlertas(prev => prev.filter(a => a.id !== alerta.id))}
                    style={{
                      background: '#cc3300',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
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
  )
}