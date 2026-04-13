import { COLORS, STATS } from "../../data/siteData";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: COLORS.secondary }}
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: COLORS.brand, transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: COLORS.accent, transform: "translate(-30%, 30%)" }}
      />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(242,29,68,0.15)",
            color: "#FF6B8A",
            border: "1px solid rgba(242,29,68,0.3)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: COLORS.brand }}
          />
          Fundación Mejoremos Realidades
        </div>

        <h1
          className="text-5xl sm:text-7xl font-black text-white leading-none mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ayudamos a pacientes
          <br />
          con <span className="relative inline-block" style={{ color: COLORS.brand }}>leucemia</span>
          <br />
          <span className="text-white/60">y cáncer</span>
        </h1>

        <p className="text-white/70 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Somos una fundación comprometida con mejorar la realidad de los pacientes y sus familias,
          brindando gestión médica, asesoría jurídica y atención psicológica.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#donaciones"
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: COLORS.brand,
              boxShadow: "0 8px 32px rgba(242,29,68,0.4)",
            }}
          >
            ❤ Haz una donación
          </a>

          <a
            href="#servicios"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-lg transition-all hover:bg-white/10 border-2"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
          >
            Conoce nuestros servicios →
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <div className="text-3xl font-black" style={{ color: COLORS.accent }}>
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}