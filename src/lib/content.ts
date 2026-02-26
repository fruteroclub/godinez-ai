// All text strings for i18n support
// Spanish (es) — primary language
// English translations: content-en.ts

export const content = {
  meta: {
    title: "Godínez.AI — Tu empleado AI que nunca falta al trabajo",
    description:
      "Agentes IA que aprenden de ti y hacen el trabajo que te drena. Más baratos que un intern. Más rápido que formar un equipo.",
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
    headlinePre: "El asistente al que le",
    headlineAccent: "delegas todo",
    subtitle:
      "Agentes IA que aprenden de ti y hacen el trabajo que te drena. Más baratos que un intern. Más rápido que formar un equipo.",
    cta: "Únete a la lista de espera",
    learnMore: "Conoce más",
    socialProof: "en lista de espera",
  },

  problem: {
    headline: "Crece sin agotarte...",
    headlineAccent: "ni contratar más",
    items: [
      {
        title: "Contratar es caro",
        description: "IMSS, aguinaldo, vacaciones, capacitación...",
      },
      {
        title: "Tu equipo duerme",
        description: "Pero tus clientes no. Pierdes oportunidades a las 2am.",
      },
      {
        title: "5 suscripciones de IA",
        description:
          "Pagas ChatGPT, Notion AI, Jasper... y el trabajo sigue fragmentado.",
      },
    ],
  },

  bridge: {
    statement: "Imagina hacer más, sin escalar tu esfuerzo y estrés.",
    headlinePre: "Recupera lo que",
    headlineAccent: "más importa",
    withGodinez: "Con tu Godínez,",
    canDoIt: "puedes hacerlo",
    readyInPre: "Listo en minutos, sin código, con las",
    readyInAccent: "Skills IA",
    readyInSuffix: "más avanzadas",
    cta: "Quiero el mío",
  },

  whatIs: {
    headlinePre: "¿Qué es un ",
    headlineAccent: "Godínez",
    headlineSuffix: "?",
    descriptionPre: "Un ",
    descriptionHighlight1: "Godínez",
    descriptionMid: " es un ",
    descriptionHighlight2: "Agente IA",
    descriptionEnd:
      " que hace el trabajo que te drena para que tú hagas el que te llena. Atiende clientes por WhatsApp, agenda citas, genera reportes, y responde emails. Todo en español, 24/7, personalizado.",
    cards: [
      {
        title: "Siempre disponible",
        description:
          "Tu propio asistente, en cualquier dispositivo, siempre en español",
      },
      {
        title: "Aprende de ti",
        description:
          "Memoria persistente: contexto, preferencias, conversaciones",
      },
      {
        title: "Personalizado",
        description:
          "Configuración dedicada para tu infraestructura y flujos de trabajo",
      },
    ],
    poweredBy: "Powered by OpenClaw",
    poweredByUrl: "https://openclaw.ai",
  },

  pricing: {
    headlinePrefix: "Menos que un ",
    headlineAccent: "café diario...",
    headlineSuffix: " bueno, casi",
    note: "Todos los precios en MXN. IVA incluido.",
    ctaText: "Empezar",
    popularBadge: "Popular",
    plans: [
      {
        name: "Becario",
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
        name: "Asistente",
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
        name: "Agente",
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
    headlinePre: "Qué puede hacer tu ",
    headlineAccent: "Godínez",
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

  testimonials: {
    headlinePre: "Otros ya ",
    headlineAccent: "lo lograron",
    items: [
      {
        quote:
          "Godínez me ha reemplazado como dev principal del proyecto. Ahora dirijo el desarrollo, mientras me muevo en Uber o transporte público.",
        author: "Mel",
        role: "Founder",
        company: "Frutero",
        companyUrl: "https://frutero.club",
      },
    ],
    cta: "Obtén tu Godínez →",
    moreTestimonials: "Más testimonios",
  },

  waitlist: {
    headlinePre: "Recupera ",
    headlineAccent: "tu tiempo",
    headlineSuffix: "Delega el resto",
    subheadline:
      "Tu Godínez se encarga de lo que te quita energía, para que tú hagas lo que te llena.",
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
      tier: {
        label: "Tier de interés",
        options: [
          { value: "", label: "Selecciona un tier" },
          { value: "becario", label: "🌱 Becario" },
          { value: "asistente", label: "⚡ Asistente" },
          { value: "agente", label: "🚀 Agente" },
        ],
      },
      industry: {
        label: "Industria",
        options: [
          { value: "", label: "Selecciona tu industria" },
          { value: "finanzas", label: "💰 Finanzas" },
          { value: "salud", label: "🏥 Salud" },
          { value: "ventas", label: "📈 Ventas" },
          { value: "founder", label: "🚀 Founder" },
          { value: "estudiante", label: "🎓 Estudiante" },
          { value: "remoto", label: "🏠 Trabajo Remoto" },
          { value: "freelancer", label: "🎯 Freelancer" },
          { value: "creativo", label: "🎬 Creativo" },
          { value: "desarrollador", label: "💻 Desarrollador" },
          { value: "administracion", label: "📊 Administración" },
        ],
      },
    },
    submit: "Quiero mi Godínez",
    submitting: "Enviando...",
    success:
      "¡Listo! Te avisaremos cuando tu Godínez esté listo para trabajar 🤖",
    successFollowup: "Te contactaremos pronto con novedades.",
    error: "Hubo un error. Inténtalo de nuevo.",
  },

  footer: {
    logo: "Godínez.AI",
    tagline: "El asistente al que le delegas todo",
    links: [
      { label: "Términos", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
      { label: "Contacto", href: "mailto:hola@godinez.ai" },
    ],
    poweredBy: "Powered by OpenClaw",
    poweredByUrl: "https://openclaw.ai",
    copyright: "© 2026 Godínez.AI por Frutero",
    builtByPre: "Construido por un",
    builtBySuffix: "de Frutero",
  },
};

export type Content = typeof content;
