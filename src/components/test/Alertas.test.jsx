// Imports necesarios para montar el componente, ejecutar los tests y verificar el DOM.
import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import Alertas from '../page/Alertas'
import { useAuth } from '../../context/AuthContext'
import reporteService from '../../services/reporteService'

// Mock del contexto de autenticación: permite controlar el rol de usuario en cada test.
vi.mock('../../context/AuthContext', () => {
  const useAuthMock = vi.fn()
  return {
    useAuth: useAuthMock,
  }
})

// Mock del servicio de reportes: evita llamadas reales al backend y permite simular respuestas.
vi.mock('../../services/reporteService', () => ({
  default: {
    listarReportes: vi.fn(),
    cambiarEstado: vi.fn(),
    eliminarReporte: vi.fn(),
  },
}))

describe('Alertas', () => {
  let alertSpy
  let confirmSpy

  // Setup común antes de cada prueba: limpiar DOM, resetear mocks y evitar alertas reales.
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true)
  })

  // Restaurar los métodos globales después de cada prueba.
  afterEach(() => {
    alertSpy.mockRestore()
    confirmSpy.mockRestore()
  })

  // Valida que un usuario ADMIN vea un reporte cargado y los botones de acción de administración.
  it('muestra reportes y botones de administración para usuario ADMIN', async () => {
    useAuth.mockReturnValue({ user: { rol: 'ADMIN' } })
    reporteService.listarReportes.mockResolvedValue([
      {
        id: 1,
        direccion: 'Calle Falsa 123',
        sector: 'Norte',
        fecha: '2026-06-14',
        hora: '15:00',
        observaciones: 'Fuego en pastizal',
        usuarioNombre: 'Pedro',
        usuarioId: '42',
        estado: 'ACTIVO',
      },
    ])

    render(<Alertas />)

    await waitFor(() => {
      expect(screen.getByText(/Calle Falsa 123/i)).toBeTruthy()
    })

    expect(screen.getByText(/Norte/i)).toBeTruthy()
    expect(screen.getByText(/Pedro/i)).toBeTruthy()
    expect(screen.getByText(/ID: 42/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /Marcar Controlado/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Falsa Alarma/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Eliminar Reporte/i })).toBeTruthy()
  })

  // Simula el clic en "Marcar Controlado" y verifica que se llame al servicio y salga una alerta de éxito.
  it('cambia el estado de un reporte y muestra alerta de éxito', async () => {
    useAuth.mockReturnValue({ user: { rol: 'FUNCIONARIO' } })
    reporteService.listarReportes.mockResolvedValue([
      {
        id: 2,
        direccion: 'Av. Los Pinos',
        sector: 'Sur',
        fecha: '2026-06-14',
        hora: '16:00',
        observaciones: 'Humo visible',
        usuarioNombre: 'María',
        usuarioId: '55',
        estado: 'ACTIVO',
      },
    ])
    reporteService.cambiarEstado.mockResolvedValue({})
    reporteService.listarReportes.mockResolvedValueOnce([
      {
        id: 2,
        direccion: 'Av. Los Pinos',
        sector: 'Sur',
        fecha: '2026-06-14',
        hora: '16:00',
        observaciones: 'Humo visible',
        usuarioNombre: 'María',
        usuarioId: '55',
        estado: 'ACTIVO',
      },
    ]).mockResolvedValueOnce([
      {
        id: 2,
        direccion: 'Av. Los Pinos',
        sector: 'Sur',
        fecha: '2026-06-14',
        hora: '16:00',
        observaciones: 'Humo visible',
        usuarioNombre: 'María',
        usuarioId: '55',
        estado: 'CONTROLADO',
      },
    ])

    render(<Alertas />)

    await waitFor(() => {
      expect(screen.getByText(/Av\. Los Pinos/i)).toBeTruthy()
    })

    fireEvent.click(screen.getByRole('button', { name: /Marcar Controlado/i }))

    await waitFor(() => {
      expect(reporteService.cambiarEstado).toHaveBeenCalledWith(2, 'CONTROLADO')
      expect(window.alert).toHaveBeenCalledWith('El estado del reporte fue cambiado a CONTROLADO')
    })
  })

  // Verifica que la acción de eliminar pida confirmación y, si acepta, llame al servicio y muestre una alerta.
  it('elimina un reporte cuando el usuario confirma la acción', async () => {
    useAuth.mockReturnValue({ user: { rol: 'ADMIN' } })
    reporteService.listarReportes.mockResolvedValue([
      {
        id: 3,
        direccion: 'Calle Principal',
        sector: 'Centro',
        fecha: '2026-06-14',
        hora: '17:00',
        observaciones: 'Llama pequeña',
        usuarioNombre: 'Luis',
        usuarioId: '99',
        estado: 'ACTIVO',
      },
    ])
    reporteService.eliminarReporte.mockResolvedValue({})

    render(<Alertas />)

    await waitFor(() => {
      expect(screen.getByText(/Calle Principal/i)).toBeTruthy()
    })

    fireEvent.click(screen.getByRole('button', { name: /Eliminar Reporte/i }))

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled()
      expect(reporteService.eliminarReporte).toHaveBeenCalledWith(3)
      expect(window.alert).toHaveBeenCalledWith('Reporte eliminado exitosamente.')
    })
  })
})
