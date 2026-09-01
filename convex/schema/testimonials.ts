import { defineTable } from "convex/server";
import { v } from "convex/values";

export const testimonialsTable = defineTable({
  name: v.string(),
  location: v.string(),
  rating: v.number(),
  text: v.string(),
  visible: v.boolean(),
});
