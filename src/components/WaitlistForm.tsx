"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

// Success robot illustration
function SuccessRobot() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-32 h-32 mx-auto mb-6" aria-hidden="true">
      {/* Body */}
      <rect x="35" y="40" width="50" height="50" rx="12" fill="#111111" stroke="#8B5CF6" strokeWidth="2" />
      {/* Screen */}
      <rect x="45" y="50" width="30" height="20" rx="4" fill="#0A0A0A" />
      {/* Happy eyes */}
      <path d="M52 56C52 58 54 60 56 58" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 56C68 58 66 60 64 58" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
      {/* Big smile */}
      <path d="M52 66Q60 74 68 66" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Antenna */}
      <line x1="60" y1="40" x2="60" y2="28" stroke="#8B5CF6" strokeWidth="2" />
      <circle cx="60" cy="24" r="4" fill="#E91E8C">
        <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
      </circle>
      {/* Arms raised in celebration */}
      <path d="M35 60L20 45" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
      <path d="M85 60L100 45" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" />
      {/* Confetti */}
      <circle cx="25" cy="35" r="3" fill="#FFB800" opacity="0.8">
        <animate attributeName="cy" values="35;25;35" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="95" cy="40" r="2" fill="#E91E8C" opacity="0.6">
        <animate attributeName="cy" values="40;30;40" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="55" r="2" fill="#8B5CF6" opacity="0.7">
        <animate attributeName="cy" values="55;45;55" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="60" r="3" fill="#FFB800" opacity="0.5">
        <animate attributeName="cy" values="60;50;60" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      tasks: formData.get("tasks") as string,
      teamSize: formData.get("teamSize") as string,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(content.waitlist.error);
      }
    } catch {
      setError(content.waitlist.error);
    } finally {
      setIsLoading(false);
    }
  };

  const { fields } = content.waitlist;

  if (isSubmitted) {
    return (
      <AnimatedSection
        id="lista-de-espera"
        className="relative py-24 sm:py-32 bg-dark overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <SuccessRobot />
          <p className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {content.waitlist.success}
          </p>
          <p className="text-white/50">
            Te contactaremos pronto con novedades.
          </p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection
      id="lista-de-espera"
      className="relative py-24 sm:py-32 bg-dark overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center text-white mb-4">
          {content.waitlist.headline}
        </h2>
        <p className="text-center text-white/40 mb-12">
          Sé de los primeros en automatizar tu negocio
        </p>

        {/* Form card */}
        <div className="relative">
          {/* Gradient border */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-magenta/50 via-violet/50 to-gold/50 blur-sm opacity-50" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-[#111111] rounded-2xl p-8 sm:p-10 space-y-6"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                {fields.name.label}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={fields.name.placeholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-magenta focus:ring-2 focus:ring-magenta/20 outline-none transition-all text-white placeholder:text-white/30"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                {fields.email.label}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder={fields.email.placeholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-magenta focus:ring-2 focus:ring-magenta/20 outline-none transition-all text-white placeholder:text-white/30"
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                {fields.company.label}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder={fields.company.placeholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-magenta focus:ring-2 focus:ring-magenta/20 outline-none transition-all text-white placeholder:text-white/30"
              />
            </div>

            {/* Tasks */}
            <div>
              <label
                htmlFor="tasks"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                {fields.tasks.label}
              </label>
              <textarea
                id="tasks"
                name="tasks"
                rows={3}
                placeholder={fields.tasks.placeholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-magenta focus:ring-2 focus:ring-magenta/20 outline-none transition-all resize-none text-white placeholder:text-white/30"
              />
            </div>

            {/* Team Size */}
            <div>
              <label
                htmlFor="teamSize"
                className="block text-sm font-medium text-white/70 mb-2"
              >
                {fields.teamSize.label}
              </label>
              <select
                id="teamSize"
                name="teamSize"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-magenta focus:ring-2 focus:ring-magenta/20 outline-none transition-all text-white"
              >
                {fields.teamSize.options.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#111111] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-magenta hover:bg-magenta-dark text-white font-semibold py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-magenta/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                content.waitlist.submit
              )}
            </button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
