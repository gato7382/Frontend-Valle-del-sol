import { cleanup, render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { AuthContext } from "../../context/AuthContext";
import Register from "../layout/RegistroLayout";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Registro", () => {
  const mockRegister = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    cleanup();
    mockRegister.mockReset();
    mockNavigate.mockReset();
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const renderRegister = (error = null) => {
    return render(
      <AuthContext.Provider value={{ register: mockRegister, error }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  test("muestra los campos del formulario y el botón de crear cuenta", () => {
    renderRegister();

    expect(screen.getByLabelText(/Nombre/i)).toBeTruthy();
    expect(screen.getByLabelText(/Apellido/i)).toBeTruthy();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeTruthy();
    expect(screen.getByLabelText(/^Contraseña$/i)).toBeTruthy();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Crear cuenta/i })).toBeTruthy();
  });

  test("muestra mensaje de error cuando las contraseñas no coinciden", async () => {
    const { container } = renderRegister();
    const form = within(container);

    fireEvent.change(form.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
    fireEvent.change(form.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(form.getByLabelText(/Correo electrónico/i), { target: { value: "juan@ejemplo.com" } });
    fireEvent.change(form.getByLabelText(/^Contraseña$/i), { target: { value: "Password123" } });
    fireEvent.change(form.getByLabelText(/Confirmar contraseña/i), { target: { value: "Password321" } });

    fireEvent.click(form.getByRole("button", { name: /Crear cuenta/i }));

    await form.findByText(/Las contraseñas no coinciden/i);
    expect(mockRegister).not.toHaveBeenCalled();
  });

  test("registra con éxito y navega a la página principal", async () => {
    mockRegister.mockResolvedValue({ token: "fake-token", user: { nombre: "Juan Pérez" } });

    const { container } = renderRegister();
    const form = within(container);

    fireEvent.change(form.getByLabelText(/Nombre/i), { target: { value: "Juan" } });
    fireEvent.change(form.getByLabelText(/Apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(form.getByLabelText(/Correo electrónico/i), { target: { value: "juan@ejemplo.com" } });
    fireEvent.change(form.getByLabelText(/^Contraseña$/i), { target: { value: "Password123!" } });
    fireEvent.change(form.getByLabelText(/Confirmar contraseña/i), { target: { value: "Password123!" } });

    fireEvent.click(form.getByRole("button", { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("Juan Pérez", "juan@ejemplo.com", "Password123!");
    });

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith("/");
      },
      { timeout: 3000 }
    );
  });

  test("muestra el error del contexto de autenticación", () => {
    renderRegister("Correo ya registrado");

    expect(screen.getByText(/Correo ya registrado/i)).toBeTruthy();
  });
});
