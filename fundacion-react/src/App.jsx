import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Equipo from "./components/sections/Equipo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/acerca-de" element={<Home />} />
      <Route path="/servicios" element={<Home />} />
      <Route path="/equipo" element={<Equipo />} />
      <Route path="/causas" element={<Home />} />
      <Route path="/embajadores" element={<Home />} />
      <Route path="/alianzas" element={<Home />} />
      <Route path="/vivo-con-leucemia" element={<Home />} />
      <Route path="/donaciones" element={<Home />} />
    </Routes>
  );
}

export default App;