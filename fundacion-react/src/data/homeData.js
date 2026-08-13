import {
  IconPill,
  IconScale,
  IconHeartHandshake,
  IconClipboardText,
  IconBook2,
  IconMessageCircle,
  IconVaccine,
} from "@tabler/icons-react";

// ─── Paleta ────────────────────────────────────────────────────────────────────
export const C = {
  brand:        "#C8384F",
  brandSoft:    "#FAE8EB",
  secondary:    "#3B5BA5",
  secondarySoft:"#EBF0FA",
  accent:       "#F5A623",
  accentSoft:   "#FEF5E7",
  bg:           "#FAFAFA",
  surface:      "#FFFFFF",
  text:         "#1A2235",
  textMid:      "#4B5563",
  textLight:    "#9CA3AF",
  border:       "#E5E7EB",
};

// ─── Imágenes ──────────────────────────────────────────────────────────────────
export const IMG = {
  hero:      "/home/landing.jpeg",
  about:     "/home/dona.JPG",
  teamPhoto: "/home/2.png",
  services: {
    medica:      "/servicios/medica.jpg",
    juridica:    "/servicios/juridica.jpg",
    psicologica: "/servicios/psicologica.jpg",
  },
};

// ─── Servicios ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    img:   IMG.services.medica,
    icon:  IconPill,
    title: "Gestión Médica",
    body:  "Te orientamos hacia los servicios médicos correctos, resolvemos dudas sobre tu diagnóstico y gestionamos el acceso a medicamentos especializados.",
    href:  "/servicios",
  },
  {
    img:   IMG.services.juridica,
    icon:  IconScale,
    title: "Asesoría Jurídica",
    body:  "Defendemos tu derecho a la salud. Si tus derechos están siendo vulnerados, nuestros abogados te acompañan en cada paso del proceso legal.",
    href:  "/servicios",
  },
  {
    img:   IMG.services.psicologica,
    icon:  IconHeartHandshake,
    title: "Atención Psicológica",
    body:  "Nadie debe sentirse solo en este camino. Ofrecemos apoyo emocional, grupos de experiencias y acompañamiento profesional para ti y tu familia.",
    href:  "/servicios",
  },
];

// ─── Recursos (sección Causas) ─────────────────────────────────────────────────
export const RESOURCES = [
  { icon: IconClipboardText, text: "Acceso a información sobre tipos de leucemia y tratamientos" },
  { icon: IconBook2,         text: "Guías de vida digna y manuales de derechos del paciente" },
  { icon: IconMessageCircle, text: "Red de apoyo emocional con otros pacientes" },
  { icon: IconVaccine,       text: "Orientación para acceder a tratamientos especializados" },
];

// ─── Equipo real ───────────────────────────────────────────────────────────────
export const REAL_TEAM = [
  { name: "Marco Sanchez",       role: "Presidente",                    img: "/images/equipo/marco-sanchez.jpg" },
  { name: "Danna Martinez",      role: "Secretaria General",            img: "/images/equipo/danna-martinez.jpg" },
  { name: "Maria Jose Martinez", role: "Tesorera",                      img: "/images/equipo/maria-jose-martinez.jpg" },
  { name: "Diego Castilla",      role: "Director Institucional",        img: "/images/equipo/diego-castilla.jpg" },
  { name: "Andrea Amaya",        role: "Dir. Operaciones Tecnológicas", img: "/images/equipo/andrea-amaya.jpg" },
];

// ─── Embajadores ──────────────────────────────────────────────────────────────
export const AMBASSADORS = [
  { img: "/personas/vero.jpeg" }
];