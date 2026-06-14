import React from 'react';
import img1 from '../img/card-1.png';
import imgGemini from '../img/a.png';
import imgNose from '../img/nose.jpeg';

const noticias = [
  {
    id: 1,
    fecha: '10-05-2026',
    emoji: '',
    imagen: img1,
    titulo: 'Alianzas que Salvan Vidas',
    resumen: 'Una mirada a la gestión administrativa y el apoyo empresarial fundamentales para financiar el equipamiento de vanguardia que utilizan nuestros bomberos',
  },
  {
    id: 2,
    fecha: '30-04-2026',
    emoji: '',
    imagen: imgGemini,
    titulo: 'Innovación en el Combate de Incendios',
    resumen: 'El cuerpo de bomberos integra nuevas tecnologías y robótica avanzada para enfrentar emergencias de alta complejidad, garantizando mayor seguridad y eficiencia.',
  },
  {
    id: 3,
    fecha: '24-04-2026',
    emoji: '',
    imagen: imgNose,
    titulo: 'Héroes de Nuestra Comunidad',
    resumen: 'Detrás de cada uniforme hay una historia de compromiso y valentía. Conoce la labor diaria de quienes arriesgan todo para proteger a los ciudadanos..',
  },
];

const accesosRapidos = [
  { label: 'Academia Nacional\nde Bomberos' },
  { label: 'Sistema Nacional\nde Operaciones' },
  {  label: 'Fundación\nCultural' },
];

export default function TarjetasInfo() {
  return (
    <div className="tito-cards">
      {/* Noticias */}
      {noticias.map((n) => (
        <div key={n.id} className="pepo-card">
          <div className="card-imagen" style={{ backgroundImage: `url(${n.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <span className="card-emoji">{n.emoji}</span>
            <span className="card-fecha">{n.fecha}</span>
          </div>
          <div className="card-body">
            <h3>{n.titulo}</h3>
            <p>{n.resumen}</p>
            <a href="#" className="card-ver-mas">Ver más ›</a>
          </div>
        </div>
      ))}

      {/* Accesos rápidos */}
      <div className="accesos-rapidos">
        {accesosRapidos.map((a, i) => (
          <button key={i} type="button" className={`acceso-btn acceso-btn--${i}`}>
            <span className="acceso-texto">
              {a.label.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}
            </span>
            <span className="acceso-icono">{a.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}