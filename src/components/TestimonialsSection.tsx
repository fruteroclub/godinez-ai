import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    quote:
      "Godínez me ha reemplazado como dev principal del proyecto. Ahora dirijo el desarrollo, mientras me muevo en Uber o transporte público.",
    author: "Mel",
    role: "Founder",
    company: "Frutero",
    companyUrl: "https://frutero.club",
  },
];

export default function TestimonialsSection() {
  return (
    <AnimatedSection
      id="testimonios"
      className="relative py-24 sm:py-32 bg-dark overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            Otros ya{" "}
            <span className="text-gold font-[family-name:var(--font-playfair)] italic font-black">
              lo lograron
            </span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="relative mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-charcoal/50 border border-white/10 rounded-2xl p-8 sm:p-10"
            >
              {/* Quote mark */}
              <div className="absolute -top-4 left-8 text-6xl text-gold/20 font-serif">
                "
              </div>

              {/* Quote */}
              <blockquote className="relative text-xl sm:text-2xl text-white/90 leading-relaxed mb-8 font-medium">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-magenta to-violet flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.author[0]}
                </div>

                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-white/50 text-sm">
                    {testimonial.role},{" "}
                    <a
                      href={testimonial.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-magenta hover:text-magenta-light transition-colors"
                    >
                      {testimonial.company}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#lista-de-espera"
            className="inline-block bg-magenta hover:bg-magenta-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-magenta/30 cursor-pointer"
          >
            Obtén tu Godínez →
          </a>
          <a
            href="https://godinez.ai/#testimonios"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium px-4 py-3"
          >
            Más testimonios
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
