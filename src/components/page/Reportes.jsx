import { useState, useEffect } from 'react'
import '../styles/reportes.css'

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

  const handleGenerarReporte = () => {
    if (!form.direccion.trim()) {
      alert('Por favor ingresa la dirección del incendio.')
      return
    }

    const reporte = `
===================================================
   REPORTE OFICIAL DE INCENDIO
   Cuerpo de Bomberos — Municipalidad Valle del Sol
===================================================
Fecha: ${form.fecha}          Hora: ${form.hora}

UBICACIÓN
  Dirección : ${form.direccion}
  Sector    : ${form.sector || '—'}
  Referencia: ${form.referencia || '—'}

OBSERVACIONES
  ${form.observaciones || 'Sin observaciones adicionales.'}

===================================================
    `.trim()

    const ventana = window.open('', '_blank')
    ventana.document.write(
      `<pre style="font-family:monospace;padding:2rem;white-space:pre-wrap;">${reporte}</pre>`
    )
    ventana.document.close()
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

        <div className="actions">
          <button className="btn-secondary" onClick={handleLimpiar}>
            ↺ Limpiar
          </button>
          <button className="btn-primary" onClick={handleGenerarReporte}>
             Generar reporte
          </button>
        </div>

      </div>
    </div>
  )
}
