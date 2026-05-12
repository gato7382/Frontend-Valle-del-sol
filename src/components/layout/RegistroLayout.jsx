import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 1. Importamos el hook
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { register, error: authError } = useAuth(); // 2. Traemos la función de registro y los errores del contexto

  const [form, setForm] = useState({
    fname: "", lname: "", email: "", password: "", confirm: ""
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function showMsg(text, type) {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3500);
  }

  function getStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  }

  const strengthColors = ["", "#e24b4a", "#ef9f27", "#1d9e75", "#0f6e56"];
  const strengthLabels = ["", "Débil", "Regular", "Fuerte", "Muy fuerte"];
  const score = getStrength(form.password);

  // 3. Modificamos la función para que llame al backend de forma asíncrona
  const handleRegister = async () => {
    if (!form.fname || !form.lname)
      return showMsg("Por favor ingresa tu nombre completo.", "error");
    if (!form.email || !form.email.includes("@"))
      return showMsg("Ingresa un correo electrónico válido.", "error");
    if (form.password.length < 8)
      return showMsg("La contraseña debe tener al menos 8 caracteres.", "error");
    if (form.password !== form.confirm)
      return showMsg("Las contraseñas no coinciden.", "error");
    //if (!terms)
    //  return showMsg("Debes aceptar los términos y condiciones.", "error");

    try {
      // Unimos nombre y apellido para enviarlo al backend en el campo "nombre"
      const nombreCompleto = `${form.fname} ${form.lname}`.trim();

      // Llamamos a la API a través del Contexto
      await register(nombreCompleto, form.email, form.password);

      showMsg("¡Cuenta creada con éxito! Bienvenido/a", "success");

      // Esperamos un momento para que el usuario lea el mensaje antes de redirigir
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.error("Error al registrar:", err.message);
    }
  };

  return (
    <div className="reg-wrap">
      <div className="reg-card">

        <div className="reg-logo">Valle del Sol</div>
        <p className="reg-title">Crea tu cuenta</p>
        <p className="reg-sub">Completa los datos para comenzar</p>

        {msg.text && <div className={`msg ${msg.type}`}>{msg.text}</div>}

        {/* 4. Mostramos errores de autenticación (ej: Correo ya registrado) */}
        {authError && <div className="msg error">{authError}</div>}

        <div className="row2">
          <div className="field">
            <label htmlFor="fname">Nombre</label>
            <input
              type="text" id="fname" name="fname"
              placeholder="Juan" value={form.fname} onChange={update}
            />
          </div>
          <div className="field">
            <label htmlFor="lname">Apellido</label>
            <input
              type="text" id="lname" name="lname"
              placeholder="Pérez" value={form.lname} onChange={update}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email" id="email" name="email"
            placeholder="tucorreo@ejemplo.com" value={form.email} onChange={update}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <div className="input-wrap">
            <input
              type={showPwd ? "text" : "password"}
              id="password" name="password"
              placeholder="Mínimo 8 caracteres"
              value={form.password} onChange={update}
            />
            <button className="eye" type="button" onClick={() => setShowPwd(!showPwd)}
              aria-label={showPwd ? "Ocultar" : "Mostrar"}>
              {showPwd ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {form.password && (
            <>
              <div className="strength">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="strength-bar" style={{
                    background: i <= score ? strengthColors[score] : "#ddd"
                  }} />
                ))}
              </div>
              <p className="strength-label" style={{ color: strengthColors[score] }}>
                {strengthLabels[score]}
              </p>
            </>
          )}
        </div>

        <div className="field">
          <label htmlFor="confirm">Confirmar contraseña</label>
          <div className="input-wrap">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirm" name="confirm"
              placeholder="Repite tu contraseña"
              value={form.confirm} onChange={update}
            />
            <button className="eye" type="button" onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Ocultar" : "Mostrar"}>
              {showConfirm ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <button className="btn-primary" type="button" onClick={handleRegister}>
          Crear cuenta
        </button>

        <p className="login-row">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>

      </div>
    </div>
  );
}
