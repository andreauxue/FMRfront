import { useState } from "react";
import { COLORS } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function Donations() {
  const amounts = [100, 250, 500, 1000];
  const [selected, setSelected] = useState(250);
  const [custom, setCustom] = useState("");

  return (
    <section
      id="donaciones"
      className="py-24 relative overflow-hidden"
      style={{ background: COLORS.brand }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15"
        style={{ background: "white", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: "white", transform: "translate(-20%, 20%)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <RevealSection>
          <span className="text-sm font-bold uppercase tracking-widest text-white/70">
            Haz la diferencia
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¡Dona y ayúdanos a llegar
            <br />a quien más lo necesita!
          </h2>

          <p className="text-white/80 text-lg mb-10">
            Tu donación nos permite seguir brindando atención médica, jurídica y psicológica gratuita.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelected(amount);
                  setCustom("");
                }}
                className="py-3 rounded-2xl text-lg font-black transition-all hover:scale-105 active:scale-95"
                style={{
                  background: selected === amount ? "white" : "rgba(255,255,255,0.15)",
                  color: selected === amount ? COLORS.brand : "white",
                  border: "2px solid",
                  borderColor: selected === amount ? "white" : "rgba(255,255,255,0.3)",
                }}
              >
                ${amount}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Otro monto (MXN)"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setSelected(null);
            }}
            className="w-full text-center text-lg py-3 px-4 rounded-2xl mb-6 outline-none"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          />

          <a
            href="https://fmejoremosrealidades.org/donaciones"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl font-black px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl"
            style={{
              background: "white",
              color: COLORS.brand,
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            }}
          >
            ❤ Donar ${custom || selected || "___"} MXN
          </a>
        </RevealSection>
      </div>
    </section>
  );
}