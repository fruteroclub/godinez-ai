"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({
  children,
  className = "",
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Quick fallback for mobile (150ms instead of 1s)
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer);
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0,
        rootMargin: "100px 0px 100px 0px" // Larger margin for earlier trigger
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  // Before hydration, show content (no animation flicker)
  if (!hasHydrated) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      className={`${className} transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </section>
  );
}
