import React from 'react';
import img1 from '../img/card-1.png';
import imgGemini from '../img/a.png';
import imgNose from '../img/nose.jpeg';
import img4 from '../img/1.png';
import img5 from '../img/2.png';
import img6 from '../img/3.png';

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
  {
    id: 4,
    fecha: '18-06-2026',
    emoji: '',
    imagen: img4,
    titulo: 'Entrenamiento Avanzado en Rescate',
    resumen: 'Nuestros bomberos participan en programas intensivos de capacitación para dominar técnicas de rescate en alturas y operaciones en espacios confinados.',
  },
  {
    id: 5,
    fecha: '12-06-2026',
    emoji: '',
    imagen: img5,
    titulo: 'Prevención de Emergencias en la Comunidad',
    resumen: 'Realizamos jornadas educativas en escuelas y comercios para enseñar medidas de seguridad y prevención de desastres que protegen a nuestros ciudadanos.',
  },
  {
    id: 6,
    fecha: '05-06-2026',
    emoji: '',
    imagen: img6,
    titulo: 'Vehículos Especializados de Última Generación',
    resumen: 'Contamos con una flota moderna de unidades especializadas equipadas con la más avanzada tecnología para responder efectivamente a cualquier tipo de emergencia.',
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
      {/* Accesos rápidos / Instituciones relacionadas */}
      <section className="seccion-instituciones">
        <h4 className="seccion-instituciones-titulo">INSTITUCIONES RELACIONADAS</h4>
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
      </section>
    </div>
  );
}