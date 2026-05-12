import React from 'react';
import heroImage from '../img/Gemini_Generated_Image_q6eww4q6eww4q6ew.png';

export default function Principal() {
  return (
    <div className="hola-hero">
      {/* Imagen / Slide izquierdo */}
      <div className="hero-imagen">
        <div
          className="hero-imagen-overlay"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="hero-imagen-caption">
          <small>Emergencias en tiempo real</small>
          <p>Municipalidad Valle del Sol</p>
        </div>
        <div className="hero-flechas">
          <button type="button" className="hero-flecha">&#8249;</button>
          <button type="button" className="hero-flecha">&#8250;</button>
        </div>
      </div>

      {/* Panel rojo derecho */}
      <div className="hero-panel-rojo">
        <div>
          <h2>¿Quieres ser Bombero?</h2>
          <p>
            Únete a los profesionales de la emergencia. Servicio voluntario,
            compromiso real con la comunidad.
          </p>
        </div>
        <button type="button" className="hero-btn-ver-mas">Ver más</button>
      </div>
    </div>
  );
}