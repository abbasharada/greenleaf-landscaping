import { defineTable } from "convex/server";
import { v } from "convex/values";

export const servicesTable = defineTable({
  title: v.string(),
  description: v.string(),
  icon: v.string(),
  color: v.string(),
  order: v.number(),
  visible: v.boolean(),
});
