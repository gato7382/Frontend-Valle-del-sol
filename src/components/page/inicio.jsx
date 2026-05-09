import React from 'react'
import '../styles/styles.css'
import { Outlet } from 'react-router-dom';
import BarraSuperior from '../home/BarraSuperior'
import NavegacionSuperior from '../home/NavegacionSuperior'

// Este componente ahora es el "Contenedor Padre" (Layout)
export default function Home() {
  return (
    <div className="home-layout">
      {/* 1. La barra azul superior - FIJA */}
      <header>
        <BarraSuperior />
      </header>

      <div className="app-body">
        {/* 2. Tu barra lateral con la imagen - FIJA */}
        <NavegacionSuperior />

        {/* 3. El espacio de la derecha - DINÁMICO */}
        <main className="main-content">
          {/* Outlet es el "agujero" donde React Router pondrá 
              el contenido de la ruta seleccionada (Principal, Mapas, Alertas, etc.) 
          */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}