import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavegacionSuperior() {
  const location = useLocation();

  const links = [
    { to: '/',          emoji: '🏠', label: 'Home' },
    { to: '/reportes',  emoji: '🔥', label: 'Reportes' },
    { to: '/mapa',      emoji: '🗺️', label: 'Mapa' },
    { to: '/alertas',   emoji: '🛎️', label: 'Alertas' },
    { to: '/bomberos',  emoji: '🧯', label: 'Bomberos' },
  ];

  return (
    <nav className="tito-nav">
      {links.map(({ to, emoji, label }) => (
        <Link
          key={to}
          to={to}
          className={location.pathname === to ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-emoji">{emoji}</span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}