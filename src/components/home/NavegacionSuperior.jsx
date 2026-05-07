import React from 'react';
import { Link } from 'react-router-dom'; // Paso 1: Importar Link

export default function NavegacionSuperior() {
  return (
    <nav className="tito-nav">
      {/* Paso 2: Usar Link to="/" en lugar de a href="#" */}
      <Link to="/">🚪 Home</Link>
      <Link to="/reportes">🔥 Reportes</Link>
      <Link to="/mapa">🗺️ Mapa</Link>
      <Link to="/alertas">🛎️ Alertas</Link>
      <Link to="/bomberos">🧯 Bomberos</Link>

      <div className="tito-nav-footer">
        <img 
          src="/imgs/Gemini_Generated_Image_j5qpjmj5qpjmj5qp.png" 
          alt="Decoración" 
        />
      </div>
    </nav>
  );
}