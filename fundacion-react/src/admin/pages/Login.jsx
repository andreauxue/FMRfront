import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  IconLock,
  IconMail,
  IconLoader2,
  IconAlertCircle,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

const C = {
  brand:     "#C8384F",
  brandSoft: "#FAE8EB",
  brandDark: "#A02C3E",
  bg:        "#F0F2F5",
  surface:   "#FFFFFF",
  text:      "#111827",
  textMid:   "#4B5563",
  textLight: "#9CA3AF",
  border:    "#E5E7EB",
};

export default function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);
      const destination = location.state?.from?.pathname || "/admin";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: C.bg }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div className="w-full" style={{ maxWidth: 420 }}>

        {/* Logo / marca */}
        <div className="text-center mb-10">
          <img
            src="/logo.png"
            alt="Fundación Mejoremos Realidades"
            className="mx-auto mb-6"
            style={{ height: 80, width: "auto", objectFit: "contain" }}
          />
          <h1
            className="font-black text-2xl"
            style={{ color: C.text, letterSpacing: "-0.025em" }}
          >
            Administración
          </h1>
          <p className="text-sm mt-1" style={{ color: C.textLight }}>
            Fundación Mejoremos Realidades A.C.
          </p>
        </div>

        {/* Tarjeta */}
        <div
          className="rounded-3xl p-8 border"
          style={{ background: C.surface, borderColor: C.border }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold tracking-wide uppercase mb-2"
                  style={{ color: C.textMid }}
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <IconMail
                    size={16} stroke={2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: C.textLight }}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    autoComplete="email"
                    placeholder="correo@ejemplo.com"
                    required
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background:   C.surface,
                      border:       `1.5px solid ${C.border}`,
                      borderRadius: "12px",
                      color:        C.text,
                      opacity:      loading ? 0.6 : 1,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = C.brand;
                      e.target.style.boxShadow   = `0 0 0 3px ${C.brand}18`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = C.border;
                      e.target.style.boxShadow   = "none";
                    }}
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-wide uppercase mb-2"
                  style={{ color: C.textMid }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <IconLock
                    size={16} stroke={2}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: C.textLight }}
                  />
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    className="w-full pl-11 pr-11 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background:   C.surface,
                      border:       `1.5px solid ${C.border}`,
                      borderRadius: "12px",
                      color:        C.text,
                      opacity:      loading ? 0.6 : 1,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = C.brand;
                      e.target.style.boxShadow   = `0 0 0 3px ${C.brand}18`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = C.border;
                      e.target.style.boxShadow   = "none";
                    }}
                  />
                  {/* Toggle mostrar contraseña */}
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: showPass ? C.brand : C.textLight }}
                    tabIndex={-1}
                  >
                    {showPass
                      ? <IconEyeOff size={16} stroke={2} />
                      : <IconEye    size={16} stroke={2} />
                    }
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: "#FEF2F2", border: "1px solid #FCA5A530" }}
                  role="alert"
                >
                  <IconAlertCircle
                    size={16} stroke={2}
                    className="shrink-0 mt-0.5"
                    style={{ color: "#DC2626" }}
                  />
                  <p className="text-sm font-medium" style={{ color: "#DC2626" }}>
                    {error}
                  </p>
                </div>
              )}

              {/* Botón */}
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full flex items-center justify-center gap-2.5 font-bold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{
                  background:  C.brand,
                  color:       "#fff",
                  boxShadow:   "0 4px 14px rgba(200,56,79,0.3)",
                  marginTop:   4,
                }}
              >
                {loading ? (
                  <>
                    <IconLoader2
                      size={18} stroke={2}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Ingresando…
                  </>
                ) : (
                  "Ingresar"
                )}
              </button>

            </div>
          </form>
        </div>

        {/* Pie */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: C.textLight }}
        >
          Acceso restringido · Solo personal autorizado
        </p>
      </div>
    </main>
  );
}