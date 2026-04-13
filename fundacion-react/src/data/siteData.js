export const COLORS = {
  brand: "#F21D44",
  secondary: "#293972",
  accent: "#FFB119",
};

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Acerca de", href: "#acerca" },
  { label: "Servicios", href: "#servicios" },
  { label: "Donaciones", href: "#donaciones" },
  { label: "Equipo", href: "#equipo" },
  { label: "Causas", href: "#causas" },
  { label: "Embajadores", href: "#embajadores" },
  { label: "Alianzas", href: "#alianzas" },
  { label: "Contacto", href: "#contacto" },
];

export const SERVICES = [
  {
    icon: "🏥",
    title: "Gestión Médica",
    desc: "¿No sabes a qué servicio médico acudir? ¿Tienes dudas de tu diagnóstico? ¿Requieres medicamentos? Te orientamos.",
    color: COLORS.brand,
  },
  {
    icon: "⚖️",
    title: "Asesoría Jurídica",
    desc: "¿Crees que tus derechos están siendo vulnerados? ¿Alguien te niega el acceso a la salud? Te defendemos.",
    color: COLORS.secondary,
  },
  {
    icon: "🧠",
    title: "Atención Psicológica",
    desc: "¿Te sientes solo en el proceso? ¿Tu salud mental está siendo afectada? Estamos aquí para escucharte.",
    color: COLORS.accent,
  },
];

export const STATS = [
  { value: "500+", label: "Pacientes atendidos" },
  { value: "12", label: "Años de experiencia" },
  { value: "30+", label: "Profesionistas" },
  { value: "100%", label: "Compromiso" },
];

export const TEAM = [
  { initials: "DR", name: "Dr. Roberto Medina", role: "Director Médico" },
  { initials: "LA", name: "Lic. Ana Torres", role: "Asesoría Jurídica" },
  { initials: "PS", name: "Psic. Sandra Ruiz", role: "Salud Mental" },
  { initials: "CE", name: "Carlos Estrada", role: "Coordinador General" },
];

export const AMBASSADORS = [
  { initials: "MG", name: "María González", role: "Héroe contra la leucemia" },
  { initials: "JP", name: "Jorge Pérez", role: "Embajador de vida" },
  { initials: "LM", name: "Laura Mendoza", role: "Voz de esperanza" },
];

export const CAUSES = [
  {
    title: "Acceso a tratamiento",
    desc: "Apoyamos a pacientes a orientarse y acceder a atención médica digna y oportuna.",
  },
  {
    title: "Acompañamiento legal",
    desc: "Defendemos el derecho a la salud y apoyamos en casos de vulneración de derechos.",
  },
  {
    title: "Salud emocional",
    desc: "Ofrecemos contención y acompañamiento psicológico durante el proceso.",
  },
];

export const ALLIANCES = [
  "Hospitales y clínicas",
  "Despachos jurídicos solidarios",
  "Psicólogos especialistas",
  "Empresas socialmente responsables",
];