import { createServer } from "http";
import { storage } from "./storage.js";
import { insertUserSchema, insertWeightEntrySchema, insertMealPlanSchema, insertFoodItemSchema, insertConsumedItemSchema } from "../shared/schema.js";
import { z } from "zod";

export async function registerRoutes(app) {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Weight entries routes
  app.post("/api/weight-entries", async (req, res) => {
    try {
      const entryData = insertWeightEntrySchema.parse(req.body);
      const entry = await storage.createWeightEntry(entryData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/weight-entries/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const entries = await storage.getWeightEntriesByUserId(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/weight-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteWeightEntry(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Meal plan routes
  app.get("/api/meal-plans", async (req, res) => {
    try {
      const mealPlans = await storage.getAllMealPlans();
      res.json(mealPlans);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/meal-plans", async (req, res) => {
    try {
      const mealPlanData = insertMealPlanSchema.parse(req.body);
      const mealPlan = await storage.createMealPlan(mealPlanData);
      res.status(201).json(mealPlan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Food items routes
  app.get("/api/food-items", async (req, res) => {
    try {
      const foodItems = await storage.getAllFoodItems();
      res.json(foodItems);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/food-items", async (req, res) => {
    try {
      const foodItemData = insertFoodItemSchema.parse(req.body);
      const foodItem = await storage.createFoodItem(foodItemData);
      res.status(201).json(foodItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Consumed items routes
  app.post("/api/consumed-items", async (req, res) => {
    try {
      const consumedItemData = insertConsumedItemSchema.parse(req.body);
      const consumedItem = await storage.createConsumedItem(consumedItemData);
      res.status(201).json(consumedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/consumed-items/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const consumedItems = await storage.getConsumedItemsByUserId(userId);
      res.json(consumedItems);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/consumed-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteConsumedItem(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}