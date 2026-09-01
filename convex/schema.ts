import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { contactsTable } from "./schema/contacts.ts";
import { galleryTable } from "./schema/gallery.ts";
import { servicesTable } from "./schema/services.ts";
import { testimonialsTable } from "./schema/testimonials.ts";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("user"))),
  }).index("by_token", ["tokenIdentifier"]),

  contacts: contactsTable,
  gallery: galleryTable,
  services: servicesTable,
  testimonials: testimonialsTable,
});
