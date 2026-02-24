import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { content } from "@/lib/content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://godinez.ai"),
  title: {
    default: content.meta.title,
    template: "%s | Godínez.AI",
  },
  description: content.meta.description,
  keywords: [
    "AI",
    "asistente virtual",
    "automatización",
    "PyMEs",
    "LATAM",
    "agente IA",
    "productividad",
    "delegación",
    "español",
  ],
  authors: [{ name: "Frutero Club", url: "https://frutero.club" }],
  creator: "Frutero Club",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: "https://godinez.ai",
    siteName: "Godínez.AI",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Godínez.AI - Tu asistente AI que nunca falta al trabajo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    creator: "@fruteroclub",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const body = (
    <html lang="es">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} antialiased`}
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {children}
      </body>
    </html>
  );

  if (!clerkKey) return body;

  return <ClerkProvider>{body}</ClerkProvider>;
}
