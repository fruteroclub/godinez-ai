import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    tasks: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    role: v.optional(v.string()),
    // legacy fields (kept for existing data)
    tier: v.optional(v.string()),
    industry: v.optional(v.string()),
    createdAt: v.number(),
    source: v.optional(v.string()),
    // referral system fields
    status: v.optional(v.string()), // "pending" | "invited" | "signed_up"
    referralCode: v.optional(v.string()),
    invitedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"])
    .index("by_role", ["role"])
    .index("by_status", ["status"]),
});
