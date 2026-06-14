import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import Reportes from '../page/Reportes'
import { useAuth } from '../../context/AuthContext'
import reporteService from '../../services/reporteService'

// Objeto temporal que guarda el manejador de eventos del mapa.
// Se usa para simular un clic en el mapa durante las pruebas.
const clickHandlers = { handlers: null }

// Mock del hook useAuth del contexto de autenticación.
// Esto evita depender de la implementación real de AuthContext.
vi.mock('../../context/AuthContext', () => {
  const useAuthMock = vi.fn()
  return {
    useAuth: useAuthMock,
  }
})

// Mock del servicio de reportes para interceptar llamadas a crearReporte.
// Así podemos comprobar si la función se llama sin hacer peticiones HTTP reales.
vi.mock('../../services/reporteService', () => {
  return {
    default: {
      crearReporte: vi.fn(),
    },
  }
})

// Mock de los componentes de react-leaflet usados en Reportes.
// Reemplazamos el mapa por elementos simples para no depender de Leaflet en la prueba.
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, ...props }) => (
    <div data-testid="map" {...props}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMapEvents: (handlers) => {
    clickHandlers.handlers = handlers
    return null
  },
}))

// Mock de Leaflet para que el constructor Icon exista durante la importación.
// No necesitamos la funcionalidad completa de Leaflet en estos tests.
vi.mock('leaflet', () => ({
  default: {
    Icon: class Icon {
      constructor() {
        return {}
      }
    },
  },
}))

// Mock de los assets estáticos usados por Leaflet.
// Vitest necesita que estos imports devuelvan un objeto con default.
vi.mock('leaflet/dist/images/marker-icon.png', () => ({ default: 'marker-icon.png' }))
vi.mock('leaflet/dist/images/marker-shadow.png', () => ({ default: 'marker-shadow.png' }))

describe('Reportes', () => {
  let alertSpy

  beforeEach(() => {
    // Limpiamos mocks antes de cada test para evitar efectos laterales.
    vi.clearAllMocks()
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    clickHandlers.handlers = null
  })

  afterEach(() => {
    // Restauramos el DOM y los spies después de cada prueba.
    cleanup()
    alertSpy.mockRestore()
  })

  // Verifica que el formulario de reportes se renderice con todos los campos esperados.
  it('renderiza los campos principales del formulario', () => {
    useAuth.mockReturnValue({ isAuthenticated: true })
    render(<Reportes />)

    expect(document.querySelector('input[name="fecha"]')).toBeTruthy()
    expect(document.querySelector('input[name="hora"]')).toBeTruthy()
    expect(screen.getByPlaceholderText(/Haz clic en el mapa para marcar la ubicación/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Ej: Sector Norte/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Ej: Frente al colegio/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Detalles del incidente/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /Limpiar/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Generar Reporte/i })).toBeTruthy()
  })

  // Comprueba que se muestre una alerta si el usuario intenta generar un reporte sin estar autenticado.
  it('muestra alerta cuando el usuario no está autenticado', async () => {
    useAuth.mockReturnValue({ isAuthenticated: false })
    render(<Reportes />)

    fireEvent.click(screen.getByRole('button', { name: /Generar Reporte/i }))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Debes iniciar sesión para generar un reporte.')
      expect(reporteService.crearReporte).not.toHaveBeenCalled()
    })
  })

  // Verifica que el formulario no envíe el reporte si no se ha seleccionado una ubicación en el mapa.
  it('muestra alerta cuando falta seleccionar ubicación', async () => {
    useAuth.mockReturnValue({ isAuthenticated: true })
    render(<Reportes />)

    fireEvent.click(screen.getByRole('button', { name: /Generar Reporte/i }))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Por favor, selecciona la ubicación exacta en el mapa.')
      expect(reporteService.crearReporte).not.toHaveBeenCalled()
    })
  })

  // Simula la selección de ubicación en el mapa y comprueba que se cree el reporte correctamente.
  it('genera un reporte con éxito después de seleccionar ubicación', async () => {
    useAuth.mockReturnValue({ isAuthenticated: true })
    reporteService.crearReporte.mockResolvedValue({ id: 123 })
    render(<Reportes />)

    await waitFor(() => {
      expect(clickHandlers.handlers).toBeTruthy()
    })

    clickHandlers.handlers.click({ latlng: { lat: -33.6897, lng: -71.2128 } })

    await waitFor(() => {
      expect(screen.getByTestId('marker')).toBeTruthy()
    })

    fireEvent.click(screen.getByRole('button', { name: /Generar Reporte/i }))

    await waitFor(() => {
      expect(reporteService.crearReporte).toHaveBeenCalled()
      expect(window.alert).toHaveBeenCalledWith('¡Reporte #123 creado con éxito!')
      expect(screen.getByPlaceholderText(/Haz clic en el mapa para marcar la ubicación/i).value).toBe('')
    })
  })
})
