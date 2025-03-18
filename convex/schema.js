import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bikes: defineTable({
    name: v.string(),
    description: v.string(),
    hourlyRate: v.number(),
    dailyRate: v.number(),
    imageUrl: v.optional(v.string()),
    bikeType: v.string(),
    features: v.array(v.string()),
    available: v.boolean(),
    createdAt: v.number(),
  }),
  
  bookings: defineTable({
    bikeId: v.string(),
    userId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.optional(v.string()),
    startDate: v.number(),
    endDate: v.number(),
    totalPrice: v.number(),
    status: v.string(), // "pending", "confirmed", "completed", "cancelled"
    paymentStatus: v.string(),
    createdAt: v.number(),
  }),
  
  reviews: defineTable({
    bookingId: v.string(),
    userId: v.string(),
    rating: v.number(),
    comment: v.string(),
    createdAt: v.number(),
  }),
  
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.string(), // "admin" or "customer"
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
});