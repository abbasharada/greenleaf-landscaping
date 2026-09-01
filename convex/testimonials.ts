import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./users.ts";
import { ConvexError } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").order("asc").collect();
  },
});

export const adminList = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("testimonials").order("asc").collect();
  },
});

export const create = mutation({
  args: { name: v.string(), location: v.string(), rating: v.number(), text: v.string(), visible: v.boolean() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("testimonials", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("testimonials"),
    name: v.optional(v.string()),
    location: v.optional(v.string()),
    rating: v.optional(v.number()),
    text: v.optional(v.string()),
    visible: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const item = await ctx.db.get(args.id);
    if (!item) throw new ConvexError({ message: "Not found", code: "NOT_FOUND" });
    await ctx.db.delete(args.id);
  },
});
