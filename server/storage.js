import { users, foodItems, mealPlans, weightEntries, consumedItems, userFavorites } from "../shared/schema.js";

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.weightEntries = new Map();
    this.mealPlans = new Map();
    this.foodItems = new Map();
    this.consumedItems = new Map();
    this.userFavorites = new Map();
    this.currentId = {
      users: 1,
      weightEntries: 1,
      mealPlans: 1,
      foodItems: 1,
      consumedItems: 1,
      userFavorites: 1
    };
  }

  // User methods
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser) {
    const id = this.currentId.users++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Weight Entries methods
  async createWeightEntry(insertWeightEntry) {
    const id = this.currentId.weightEntries++;
    const entry = { ...insertWeightEntry, id };
    this.weightEntries.set(id, entry);
    return entry;
  }

  async getWeightEntriesByUserId(userId) {
    return Array.from(this.weightEntries.values()).filter(
      (entry) => entry.userId === userId
    );
  }

  async deleteWeightEntry(id) {
    return this.weightEntries.delete(id);
  }

  // Meal Plans methods
  async getAllMealPlans() {
    return Array.from(this.mealPlans.values());
  }

  async getMealPlan(id) {
    return this.mealPlans.get(id);
  }

  async createMealPlan(insertMealPlan) {
    const id = this.currentId.mealPlans++;
    const mealPlan = { ...insertMealPlan, id };
    this.mealPlans.set(id, mealPlan);
    return mealPlan;
  }

  // Food Items methods
  async getAllFoodItems() {
    return Array.from(this.foodItems.values());
  }

  async getFoodItem(id) {
    return this.foodItems.get(id);
  }

  async createFoodItem(insertFoodItem) {
    const id = this.currentId.foodItems++;
    const foodItem = { ...insertFoodItem, id };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  // Consumed Items methods
  async createConsumedItem(insertConsumedItem) {
    const id = this.currentId.consumedItems++;
    const consumedItem = { ...insertConsumedItem, id };
    this.consumedItems.set(id, consumedItem);
    return consumedItem;
  }

  async getConsumedItemsByUserId(userId) {
    return Array.from(this.consumedItems.values()).filter(
      (item) => item.userId === userId
    );
  }

  async deleteConsumedItem(id) {
    return this.consumedItems.delete(id);
  }

  // User Favorites methods
  async addUserFavorite(userId, mealPlanId) {
    const id = this.currentId.userFavorites++;
    const favorite = { id, userId, mealPlanId };
    this.userFavorites.set(id, favorite);
    return favorite;
  }

  async getUserFavorites(userId) {
    const favoriteIds = Array.from(this.userFavorites.values())
      .filter((fav) => fav.userId === userId)
      .map((fav) => fav.mealPlanId);
    
    return favoriteIds
      .map(id => this.mealPlans.get(id))
      .filter(plan => plan !== undefined);
  }

  async removeUserFavorite(userId, mealPlanId) {
    const favorite = Array.from(this.userFavorites.values()).find(
      (fav) => fav.userId === userId && fav.mealPlanId === mealPlanId
    );
    
    if (favorite) {
      return this.userFavorites.delete(favorite.id);
    }
    
    return false;
  }
}

export const storage = new MemStorage();