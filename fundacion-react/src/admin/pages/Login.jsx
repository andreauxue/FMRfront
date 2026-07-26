import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconHeartFilled, IconLogin2 } from "@tabler/icons-react";
import FormField from "../components/FormField";
import { C, R, SHADOW } from "../theme";

// Inicio de sesión del panel.
//
// PROVISIONAL: el envío debe llamar al backend (POST /api/auth/login) para que el
// servidor emita una cookie de sesión httpOnly. NO guardar credenciales ni tokens
// en localStorage. Esta pantalla solo prepara la interfaz y el flujo de navegación.
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from?.pathname || "/admin";

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit() {
    setError(null);
    if (!correo || !password) {
      setError("Escribe tu correo y contraseña.");
      return;
    }
    setEnviando(true);
    try {
      // TODO(backend): const res = await fetch("/api/auth/login", { method:"POST", ... })
      // Si la respuesta es correcta, el servidor deja la sesión lista y navegamos.
      await new Promise((r) => setTimeout(r, 500));
      navigate(destino, { replace: true });
    } catch {
      setError("No fue posible iniciar sesión. Verifica tus datos.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans" style={{ background: C.bg }}>
      <div className="w-full max-w-sm p-8" style={{ background: C.surface, borderRadius: R.lg, boxShadow: SHADOW.raised }}>
        <div className="flex flex-col items-center text-center mb-7">
          <span
            className="inline-flex items-center justify-center mb-4"
            style={{ width: 48, height: 48, borderRadius: R.md, background: C.brand, color: "#fff" }}
          >
            <IconHeartFilled size={24} />
          </span>
          <h1 className="font-bold text-lg" style={{ color: C.text }}>Panel administrativo</h1>
          <p className="text-sm mt-1" style={{ color: C.textMid }}>Fundación Mejoremos Realidades</p>
        </div>

        <div className="flex flex-col gap-4" onKeyDown={(e) => e.key === "Enter" && handleSubmit()}>
          <FormField
            id="correo"
            label="Correo"
            type="email"
            value={correo}
            onChange={setCorreo}
            placeholder="tu@correo.org"
            autoComplete="username"
          />
          <FormField
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete="current-password"
            error={error}
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={enviando}
            className="inline-flex items-center justify-center gap-2 font-bold text-sm px-5 py-3 mt-1 transition-all disabled:opacity-60"
            style={{ background: C.secondary, color: "#fff", borderRadius: R.pill }}
          >
            <IconLogin2 size={18} stroke={2} />
            {enviando ? "Entrando…" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
