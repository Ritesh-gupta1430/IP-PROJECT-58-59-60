import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  height: integer("height"),
  weight: integer("weight"),
  age: integer("age"),
  gender: text("gender"),
  goal: text("goal"),
  activity: text("activity"),
  dietType: text("diet_type"),
  allergies: json("allergies"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const weightEntries = pgTable("weight_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  weight: integer("weight").notNull(),
  notes: text("notes"),
});

export const mealPlans = pgTable("meal_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  dietType: text("diet_type").notNull(),
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(),
  carbs: integer("carbs").notNull(),
  fat: integer("fat").notNull(),
  prepTime: integer("prep_time").notNull(),
  difficulty: text("difficulty").notNull(),
  ingredients: json("ingredients"),
  instructions: json("instructions"),
  allergens: json("allergens"),
});

export const userFavorites = pgTable("user_favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  mealPlanId: integer("meal_plan_id").notNull().references(() => mealPlans.id),
});

export const foodItems = pgTable("food_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(),
  carbs: integer("carbs").notNull(),
  fat: integer("fat").notNull(),
  fiber: integer("fiber"),
  sugar: integer("sugar"),
  servingSize: text("serving_size").notNull(),
  servingUnit: text("serving_unit").notNull(),
});

export const consumedItems = pgTable("consumed_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  foodItemId: integer("food_item_id").notNull().references(() => foodItems.id),
  quantity: integer("quantity").notNull().default(1),
  mealType: text("meal_type").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  height: true,
  weight: true,
  age: true,
  gender: true,
  goal: true,
  activity: true,
  dietType: true,
  allergies: true,
});

export const insertWeightEntrySchema = createInsertSchema(weightEntries).pick({
  userId: true,
  date: true,
  weight: true,
  notes: true,
});

export const insertMealPlanSchema = createInsertSchema(mealPlans).pick({
  name: true,
  type: true,
  dietType: true,
  calories: true,
  protein: true,
  carbs: true,
  fat: true,
  prepTime: true,
  difficulty: true,
  ingredients: true,
  instructions: true,
  allergens: true,
});

export const insertFoodItemSchema = createInsertSchema(foodItems).pick({
  name: true,
  category: true,
  calories: true,
  protein: true,
  carbs: true,
  fat: true,
  fiber: true,
  sugar: true,
  servingSize: true,
  servingUnit: true,
});

export const insertConsumedItemSchema = createInsertSchema(consumedItems).pick({
  userId: true,
  foodItemId: true,
  quantity: true,
  mealType: true,
});