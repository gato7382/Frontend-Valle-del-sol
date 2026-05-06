import React from 'react';

export default function TarjetasInfo() {
  return (
    <div className="tito-cards">
      <div className="pepo-card">
        <h3>Requisitos</h3>
        <p>Mayor de 18 años, sin antecedentes y con salud compatible con el servicio.</p>
      </div>
      <div className="pepo-card">
        <h3>Extranjeros</h3>
        <p>Mismo proceso, además de contar con residencia vigente en Chile.</p>
      </div>
      <div className="pepo-card">
        <h3>Menores de 18</h3>
        <p>Puedes unirte a una Brigada Juvenil y formarte hasta los 18 años.</p>
      </div>
    </div>
  );
}