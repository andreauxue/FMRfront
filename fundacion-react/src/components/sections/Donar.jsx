// src/public/pages/donar/Donar.jsx
//
// Orden de secciones:
//   1. Hero
//   2. MedicamentosStock   ← subido arriba según indicación
//   3. PorQueDona
//   4. DonacionesEspecie
//   5. ManosTransforman
//   6. TransferenciaProximamente
//   7. CtaBanner

import Navbar  from "../../layout/Navbar";
import Footer  from "../../layout/Footer";
import { C }   from "./tokens";

import DonarHero                            from "./DonarHero";
import MedicamentosStock                    from "./MedicamentosStock";
import PorQueDona                           from "./PorQueDona";
import DonacionesEspecie                    from "./DonacionesEspecie";
import ManosTransforman                     from "./ManosTransforman";
import { TransferenciaProximamente, CtaBanner } from "./TransferenciaYCta";

export default function Donar() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", background: C.bg }}>
      <Navbar />

      <DonarHero />
      <MedicamentosStock />
      <PorQueDona />
      <DonacionesEspecie />
      <ManosTransforman />
      <TransferenciaProximamente />
      <CtaBanner />

      <Footer />
    </div>
  );
}