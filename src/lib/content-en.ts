// English translations
// Structure must match content.ts exactly

import type { Content } from "./content";

export const contentEn: Content = {
  meta: {
    title: "Godínez.AI — Your AI employee that never misses work",
    description:
      "AI agents that learn from you and do the work that drains you. Cheaper than an intern. Faster than building a team.",
  },

  nav: {
    logo: "Godínez.AI",
    links: [
      { label: "What is it", href: "#what-is-it" },
      { label: "Plans", href: "#plans" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Waitlist", href: "#waitlist" },
    ],
  },

  hero: {
    headlinePre: "Your AI employee that",
    headlineAccent: "never fails",
    subtitle:
      "An agent that learns, executes, and creates. Apps, workflows, content, clients — all delegated. More affordable than a team. Faster than any tool.",
    cta: "Join the waitlist",
    learnMore: "Learn more",
    socialProof: "on the waitlist",
  },

  problem: {
    headline: "Grow without burning out...",
    headlineAccent: "or hiring more",
    items: [
      {
        title: "Hiring is expensive",
        description: "Benefits, bonuses, vacation, training...",
      },
      {
        title: "Your team sleeps",
        description:
          "But your customers don't. You lose opportunities at 2am.",
      },
      {
        title: "5 AI subscriptions",
        description:
          "You pay for ChatGPT, Notion AI, Jasper... and work is still fragmented.",
      },
    ],
  },

  bridge: {
    line1: "Imagine doing more, without scaling your effort and stress.",
    headline: "Reclaim what",
    headlineAccent: "matters most",
    line2: "With your Godínez,",
    line3: "you can do it",
    subtext: "Ready in minutes, no code needed, with the most advanced",
    subtextAccent: "AI Skills",
    subtextSuffix: "",
    cta: "I want mine",
    ctaHref: "#lista-de-espera",
  },

  whatIs: {
    headlinePre: "What is a ",
    headlineAccent: "Godínez",
    headlineSuffix: "?",
    descriptionPre: "A ",
    descriptionHighlight1: "Godínez",
    descriptionMid: " is an ",
    descriptionHighlight2: "AI Agent",
    descriptionEnd:
      " that does the work that drains you so you can do the work that fulfills you. It handles customer service on WhatsApp, schedules appointments, generates reports, and answers emails. All in your language, 24/7, personalized.",
    subtitle:
      "A Godínez is an AI Agent that does the draining work so you can do the fulfilling work. Handles WhatsApp clients, schedules appointments, generates reports, replies to emails. All in your language, 24/7, personalized.",
    cards: [
      {
        title: "Always available",
        description:
          "Your own assistant, on any device, always ready",
      },
      {
        title: "Learns from you",
        description:
          "Persistent memory: context, preferences, conversations",
      },
      {
        title: "Personalized",
        description:
          "Dedicated configuration for your infrastructure and workflows",
      },
    ],
    poweredBy: "Powered by OpenClaw",
    poweredByUrl: "https://openclaw.ai",
  },

  pricing: {
    headlinePrefix: "Less than a ",
    headlineAccent: "daily coffee...",
    headlineSuffix: " well, almost",
    note: "All prices in MXN. Tax included.",
    ctaText: "Get started",
    popularBadge: "Popular",
    plans: [
      {
        name: "Intern",
        price: "$1,999",
        period: "MXN/mo",
        idealFor: "Ideal for: freelancers, small businesses",
        features: [
          "1 communication channel",
          "Basic tasks: reply to messages, schedule, search info",
          "Office hours (9am-6pm)",
        ],
        tagline: "Like an intern, but one that actually works",
        popular: false,
      },
      {
        name: "Assistant",
        price: "$3,499",
        period: "MXN/mo",
        idealFor: "Ideal for: SMBs, growing teams",
        features: [
          "Multi-channel (WhatsApp + Email + more)",
          "Advanced tasks: reports, client follow-up, content",
          "Available 18 hours",
        ],
        tagline: "Your right hand that never asks for vacation",
        popular: true,
      },
      {
        name: "Agent",
        price: "$9,999",
        period: "MXN/mo",
        idealFor: "Ideal for: companies, founders, power users",
        features: [
          "All channels",
          "Full autonomy: makes decisions, runs complex workflows",
          "24/7 unlimited",
        ],
        tagline: "Basically a co-founder that doesn't ask for equity",
        popular: false,
      },
    ],
  },

  capabilities: {
    headlinePre: "What your ",
    headlineAccent: "Godínez",
    items: [
      {
        emoji: "🛠️",
        title: "Build apps & websites",
        description: "From MVP to full production site",
      },
      {
        emoji: "⚙️",
        title: "Automate workflows",
        description: "Workflows that run themselves, without you",
      },
      {
        emoji: "💬",
        title: "Customer support",
        description: "WhatsApp, Telegram, Email, Studio",
      },
      {
        emoji: "📅",
        title: "Schedule management",
        description: "Calendar and appointments organized",
      },
      {
        emoji: "📝",
        title: "Content creation",
        description: "Copy, posts, emails and more",
      },
      {
        emoji: "📊",
        title: "Reports & analytics",
        description: "Clear data without effort",
      },
      {
        emoji: "🧾",
        title: "Invoicing & finance",
        description: "Automatic payment tracking",
      },
      {
        emoji: "🤝",
        title: "CRM & follow-up",
        description: "No client slips through the cracks",
      },
    ],
  },

  testimonials: {
    headlinePre: "Others already ",
    headlineAccent: "made it happen",
    items: [
      {
        quote:
          "Godínez has replaced me as the lead dev on the project. Now I direct development while commuting on Uber or public transit.",
        author: "Mel",
        role: "Founder",
        company: "Frutero",
        companyUrl: "https://frutero.club",
      },
    ],
    cta: "Get your Godínez →",
    moreTestimonials: "More testimonials",
  },

  waitlist: {
    headlinePre: "Reclaim ",
    headlineAccent: "your time",
    headlineSuffix: "Delegate the rest",
    subheadline:
      "Your Godínez handles what drains your energy, so you can do what fulfills you.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@email.com" },
      company: {
        label: "Company or business",
        placeholder: "Your company name",
      },
      tasks: {
        label: "What tasks would you like to automate?",
        placeholder: "Tell us what takes up most of your time...",
      },
      teamSize: {
        label: "How many people are on your team?",
        options: [
          { value: "", label: "Select an option" },
          { value: "solo", label: "Just me" },
          { value: "2-5", label: "2-5" },
          { value: "6-20", label: "6-20" },
          { value: "20+", label: "20+" },
        ],
      },
      tier: {
        label: "Tier of interest",
        options: [
          { value: "", label: "Select a tier" },
          { value: "becario", label: "🌱 Intern" },
          { value: "asistente", label: "⚡ Assistant" },
          { value: "agente", label: "🚀 Agent" },
        ],
      },
      industry: {
        label: "Industry",
        options: [
          { value: "", label: "Select your industry" },
          { value: "finanzas", label: "💰 Finance" },
          { value: "salud", label: "🏥 Healthcare" },
          { value: "ventas", label: "📈 Sales" },
          { value: "founder", label: "🚀 Founder" },
          { value: "estudiante", label: "🎓 Student" },
          { value: "remoto", label: "🏠 Remote Work" },
          { value: "freelancer", label: "🎯 Freelancer" },
          { value: "creativo", label: "🎬 Creative" },
          { value: "desarrollador", label: "💻 Developer" },
          { value: "administracion", label: "📊 Administration" },
        ],
      },
    },
    submit: "I want my Godínez",
    submitting: "Sending...",
    success:
      "All set! We'll let you know when your Godínez is ready to work 🤖",
    successFollowup: "We'll reach out soon with updates.",
    error: "Something went wrong. Please try again.",
  },

  faq: {
    headline: "Frequently asked questions",
    items: [
      {
        q: "What exactly is a Godínez?",
        a: "A Godínez is a personalized AI agent that works for you 24/7. From your Studio at studio.godinez.ai, you can delegate full projects: build apps, websites, automated workflows, content, reports — and much more. It also handles your clients on WhatsApp, Telegram, and Email while you focus on what matters.",
      },
      {
        q: "Do I need to know how to code?",
        a: "Not at all. To get started, you fill out a quick form and in less than a minute you are already talking with your Godínez. For more advanced projects like building an app or automating a workflow, you describe what you need in plain language — your Godínez handles the execution.",
      },
      {
        q: "Which channels does it work on?",
        a: "Your Godínez lives across multiple channels: your personal Studio at studio.godinez.ai (chat + projects + files), WhatsApp, Telegram, and Email. Always available, on whichever channel you prefer.",
      },
      {
        q: "What can my Godínez create?",
        a: "The sky is the limit. Your Godínez can build functional apps and websites, automate workflows, generate reports, write content, manage clients and projects. It is like having a technical and creative team available 24/7.",
      },
      {
        q: "How is it different from ChatGPT?",
        a: "ChatGPT is a generic conversation tool. Your Godínez is an agent personalized for your business — with persistent memory of everything you build together, integrated into your channels, capable of executing full projects, and configured for your way of working.",
      },
      {
        q: "What happens to my data?",
        a: "Your data is yours. Your Godínez lives in a private, isolated environment — we do not share your information with third parties or use it to train models.",
      },
    ],
  },

  footer: {
    logo: "Godínez.AI",
    tagline: "Your AI co-worker that never clocks out",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Contact", href: "mailto:hola@godinez.ai" },
    ],
    poweredBy: "Powered by OpenClaw",
    poweredByUrl: "https://openclaw.ai",
    copyright: "© 2026 Godínez.AI by Frutero",
    builtByPre: "Built by a",
    builtBySuffix: "from Frutero",
  },
};
