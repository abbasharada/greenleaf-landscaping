import { defineTable } from "convex/server";
import { v } from "convex/values";

export const galleryTable = defineTable({
  caption: v.string(),
  category: v.union(
    v.literal("Gardens"),
    v.literal("Lawn Care"),
    v.literal("Hardscaping"),
    v.literal("Outdoor Living")
  ),
  imageUrl: v.string(),
  order: v.number(),
  visible: v.boolean(),
});
