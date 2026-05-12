import React from 'react';

const noticias = [
  {
    id: 1,
    fecha: '222',
    emoji: '',
    color: 'linear-gradient(135deg,#922B21,#C0392B)',
    titulo: 'a',
    resumen: 's',
  },
  {
    id: 2,
    fecha: '30-04-2026',
    emoji: '',
    color: 'linear-gradient(135deg,#0D1B2A,#1a4a7a)',
    titulo: 's',
    resumen: 'aaaa.',
  },
  {
    id: 3,
    fecha: '24-04-2026',
    emoji: '',
    color: 'linear-gradient(135deg,#1a3a1a,#2d6a2d)',
    titulo: '',
    resumen: '.',
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
          <div className="card-imagen" style={{ background: n.color }}>
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