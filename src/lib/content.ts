// All text strings for i18n support
// Spanish (es) — primary language
// English translations: content-en.ts

// Stable section IDs — shared across all locales.
// Used for both HTML id attributes and anchor hrefs.
// NEVER translate these — add new entries here when adding sections.
export const sectionIds = {
  whatIs: "que-es",
  capabilities: "capacidades",
  howItWorks: "como-funciona",
  pricing: "planes",
  faq: "faq",
  waitlist: "lista-de-espera",
  testimonials: "testimonios",
} as const;

export const content = {
  meta: {
    title: "Godínez.AI — Tu empleado AI que nunca falta al trabajo",
    description:
      "Agentes IA que aprenden de ti y hacen el trabajo que te drena. Más baratos que un intern. Más rápido que formar un equipo.",
  },

  nav: {
    logo: "Godínez.AI",
    links: [
      { label: "Qué es", href: `#${sectionIds.whatIs}` },
      { label: "Capacidades", href: `#${sectionIds.capabilities}` },
      { label: "Planes", href: `#${sectionIds.pricing}` },
    ],
    cta: { label: "Quiero el mío", href: `#${sectionIds.waitlist}` },
  },

  hero: {
    headlinePre: "El asistente al que le",
    headlineAccent: "delegas todo",
    subtitle:
      "Agentes IA que aprenden de ti y hacen el trabajo que te drena. Más baratos que un intern. Más rápido que formar un equipo.",
    cta: "Quiero mi Godínez",
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
    line1: "Imagina hacer más, sin escalar tu esfuerzo y estrés.",
    headline: "Recupera lo que",
    headlineAccent: "más importa",
    line2: "Con tu Godínez,",
    line3: "puedes hacerlo",
    subtext: "Listo en minutos, sin código, con las",
    subtextAccent: "Skills IA",
    subtextSuffix: "más avanzadas",
    cta: "Quiero el mío",
    ctaHref: `#${sectionIds.waitlist}`,
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
    subtitle:
      "Un Godínez es un Agente IA que hace el trabajo que te drena para que tú hagas el que te llena. Atiende clientes por WhatsApp, agenda citas, genera reportes, y responde emails. Todo en español, 24/7, personalizado.",
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
    subheadline: "Mejor que ChatGPT. Con menor precio.",
    badge: "Precio de lanzamiento",
    price: "249",
    currency: "MXN",
    period: "/mes",
    priceNote: "Precio de lanzamiento — sube pronto",
    features: [
      "Acceso completo a tu Studio personal",
      "Chat con tu Godínez, 24/7",
      "Más que conversaciones — gestiona proyectos, asigna tareas y organiza mejor",
      "Crea apps, sitios web y flujos automatizados",
      "WhatsApp, Telegram y Email incluidos",
      "Memoria persistente — aprende de ti con el tiempo",
    ],
    cta: "Quiero el mío",
    tagline: "Más barato que un café al día. Más poderoso que un equipo.",
    note: "Todos los precios en MXN. IVA incluido.",
  },

  capabilities: {
    headlinePre: "Qué puede hacer tu ",
    headlineAccent: "Godínez",
    headlineSuffix: "",
    items: [
      {
        emoji: "🛠️",
        title: "Crear apps y sitios web",
        description: "Desde un MVP hasta un sitio completo",
      },
      {
        emoji: "⚙️",
        title: "Automatizar flujos",
        description: "Workflows que corren solos, sin ti",
      },
      {
        emoji: "💬",
        title: "Atención al cliente",
        description: "WhatsApp, Telegram, Email, Studio",
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
        title: "Facturación y finanzas",
        description: "Seguimiento de pagos automático",
      },
      {
        emoji: "🤝",
        title: "CRM y seguimiento",
        description: "Ningún cliente se te escapa",
      },
    ],
  },

  howItWorks: {
    headlinePre: "Tu agente listo en ",
    headlineAccent: "3 minutos",
    headlineSuffix: "",
    subtitle: "Sin código. Sin configuración técnica. Solo responde unas preguntas y tu Godínez empieza a trabajar.",
    steps: [
      {
        number: "01",
        title: "Cuéntanos sobre ti",
        description:
          "Tu nombre, tu negocio, tu rol. En 30 segundos ya sabemos cómo ayudarte.",
      },
      {
        number: "02",
        title: "Elige qué quieres delegar",
        description:
          "¿Vender más? ¿Automatizar lo repetitivo? ¿Crear contenido? Selecciona y listo.",
      },
      {
        number: "03",
        title: "Personaliza tu agente",
        description:
          "Dale nombre y personalidad — profesional, amigable, creativo o técnico. Tú decides.",
      },
      {
        number: "04",
        title: "Activa y delega",
        description:
          "Un clic y tu Godínez está vivo. Te saluda, propone su primer proyecto, y empieza a trabajar.",
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
        label: "¿Qué te gustaría delegar?",
        placeholder: "Cuéntanos qué te quita más tiempo...",
      },
      role: {
        label: "¿Cuál es tu rol?",
        options: [
          { value: "", label: "Selecciona tu rol" },
          { value: "founder", label: "🚀 Fundador/CEO" },
          { value: "marketing", label: "📣 Marketing" },
          { value: "sales", label: "💼 Ventas" },
          { value: "operations", label: "⚙️ Operaciones" },
          { value: "tech", label: "💻 Tecnología" },
          { value: "support", label: "🎧 Soporte" },
          { value: "other", label: "🧩 Otro" },
        ],
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
    submitting: "Enviando...",
    success:
      "¡Listo! Te avisaremos cuando tu Godínez esté listo para trabajar 🤖",
    successFollowup: "Te contactaremos pronto con novedades.",
    error: "Hubo un error. Inténtalo de nuevo.",
  },

  faq: {
    headline: "Preguntas frecuentes",
    items: [
      {
        q: "¿Qué es exactamente un Godínez?",
        a: "Un Godínez es un agente de IA personalizado que trabaja para ti 24/7. Desde tu Studio en studio.godinez.ai, puedes delegarle proyectos completos: crear apps, sitios web, flujos automatizados, contenido, reportes — y mucho más. También atiende a tus clientes en WhatsApp, Telegram y Email mientras tú haces lo que importa.",
      },
      {
        q: "¿Necesito saber programar para usarlo?",
        a: "No. Para empezar, llenas un formulario rápido y en menos de un minuto ya estás hablando con tu Godínez. Para proyectos más avanzados como crear una app o automatizar un flujo, le describes lo que necesitas en lenguaje natural — él lo ejecuta.",
      },
      {
        q: "¿En qué canales funciona?",
        a: "Tu Godínez vive en varios canales: tu Studio personal en studio.godinez.ai (chat + proyectos + archivos), WhatsApp, Telegram y Email. Siempre disponible, en el canal que prefieras.",
      },
      {
        q: "¿Qué puede crear mi Godínez?",
        a: "El cielo es el límite. Tu Godínez puede crear apps y sitios web funcionales, automatizar flujos de trabajo, generar reportes, redactar contenido, gestionar clientes y proyectos. Es como tener un equipo técnico y creativo disponible 24/7.",
      },
      {
        q: "¿Qué tan diferente es a ChatGPT?",
        a: "ChatGPT es una herramienta genérica de conversación. Tu Godínez es un agente personalizado para tu negocio — con memoria persistente de todo lo que hacen juntos, integrado a tus canales, con capacidad de ejecutar proyectos completos, y configurado para tu forma de trabajar.",
      },
      {
        q: "¿Qué pasa con mis datos?",
        a: "Tus datos son tuyos. Tu Godínez vive en un entorno privado y aislado — no compartimos información con terceros ni la usamos para entrenar modelos.",
      },
    ],
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
