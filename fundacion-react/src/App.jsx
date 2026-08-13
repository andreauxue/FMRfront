import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Equipo from "./components/sections/Equipo";
import { adminRoutes } from "./admin/routes/adminRoutes";
import AcercaDe from "./components/sections/AcercaDe";
import Servicios from "./components/sections/Servicios";
import Causas from "./components/sections/Causas";
import Embajadores from "./components/sections/Embajadores";
import Alianzas from "./components/sections/Alianzas";
import Donaciones from "./components/sections/donar";

function App() {
  return (
    <Routes>
      {/* ── Rutas públicas (sin cambios) ─────────────────────────────── */}
      <Route path="/" element={<Home />} />
      <Route path="/acerca-de" element={<AcercaDe />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/equipo" element={<Equipo />} />
      <Route path="/causas" element={<Causas />} />
      <Route path="/embajadores" element={<Embajadores />} />
      <Route path="/alianzas" element={<Alianzas />} />
      <Route path="/donar" element={<Donaciones />} />
      <Route path="/vivo-con-leucemia" element={<Home />} />


      {/* ── Rutas administrativas (nuevas) ───────────────────────────── */}
      {adminRoutes}
    </Routes>
  );
}

export default App;