import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../drizzle/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

const seedAgents = [
  {
    name: "Lupita",
    slug: "lupita",
    template: "pmo" as const,
    status: "active" as const,
    config: {
      personality: "Profesional, organizada, proactiva. Habla español mexicano.",
      skills: ["project-management", "scheduling", "reporting", "task-tracking"],
      channels: ["web", "whatsapp"],
    },
  },
  {
    name: "Toño",
    slug: "tono",
    template: "cto" as const,
    status: "active" as const,
    config: {
      personality: "Técnico, directo, eficiente. Habla español mexicano.",
      skills: ["code-review", "architecture", "devops", "debugging"],
      channels: ["web"],
    },
  },
  {
    name: "Marisol",
    slug: "marisol",
    template: "influencer" as const,
    status: "active" as const,
    config: {
      personality: "Creativa, carismática, trendy. Habla español mexicano.",
      skills: ["content-creation", "social-media", "copywriting", "branding"],
      channels: ["web", "whatsapp", "telegram"],
    },
  },
];

async function main() {
  console.log("Seeding agents...");

  for (const agent of seedAgents) {
    const [result] = await db
      .insert(schema.agents)
      .values(agent)
      .onConflictDoUpdate({
        target: schema.agents.slug,
        set: {
          name: agent.name,
          template: agent.template,
          status: agent.status,
          config: agent.config,
          updatedAt: new Date(),
        },
      })
      .returning();

    console.log(`  ✓ ${result.name} (${result.slug}) — ${result.id}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
