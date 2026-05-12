import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/page/home.jsx';
import Inicio from './components/page/inicio.jsx';
import LoginLayout from './components/layout/LoginLayout.jsx';
import Register from './components/layout/RegistroLayout.jsx';
import Reportes from './components/page/Reportes.jsx';
import Alertas from './components/page/Alertas.jsx';
import Mapa from './components/page/Mapa.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Inicio />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="alertas" element={<Alertas />} />
          <Route path="bomberos" element={<div style={{padding: '40px'}}><h2>🧯 Personal de Bomberos</h2><p>Gestión de voluntarios.</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;