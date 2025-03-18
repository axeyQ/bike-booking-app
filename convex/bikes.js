import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all bikes
export const getAllBikes = query({
  handler: async (ctx) => {
    return await ctx.db.query("bikes").collect();
  },
});

// Query to get a single bike by ID
export const getBike = query({
  args: { bikeId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.bikeId);
  },
});

// Mutation to create a new bike
export const createBike = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    hourlyRate: v.number(),
    dailyRate: v.number(),
    imageUrl: v.optional(v.string()),
    bikeType: v.string(),
    features: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const bikeId = await ctx.db.insert("bikes", {
      ...args,
      available: true,
      createdAt: Date.now(),
    });
    
    return bikeId;
  },
});

// Mutation to update a bike
export const updateBike = mutation({
  args: {
    bikeId: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    hourlyRate: v.optional(v.number()),
    dailyRate: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    bikeType: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    available: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { bikeId, ...fields } = args;
    const bike = await ctx.db.get(bikeId);
    
    if (!bike) {
      throw new Error("Bike not found");
    }
    
    return await ctx.db.patch(bikeId, fields);
  },
});

// Mutation to delete a bike
export const deleteBike = mutation({
  args: { bikeId: v.string() },
  handler: async (ctx, args) => {
    const bike = await ctx.db.get(args.bikeId);
    
    if (!bike) {
      throw new Error("Bike not found");
    }
    
    return await ctx.db.delete(args.bikeId);
  },
});