import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage2 from '../img/hero/hero-2.png';

export default function Principal() {
  const images = [heroImage2];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="hola-hero">
      {/* Imagen / Slide izquierdo */}
      <div className="hero-imagen">
        <div
          className="hero-imagen-overlay"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        />
        <div className="hero-imagen-caption">
          <small>Emergencias en tiempo real</small>
          <p>Municipalidad Valle del Sol</p>
        </div>
        <div className="hero-flechas">
          <button type="button" className="hero-flecha" onClick={handlePrev}>
            &#8249;
          </button>
          <button type="button" className="hero-flecha" onClick={handleNext}>
            &#8250;
          </button>
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
        <Link to="/bomberos" className="hero-btn-ver-mas">
          Ver más
        </Link>
      </div>
    </div>
  );
}