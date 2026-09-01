import { defineTable } from "convex/server";
import { v } from "convex/values";

export const contactsTable = defineTable({
  name: v.string(),
  email: v.string(),
  phone: v.optional(v.string()),
  service: v.optional(v.string()),
  message: v.string(),
  status: v.union(
    v.literal("new"),
    v.literal("in_review"),
    v.literal("quoted"),
    v.literal("closed")
  ),
  notes: v.optional(v.string()),
}).index("by_status", ["status"]);
