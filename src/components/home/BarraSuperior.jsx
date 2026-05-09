import React from 'react';

export default function BarraSuperior() {
  return (
    <div className="first-topbar"> 
      
      {/* LADO IZQUIERDO: Logo y Títulos */}
      <div className="topbar-left">
        <div className="tito-logo">
          <img 
            src="/imgs/Gemini_Generated_Image_sl7vb4sl7vb4sl7v (1).png" 
            alt="Logo Ganso Bombero" 
          />
        </div>

        <div className="topbar-titulo">
          <h1>Profesionales de la Emergencia</h1>
          <p>Cuerpo de Bomberos — Municipalidad Valle del Sol</p>
        </div>
      </div>

      {/* LADO DERECHO: Inicio de Sesión */}
      <div className="topbar-login">
        <button className="btn-login">
          <span className="icon-user">👤</span>
          <span>Iniciar Sesión</span>
        </button>
      </div>

    </div>
  );
}