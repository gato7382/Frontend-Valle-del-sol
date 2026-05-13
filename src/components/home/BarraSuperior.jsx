import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BarraSuperior() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="first-topbar">

      {/* LADO IZQUIERDO: Logo y Títulos */}
      <div className="topbar-left">
        <div className="tito-logo">
          <img
            src="src\components\img\Gemini_Generated_Image_ (1).png"
            alt="Logo Ganso Bombero"
          />
        </div>
        <div className="topbar-titulo">
          <h1>Profesionales de la Emergencia</h1>
          <p>Cuerpo de Bomberos — Municipalidad Valle del Sol</p>
        </div>
      </div>

      {/* LADO DERECHO */}
      <div className="topbar-login">
        {isAuthenticated ? (
          <>
            {user?.nombre && (
              <span className="user-greeting">Hola, {user.nombre}</span>
            )}
            <button type="button" className="btn-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-login">
            <span className="icon-user"></span>
            <span>Iniciar Sesión</span>
          </Link>
        )}
      </div>
    </div>
  );
}