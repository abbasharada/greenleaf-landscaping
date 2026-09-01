import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./users.ts";
import { ConvexError } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    service: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", { ...args, status: "new" });
  },
});

export const list = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args): Promise<Array<{
    _id: string; _creationTime: number; name: string; email: string;
    phone?: string; service?: string; message: string;
    status: "new" | "in_review" | "quoted" | "closed"; notes?: string;
  }>> => {
    await requireAdmin(ctx);
    if (args.status && args.status !== "all") {
      return await ctx.db
        .query("contacts")
        .withIndex("by_status", (q) => q.eq("status", args.status as "new" | "in_review" | "quoted" | "closed"))
        .order("desc")
        .collect() as Array<{ _id: string; _creationTime: number; name: string; email: string; phone?: string; service?: string; message: string; status: "new" | "in_review" | "quoted" | "closed"; notes?: string; }>;
    }
    return await ctx.db.query("contacts").order("desc").collect() as Array<{ _id: string; _creationTime: number; name: string; email: string; phone?: string; service?: string; message: string; status: "new" | "in_review" | "quoted" | "closed"; notes?: string; }>;
  },
});

export const updateStatus = mutation({
  args: { id: v.id("contacts"), status: v.union(v.literal("new"), v.literal("in_review"), v.literal("quoted"), v.literal("closed")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const updateNotes = mutation({
  args: { id: v.id("contacts"), notes: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { notes: args.notes });
  },
});

export const remove = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const contact = await ctx.db.get(args.id);
    if (!contact) throw new ConvexError({ message: "Not found", code: "NOT_FOUND" });
    await ctx.db.delete(args.id);
  },
});

export const stats = query({
  args: {},
  handler: async (ctx): Promise<{ total: number; newCount: number; inReview: number; quoted: number; closed: number }> => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("contacts").collect();
    return {
      total: all.length,
      newCount: all.filter((c) => c.status === "new").length,
      inReview: all.filter((c) => c.status === "in_review").length,
      quoted: all.filter((c) => c.status === "quoted").length,
      closed: all.filter((c) => c.status === "closed").length,
    };
  },
});
