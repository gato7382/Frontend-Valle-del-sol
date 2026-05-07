import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/page/home.jsx';
import Inicio from './components/page/Inicio.jsx'; 

// Aquí es donde definiremos qué se ve en las otras pestañas
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          
          {/* Esta es la vista que ya tienes (Home) */}
          <Route index element={<Inicio />} />

          {/* ACTIVAMOS las rutas. Por ahora les pondremos un texto para que no den error */}
          <Route path="reportes" element={<div style={{padding: '40px'}}><h2>🔥 Sección de Reportes</h2><p>Contenido en desarrollo...</p></div>} />
          <Route path="mapa" element={<div style={{padding: '40px'}}><h2>🗺️ Mapa de Emergencias</h2><p>Aquí cargaremos el mapa pronto.</p></div>} />
          <Route path="alertas" element={<div style={{padding: '40px'}}><h2>🛎️ Panel de Alertas</h2><p>Listado de alarmas activas.</p></div>} />
          <Route path="bomberos" element={<div style={{padding: '40px'}}><h2>🧯 Personal de Bomberos</h2><p>Gestión de voluntarios.</p></div>} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;