import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginLayout() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  function showMsg(text, type) {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3500);
  }

  function handleLogin() {  
    if (!email) return showMsg("Por favor ingresa tu correo.", "error");
    if (!email.includes("@")) return showMsg("El correo no parece válido.", "error");
    if (!password) return showMsg("Por favor ingresa tu contraseña.", "error");
    if (password.length < 6) return showMsg("La contraseña debe tener al menos 6 caracteres.", "error");
    showMsg("¡Inicio de sesión exitoso!", "success");
    navigate("/");
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">hola mundo </div>

        <p className="login-title">Bienvenido de vuelta</p>
        <p className="login-sub">Ingresa tus datos para continuar</p>

        {msg.text && <div className={`msg ${msg.type}`}>{msg.text}</div>}

        <div className="field">
          <label htmlFor="email"> Coreo electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="tucorreo@ejemplo.com"
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
              placeholder="introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye"
              onClick={() => setShowPwd(!showPwd)}
              aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPwd ? "Ocultar " : "Ocultar "}
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
          <a href="#" className="forgot">¿Olvidaste tu contraseña??</a>
        </div>

        <button type="button" className="btn-primary" onClick={handleLogin}>
          Iniciar sesión
        </button>

        <p className="signup-row">
          ¿No tienes cuenta? <a href="#">Regístrate gratis</a>
        </p>
      </div>
    </div>
  );
}
