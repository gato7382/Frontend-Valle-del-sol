import React from 'react'

export default function Bomberos() {
  return (
    <div className="page">
      <div className="bomberos-card">
        <div className="bomberos-header">
          <div>
            <h2>¿Quieres ser Bombero?</h2>
            <p className="bomberos-intro">
              En Chile el bombero es voluntario (no recibe remuneración). Únete al servicio activo y ayuda a tu comunidad.
            </p>
          </div>
        </div>

        <div className="bomberos-content">
          <section>
            <h3>Requisitos básicos</h3>
            <ul>
              <li>Haber cumplido 18 años.</li>
              <li>No tener antecedentes penales.</li>
              <li>Contar con salud compatible con el servicio.</li>
            </ul>
          </section>

          <section>
            <h3>Cómo postular</h3>
            <p>
              Dirígete a la Compañía más cercana a tu domicilio o trabajo y señala que deseas postular.
            </p>
            <p>
              Luego de aprobar el proceso de postulación y ser aceptado por la Compañía, deberás participar en los cursos que te capacitarán para el servicio activo.
            </p>
          </section>

          <section>
            <h3>Si eres extranjero</h3>
            <p>
              El procedimiento para postular es el mismo, además de contar con residencia en Chile.
            </p>
          </section>

          <section>
            <h3>Si aún no tienes 18 años</h3>
            <p>
              No te desanimes: muchas Compañías tienen brigadas para jóvenes interesados en ser bomberos. Las Brigadas entregan formación bomberil, pero no participan en los llamados.
            </p>
            <p>
              Una vez que los brigadieres o cadetes cumplen 18 años, pueden ingresar formalmente como voluntarios.
            </p>
          </section>

          <section>
            <h3>Importancia de las Brigadas</h3>
            <p>
              Las Brigadas son fundamentales para Bomberos de Chile. Muchos de los actuales dirigentes se iniciaron en ellas.
            </p>
          </section>

          <p className="bomberos-final">¡Te esperamos!</p>
        </div>
      </div>
    </div>
  )
}
