import React from 'react'
import '../styles/styles.css'
import BarraSuperior from '../home/BarraSuperior'
import NavegacionSuperior from '../home/NavegacionSuperior'
import Migas from '../home/Migas'
import Principal from '../home/Principal'
import TarjetasInfo from '../home/TarjetasInfo'
import CajaTexto from '../home/CajaTexto'

export default function Home() {
  return (
    <div>
      <BarraSuperior />
      <NavegacionSuperior />
      <Migas />
      <Principal />
      <div className="nose-contenido">
        <TarjetasInfo />
        <CajaTexto />
      </div>
    </div>
  )
}