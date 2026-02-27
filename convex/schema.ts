import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const tier = v.union(
  v.literal("becario"),
  v.literal("asistente"),
  v.literal("agente"),
  // legacy values
  v.literal("intern"),
  v.literal("assistant"),
  v.literal("agent"),
);

const industry = v.union(
  v.literal("finanzas"),
  v.literal("salud"),
  v.literal("ventas"),
  v.literal("founder"),
  v.literal("estudiante"),
  v.literal("remoto"),
  v.literal("freelancer"),
  v.literal("creativo"),
  v.literal("desarrollador"),
  v.literal("administracion"),
  // legacy values
  v.literal("developers"),
  v.literal("remote"),
  v.literal("creators"),
  v.literal("realestate"),
  v.literal("freelancers"),
  v.literal("sales"),
  v.literal("legal"),
  v.literal("consulting"),
  v.literal("marketing"),
);

export default defineSchema({
  waitlist: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    tasks: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    tier,
    industry,
    createdAt: v.number(),
    source: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"])
    .index("by_tier", ["tier"])
    .index("by_industry", ["industry"]),
});
