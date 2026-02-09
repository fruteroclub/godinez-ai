import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Add a new waitlist entry
export const add = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    tasks: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      // Update existing entry
      await ctx.db.patch(existing._id, {
        name: args.name,
        company: args.company,
        tasks: args.tasks,
        teamSize: args.teamSize,
        source: args.source,
      });
      return { success: true, updated: true, id: existing._id };
    }

    // Create new entry
    const id = await ctx.db.insert("waitlist", {
      name: args.name,
      email: args.email,
      company: args.company,
      tasks: args.tasks,
      teamSize: args.teamSize,
      source: args.source,
      createdAt: Date.now(),
    });

    return { success: true, updated: false, id };
  },
});

// Get total count of waitlist entries
export const count = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlist").collect();
    return entries.length;
  },
});

// List all waitlist entries (for admin)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("waitlist")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
