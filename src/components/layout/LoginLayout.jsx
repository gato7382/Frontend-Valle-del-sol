import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 1. Importamos el hook de autenticación
import BarraSuperior from "../home/BarraSuperior";
import NavegacionSuperior from "../home/NavegacionSuperior";
import logo from "../img/Gemini_Generated_Image_ (1).png";
import "../styles/Login.css";

export default function LoginLayout() {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth(); // 2. Obtenemos la función login y el estado de error del contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);

  // 3. Modificamos la función para que sea asíncrona y use el contexto
  const handleLogin = async () => {
    try {
      await login(email, password); // Llama a la función del contexto
      navigate("/"); // Si tiene éxito, navega a la página principal
    } catch (err) {
      // El error ya se maneja y se muestra a través de `authError`
      console.error("Error en el inicio de sesión:", err.message);
    }
  };

  return (
    <div className="home-layout">
      <header>
        <BarraSuperior />
      </header>
      <div className="app-body">
        <NavegacionSuperior />
        <main className="main-content auth-page">
          <div className="login-wrap auth-wrap">
            <div className="login-card">
              <div className="login-logo">
                <img src={logo} alt="Logo Cuerpo de Bomberos Valle del Sol" />
              </div>
              <p className="login-title">Bienvenido de vuelta</p>
              <p className="login-sub">Ingresa tus datos para continuar</p>

              {/* 4. Mostramos el error que viene del contexto */}
              {authError && <div className="msg error">{authError}</div>}

              <div className="field">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  placeholder="tucorreo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrap">
                  <input
                    type={showPwd ? "text" : "password"}
                    id="password"
                    placeholder="ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye"
                    onClick={() => setShowPwd(!showPwd)}
                    aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPwd ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className="row-between">
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Recordarme
                </label>
                <a href="#" className="forgot">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="button" className="btn-primary" onClick={handleLogin}>
                Iniciar sesión
              </button>

              <p className="signup-row">
                ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
