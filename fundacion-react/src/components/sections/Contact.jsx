import { useState } from "react";
import { COLORS } from "../../data/siteData";
import RevealSection from "../ui/RevealSection";

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    medio: "",
    mensaje: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.nombre || !form.email) return;
    setSent(true);
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <RevealSection>
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: COLORS.brand }}
            >
              Estamos aquí
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black mt-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: COLORS.secondary }}
            >
              Comunícate
              <br />
              con nosotros
            </h2>

            <p className="text-gray-500 text-lg mt-4 leading-relaxed">
              Fundación Mejoremos Realidades está comprometida con sus pacientes.
              Previa cita, será un placer atenderte.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f8f7f5]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: COLORS.secondary }}
                >
                  📍
                </div>
                <div>
                  <p className="font-bold text-gray-900">Nuestras oficinas</p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Cerrada de Omega 260, Romero de Terreros,
                    <br />
                    Ciudad de México, CDMX, México
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f8f7f5]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: COLORS.brand }}
                >
                  ✉
                </div>
                <div>
                  <p className="font-bold text-gray-900">Correo electrónico</p>
                  <a
                    href="mailto:mejoremosrealidadesfundacion@gmail.com"
                    className="text-sm mt-0.5 hover:underline"
                    style={{ color: COLORS.brand }}
                  >
                    mejoremosrealidadesfundacion@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={150}>
            <div className="rounded-3xl p-8 bg-[#f8f7f5]">
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-black" style={{ color: COLORS.secondary }}>
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 text-gray-900"
                      style={{ "--tw-ring-color": COLORS.brand }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 text-gray-900"
                      style={{ "--tw-ring-color": COLORS.brand }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Medio de contacto preferido
                    </label>
                    <select
                      value={form.medio}
                      onChange={(e) => setForm({ ...form, medio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none text-gray-900"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="email">Correo electrónico</option>
                      <option value="telefono">Teléfono</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      rows={4}
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none resize-none text-gray-900"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-xl text-white font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: COLORS.brand }}
                  >
                    Enviar mensaje
                  </button>
                </div>
              )}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}