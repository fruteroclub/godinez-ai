import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-magenta transition-colors text-sm mb-12"
        >
          &larr; Back to Godinez.AI
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: February 27, 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Acceptance of terms
            </h2>
            <p>
              By accessing and using Godinez.AI (&ldquo;the Service&rdquo;),
              provided by Pulpa Labs / Frutero Club (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;), you agree to these terms of service. If you do
              not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Description of the service
            </h2>
            <p>
              Godinez.AI is an AI agent platform currently in beta. The Service
              allows users to interact with AI assistants to automate tasks,
              manage projects, and communicate across multiple channels.
            </p>
            <p className="mt-2 text-gold/80 text-sm">
              Note: This service is in beta. Features, availability, and
              performance may change without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Acceptable use
            </h2>
            <p>You agree to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide truthful information when registering</li>
              <li>Not use the Service for illegal activities</li>
              <li>Not attempt to access other users&apos; accounts or data</li>
              <li>Not abuse, overload, or interfere with the Service</li>
              <li>
                Not use the Service to generate harmful, discriminatory, or
                rights-infringing content
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Intellectual property
            </h2>
            <p>
              Content you create using the Service belongs to you. However, we
              reserve the right to use anonymized and aggregated data to improve
              the Service. The platform, its code, design, and brand are the
              property of Pulpa Labs / Frutero Club.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Limitation of liability
            </h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo;, without warranties of any kind. During the beta
              phase:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                We do not guarantee continuous or error-free availability
              </li>
              <li>Data may be lost during updates</li>
              <li>
                AI-generated responses may contain errors or inaccuracies
              </li>
              <li>
                We are not responsible for decisions made based on agent
                responses
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Payments and billing
            </h2>
            <p>
              Published prices are subject to change. During the beta phase,
              launch pricing as indicated on the main page will apply. All
              prices are in Mexican pesos (MXN) and include VAT.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to the
              Service at any time, with or without cause, with or without prior
              notice. You may stop using the Service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Changes to these terms
            </h2>
            <p>
              We may modify these terms at any time. Changes will take effect
              upon publication on this page. Continued use of the Service
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a
                href="mailto:hola@godinez.ai"
                className="text-magenta hover:underline"
              >
                hola@godinez.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
