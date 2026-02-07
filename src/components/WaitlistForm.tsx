"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";
import { BlobYellow } from "./BlobSVG";

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
        className="relative py-20 sm:py-28 bg-purple/5 overflow-hidden"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-7xl mb-6">🎉</div>
          <p className="text-2xl font-bold text-charcoal">
            {content.waitlist.success}
          </p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection
      id="lista-de-espera"
      className="relative py-20 sm:py-28 bg-purple/5 overflow-hidden"
    >
      <BlobYellow className="absolute -right-20 -bottom-20 w-72 h-72 opacity-15" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-charcoal mb-12">
          {content.waitlist.headline}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-purple/10 space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              {fields.name.label}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={fields.name.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-purple/20 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all text-charcoal"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              {fields.email.label}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={fields.email.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-purple/20 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all text-charcoal"
            />
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              {fields.company.label}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder={fields.company.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-purple/20 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all text-charcoal"
            />
          </div>

          {/* Tasks */}
          <div>
            <label
              htmlFor="tasks"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              {fields.tasks.label}
            </label>
            <textarea
              id="tasks"
              name="tasks"
              rows={3}
              placeholder={fields.tasks.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-purple/20 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all resize-none text-charcoal"
            />
          </div>

          {/* Team Size */}
          <div>
            <label
              htmlFor="teamSize"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              {fields.teamSize.label}
            </label>
            <select
              id="teamSize"
              name="teamSize"
              required
              className="w-full px-4 py-3 rounded-xl border border-purple/20 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all bg-white text-charcoal"
            >
              {fields.teamSize.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple hover:bg-purple-dark text-white font-semibold py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-purple/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Enviando..." : content.waitlist.submit}
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
}
