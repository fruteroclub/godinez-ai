// All text strings for i18n support
// Currently: Spanish (es)
// To add a new language, create a new object with the same keys

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
    studio: "Studio",
  },

  beta: {
    banner: "Beta cerrado — accede a Studio con tu código de invitación",
    bannerCta: "Entrar",
    waitlistNote: "¿Ya tienes código de invitación?",
    waitlistNoteCta: "Entra aquí",
  },

  hero: {
    headline: "Tu empleado AI que nunca falta al trabajo",
    subtitle:
      "Agentes IA que aprenden de ti y hacen el trabajo que te drena. Más baratos que un intern. Más rápido que formar un equipo.",
    cta: "Únete a la lista de espera",
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

  whatIs: {
    headline: "¿Qué es un Godínez?",
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
    headline: "Planes",
    headlineAccent: "café diario...",
    headlinePrefix: "Menos que un ",
    headlineSuffix: " bueno, casi",
    note: "Todos los precios en MXN. IVA incluido.",
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

  studio: {
    sidebar: {
      dashboard: "Dashboard",
      chat: "Chat",
      projects: "Proyectos",
      agent: "Agente",
      tasks: "Tareas",
      files: "Archivos",
      activity: "Actividad",
      team: "Equipo",
      settings: "Configuración",
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Bienvenido a tu espacio de trabajo",
      activeProjects: "Proyectos activos",
      pendingTasks: "Tareas pendientes",
      recentMessages: "Mensajes recientes",
      agentStatus: "Estado del agente",
    },
    chat: {
      title: "Chat",
      placeholder: "Escribe un mensaje...",
      send: "Enviar",
      newConversation: "Nueva conversación",
    },
    projects: {
      title: "Proyectos",
      create: "Nuevo proyecto",
      empty: "No tienes proyectos aún. Crea uno para empezar.",
      statusActive: "Activo",
      statusCompleted: "Completado",
      statusArchived: "Archivado",
    },
    tasks: {
      title: "Tareas",
      create: "Nueva tarea",
      empty: "No hay tareas pendientes.",
      statusPending: "Pendiente",
      statusInProgress: "En progreso",
      statusCompleted: "Completada",
      statusFailed: "Fallida",
      statusCancelled: "Cancelada",
    },
    files: {
      title: "Archivos",
      upload: "Subir archivo",
      empty: "No hay archivos aún.",
    },
    activity: {
      title: "Actividad",
      empty: "No hay actividad reciente.",
    },
    team: {
      title: "Equipo",
      invite: "Invitar miembro",
      roleOwner: "Propietario",
      roleAdmin: "Administrador",
      roleMember: "Miembro",
      roleViewer: "Observador",
    },
    settings: {
      title: "Configuración",
      general: "General",
      danger: "Zona de peligro",
    },
    workspaceSelector: {
      title: "Tus espacios de trabajo",
      create: "Crear espacio de trabajo",
      empty: "No tienes espacios de trabajo. Crea uno para empezar.",
    },
    onboarding: {
      title: "Configura tu espacio de trabajo",
      nameLabel: "Nombre del espacio",
      namePlaceholder: "Mi Negocio",
      submit: "Crear espacio",
    },
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
  },
};
