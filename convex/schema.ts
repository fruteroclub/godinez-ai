import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    tasks: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    tier: v.string(), // "intern" | "assistant" | "agent"
    industry: v.string(), // "developers" | "remote" | "creators" | "realestate" | "freelancers" | "sales" | "legal" | "consulting" | "marketing"
    createdAt: v.number(),
    source: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"])
    .index("by_tier", ["tier"])
    .index("by_industry", ["industry"]),
});
