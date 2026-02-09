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
  const [isVisible, setIsVisible] = useState(true); // Start visible to prevent flash

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return; // Already visible
    }

    // Check if element is in initial viewport - if so, stay visible
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const inInitialViewport = rect.top < window.innerHeight + 100;
      
      if (inInitialViewport) {
        // Element is in or near viewport on load - keep visible
        return;
      }
      
      // Element is below viewport - set up animation
      setIsVisible(false);
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { 
          threshold: 0,
          rootMargin: "50px 0px 50px 0px"
        }
      );

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, []);

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
