import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./users.ts";
import { ConvexError } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("gallery").order("asc").collect();
  },
});

export const adminList = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("gallery").order("asc").collect();
  },
});

export const create = mutation({
  args: {
    caption: v.string(),
    category: v.union(v.literal("Gardens"), v.literal("Lawn Care"), v.literal("Hardscaping"), v.literal("Outdoor Living")),
    imageUrl: v.string(),
    order: v.number(),
    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("gallery", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("gallery"),
    caption: v.optional(v.string()),
    category: v.optional(v.union(v.literal("Gardens"), v.literal("Lawn Care"), v.literal("Hardscaping"), v.literal("Outdoor Living"))),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    visible: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const item = await ctx.db.get(args.id);
    if (!item) throw new ConvexError({ message: "Not found", code: "NOT_FOUND" });
    await ctx.db.delete(args.id);
  },
});
