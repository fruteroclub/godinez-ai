import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: February 27, 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Information we collect
            </h2>
            <p>
              When you use Godinez.AI, we may collect the following information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong className="text-white/90">Registration data:</strong>{" "}
                name, email, company, industry
              </li>
              <li>
                <strong className="text-white/90">Usage data:</strong>{" "}
                conversations with your agent, projects, tasks, and files
                created
              </li>
              <li>
                <strong className="text-white/90">Technical data:</strong>{" "}
                IP address, browser type, operating system (collected
                automatically)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. How we use your information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and improve the Service</li>
              <li>Personalize your experience with your AI agent</li>
              <li>Communicate with you about Service updates</li>
              <li>Analyze Service usage in aggregate and anonymous form</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Storage and security
            </h2>
            <p>
              Your data is stored on secure servers. Conversations and agent
              data are kept in an isolated per-workspace environment. We use
              encryption in transit (HTTPS/TLS) for all communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Data sharing
            </h2>
            <p>
              <strong className="text-white/90">
                We do not sell your personal information.
              </strong>{" "}
              We do not share your data with third parties, except:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Infrastructure providers necessary to operate the Service
                (hosting, database)
              </li>
              <li>When required by law or legal process</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. AI models and your data
            </h2>
            <p>
              Your conversations and data{" "}
              <strong className="text-white/90">
                are not used to train AI models
              </strong>
              . Your agent operates in a private, isolated environment. The
              language models used are provided by third parties (OpenClaw)
              under privacy agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Your rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your data in a standard format</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:hola@godinez.ai"
                className="text-magenta hover:underline"
              >
                hola@godinez.ai
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Cookies
            </h2>
            <p>
              We use minimal cookies necessary for the Service to function
              (authentication, language preference). We do not use third-party
              tracking cookies or advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Data retention
            </h2>
            <p>
              We retain your data as long as your account is active. If you
              request account deletion, we will delete your data within 30 days,
              except where the law requires its retention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Changes to this policy
            </h2>
            <p>
              We may update this policy periodically. We will notify you of
              significant changes by email or through a notice in the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Contact
            </h2>
            <p>
              For privacy questions, contact us at{" "}
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
