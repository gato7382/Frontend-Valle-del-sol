import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/page/home.jsx';
import Inicio from './components/page/inicio.jsx';
import LoginLayout from './components/layout/LoginLayout.jsx';
import Register from './components/layout/RegistroLayout.jsx';
import Reportes from './components/page/Reportes.jsx';
import Alertas from './components/page/Alertas.jsx'; // Importamos el nuevo componente

// Aquí es donde definiremos qué se ve en las otras pestañas
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />}>
          {/* Esta es la vista que ya tienes (Home) */}
          <Route index element={<Inicio />} />
          {/* ACTIVAMOS las rutas. Por ahora les pondremos un texto para que no den error */}
          <Route path="reportes" element={<Reportes />} />
          <Route path="mapa" element={<div style={{padding: '40px'}}><h2>🗺️ Mapa de Emergencias</h2><p>Aquí cargaremos el mapa pronto.</p></div>} />
          {/* Conectamos la ruta de alertas al nuevo componente */}
          <Route path="alertas" element={<Alertas />} />
          <Route path="bomberos" element={<div style={{padding: '40px'}}><h2>🧯 Personal de Bomberos</h2><p>Gestión de voluntarios.</p></div>} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;