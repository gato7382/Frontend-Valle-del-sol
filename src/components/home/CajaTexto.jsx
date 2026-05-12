import React from 'react';

export default function CajaTexto() {
  return (
    <div className="dado-texto">
      <h3>¿Cómo postular?</h3>
      <p>
        En Chile el bombero es <span className="hola-resalta">voluntario</span> y no recibe
        remuneración. Es una vocación de servicio a la comunidad.
      </p>
      <p>
        El procedimiento es simple: dirígete a la Compañía más cercana a tu
        domicilio o trabajo y expresa tu deseo de postular. Luego de ser
        aceptado, participarás en cursos de capacitación para el servicio
        activo.
      </p>
      <p>
        Las <span className="hola-resalta">Brigadas Juveniles</span> son muy
        importantes para Bomberos de Chile — muchos de los actuales dirigentes
        se iniciaron en ellas.
      </p>
      <a className="nose-cta" href="#">
        ¡Quiero ser Bombero!
      </a>
    </div>
  );
}