import Navbar    from "./components/layout/Navbar";
import Footer    from "./components/layout/Footer";
import Hero      from "./components/home/sections/Hero";
import AcercaDe  from "./components/home/sections/AcercaDe";
import Servicios from "./components/home/sections/Servicios";
import Causas    from "./components/home/sections/Causas";
import Equipo    from "./components/home/sections/Equipo";
import Embajadores from "./components/home/sections/Embajadores";
import CtaBanner from "./components/home/sections/CtaBanner";
import { C } from "./data/homeData";

export default function Home() {
  return (
    <div className="min-h-screen font-sans" style={{ background: C.bg }}>
      <Navbar />
      <Hero />
      <AcercaDe />
      <Servicios />
      <Causas />
      <Equipo />
      <Embajadores />
      <CtaBanner />
      <Footer />
    </div>
  );
}