import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginLayout from '../layout/LoginLayout';

const mockLogin = vi.fn(async (email, password) => ({ token: 'fake-token', user: { nombre: 'Usuario prueba' } }));
const mockNavigate = vi.fn();

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    error: null,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginLayout', () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
  });

  // Verifica que el formulario de login envíe las credenciales correctas y navegue después de iniciar sesión.
  it('envía el correo y la contraseña al iniciar sesión', async () => {
    render(
      <MemoryRouter>
        <LoginLayout />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i, { selector: 'input' });
    const passwordInput = screen.getByLabelText(/contraseña/i, { selector: 'input' });
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
