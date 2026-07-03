import React from 'react'
import '../styles/styles.css'
import Principal from '../home/Principal'
import TarjetasInfo from '../home/TarjetasInfo'
import CajaTexto from '../home/CajaTexto'

export default function Inicio() {
  return (
    <div className="inicio-page">
      <Principal />
      <div className="nose-contenido">
        <section className="seccion-noticias">
          <h2 className="seccion-noticias-titulo">Últimas noticias</h2>
          <TarjetasInfo />
        </section>
        <CajaTexto />
      </div>
    </div>
  )
}
