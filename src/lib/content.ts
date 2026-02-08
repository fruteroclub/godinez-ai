// All text strings for i18n support
// Currently: Spanish (es)
// To add a new language, create a new object with the same keys

export const content = {
  meta: {
    title: "Godínez.AI — Tu empleado AI que nunca falta al trabajo",
    description:
      "Agentes de inteligencia artificial que trabajan 24/7 por tu negocio. Más baratos que un intern. Más capaces que un equipo.",
  },

  nav: {
    logo: "Godínez.AI",
    links: [
      { label: "Qué es", href: "#que-es" },
      { label: "Planes", href: "#planes" },
      { label: "Capacidades", href: "#capacidades" },
      { label: "Lista de Espera", href: "#lista-de-espera" },
    ],
  },

  hero: {
    headline: "Tu empleado AI que nunca falta al trabajo",
    subtitle:
      "Agentes de inteligencia artificial que trabajan 24/7 por tu negocio. Más baratos que un intern. Más capaces que un equipo.",
    cta: "Únete a la lista de espera",
  },

  problem: {
    headline: "Crece sin",
    headlineAccent: "agotarte",
    headlineSuffix: "... ni contratar más",
    cards: [
      {
        emoji: "💸",
        title: "Contratar es caro",
        description: "IMSS, aguinaldo, vacaciones, capacitación...",
      },
      {
        emoji: "😴",
        title: "Tu equipo duerme",
        description:
          "Pero tus clientes no. Pierdes oportunidades a las 2am.",
      },
      {
        emoji: "📋",
        title: "Tareas repetitivas",
        description:
          "Tu talento humano debería crear, no copiar y pegar.",
      },
    ],
  },

  whatIs: {
    headline: "¿Qué es un Godínez?",
    description:
      "Un Godínez es un agente de IA que vive en tu infraestructura, habla español, y hace el trabajo que te drena para que tú hagas el que te llena.",
    cards: [
      {
        emoji: "💬",
        title: "WhatsApp / Telegram / Email",
        description: "Atiende clientes donde están",
      },
      {
        emoji: "📊",
        title: "Reportes y análisis",
        description: "Genera informes sin que se lo pidas",
      },
      {
        emoji: "🔄",
        title: "Automatización",
        description: "Facturación, seguimiento, CRM, lo que necesites",
      },
    ],
    poweredBy: "Powered by OpenClaw",
    poweredByUrl: "https://openclaw.ai",
  },

  pricing: {
    headline: "Planes",
    headlineAccent: "café diario",
    headlinePrefix: "Menos que un ",
    headlineSuffix: "... bueno, casi",
    note: "Todos los precios en MXN. IVA incluido.",
    plans: [
      {
        name: "El Intern",
        price: "$1,999",
        period: "MXN/mes",
        idealFor: "Ideal para: freelancers, negocios pequeños",
        features: [
          "1 canal de comunicación",
          "Tareas básicas: responder mensajes, agendar, buscar info",
          "Horario de oficina (9am-6pm)",
        ],
        tagline: "Como un becario, pero que sí trabaja",
        popular: false,
      },
      {
        name: "El Asistente",
        price: "$3,499",
        period: "MXN/mes",
        idealFor: "Ideal para: PyMEs, equipos en crecimiento",
        features: [
          "Multi-canal (WhatsApp + Email + más)",
          "Tareas avanzadas: reportes, seguimiento de clientes, contenido",
          "Disponible 18 horas",
        ],
        tagline: "Tu mano derecha que nunca pide vacaciones",
        popular: true,
      },
      {
        name: "El Agente",
        price: "$9,999",
        period: "MXN/mes",
        idealFor: "Ideal para: empresas, founders, power users",
        features: [
          "Todos los canales",
          "Autonomía total: toma decisiones, ejecuta workflows complejos",
          "24/7 sin límites",
        ],
        tagline: "Prácticamente un co-founder que no pide equity",
        popular: false,
      },
    ],
  },

  capabilities: {
    headline: "¿Qué puede hacer tu Godínez?",
    items: [
      {
        emoji: "💬",
        title: "Atención al cliente",
        description: "WhatsApp, Telegram, Email",
      },
      {
        emoji: "📅",
        title: "Gestión de agenda",
        description: "Calendario y citas organizadas",
      },
      {
        emoji: "📝",
        title: "Creación de contenido",
        description: "Copy, posts, emails y más",
      },
      {
        emoji: "📊",
        title: "Reportes y análisis",
        description: "Datos claros sin esfuerzo",
      },
      {
        emoji: "🧾",
        title: "Facturación",
        description: "Seguimiento de pagos automático",
      },
      {
        emoji: "🔍",
        title: "Investigación de mercado",
        description: "Inteligencia competitiva al instante",
      },
      {
        emoji: "📣",
        title: "Marketing digital",
        description: "Redes sociales en piloto automático",
      },
      {
        emoji: "🤝",
        title: "CRM y seguimiento",
        description: "Ningún cliente se te escapa",
      },
    ],
  },

  waitlist: {
    headline: "Deja de perder clientes a las 2am",
    subheadline: "Únete a +200 negocios que ya reservaron su Godínez",
    fields: {
      name: { label: "Nombre", placeholder: "Tu nombre" },
      email: { label: "Email", placeholder: "tu@email.com" },
      company: {
        label: "Empresa o negocio",
        placeholder: "Nombre de tu empresa",
      },
      tasks: {
        label: "¿Qué tareas te gustaría automatizar?",
        placeholder: "Cuéntanos qué te quita más tiempo...",
      },
      teamSize: {
        label: "¿Cuántas personas hay en tu equipo?",
        options: [
          { value: "", label: "Selecciona una opción" },
          { value: "solo", label: "Solo yo" },
          { value: "2-5", label: "2-5" },
          { value: "6-20", label: "6-20" },
          { value: "20+", label: "20+" },
        ],
      },
    },
    submit: "Quiero mi Godínez",
    success:
      "¡Listo! Te avisaremos cuando tu Godínez esté listo para trabajar 🤖",
    error: "Hubo un error. Inténtalo de nuevo.",
  },

  footer: {
    logo: "Godínez.AI",
    tagline: "Un producto de Frutero Club",
    links: [
      { label: "Términos", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
      { label: "Contacto", href: "mailto:hola@godinez.ai" },
    ],
    poweredBy: "Powered by OpenClaw",
    poweredByUrl: "https://openclaw.ai",
    copyright: "© 2025 Godínez.AI. Todos los derechos reservados.",
  },
};
