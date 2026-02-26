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
    headlinePre: "The assistant you",
    headlineAccent: "delegate everything to",
    subtitle:
      "AI agents that learn from you and do the work that drains you. Cheaper than an intern. Faster than building a team.",
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
    statement: "Imagine doing more, without scaling your effort and stress.",
    headlinePre: "Reclaim what",
    headlineAccent: "matters most",
    withGodinez: "With your Godínez,",
    canDoIt: "you can do it",
    readyInPre: "Ready in minutes, no code, with the most advanced",
    readyInAccent: "AI Skills",
    readyInSuffix: "",
    cta: "I want mine",
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
        emoji: "💬",
        title: "Customer support",
        description: "WhatsApp, Telegram, Email",
      },
      {
        emoji: "📅",
        title: "Calendar management",
        description: "Organized schedule and appointments",
      },
      {
        emoji: "📝",
        title: "Content creation",
        description: "Copy, posts, emails and more",
      },
      {
        emoji: "📊",
        title: "Reports & analytics",
        description: "Clear data without the effort",
      },
      {
        emoji: "🧾",
        title: "Invoicing",
        description: "Automatic payment tracking",
      },
      {
        emoji: "🔍",
        title: "Market research",
        description: "Competitive intelligence in an instant",
      },
      {
        emoji: "📣",
        title: "Digital marketing",
        description: "Social media on autopilot",
      },
      {
        emoji: "🤝",
        title: "CRM & follow-up",
        description: "No customer slips through the cracks",
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

  footer: {
    logo: "Godínez.AI",
    tagline: "The assistant you delegate everything to",
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
