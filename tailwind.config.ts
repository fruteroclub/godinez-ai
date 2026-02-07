import type { Config } from "tailwindcss";

/**
 * Godínez.AI — Tailwind Config (v4)
 *
 * In Tailwind v4, the primary theme config lives in globals.css via @theme.
 * This file exists for tooling compatibility and as a reference for the
 * design system tokens. The source of truth is src/app/globals.css.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        magenta: {
          DEFAULT: "#E91E8C",
          light: "#FF4DA6",
          dark: "#C4177A",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
        },
        gold: {
          DEFAULT: "#FFB800",
          light: "#FFF0C2",
        },
        dark: "#0A0A0A",
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#3A3A3A",
        },
        cream: {
          DEFAULT: "#FFF9F5",
          dark: "#FFF0E8",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
