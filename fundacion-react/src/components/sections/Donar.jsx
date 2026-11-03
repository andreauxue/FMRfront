import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import { C } from "../donar/tokens";

import DonarHero from "../donar/Donarhero";
import MedicamentosStock from "../medicamentos/MedicamentosStock";
import PorQueDona from "../donar/PorQueDona";
import DonacionesEspecie from "../donar/DonacionesEspecie";
import ManosTransforman from "../donar/ManosTransforman";

import {
  TransferenciaProximamente,
  CtaBanner,
} from "../donar/TransferenciaYCta";

export default function Donar() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: C.bg }}
    >
      <Navbar />

      <main id="contenido-principal">
        <DonarHero />

        <MedicamentosStock />

        <PorQueDona />

        <DonacionesEspecie />

        <ManosTransforman />

        <TransferenciaProximamente />

        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}