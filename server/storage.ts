import { users, foodItems, mealPlans, weightEntries, consumedItems, userFavorites } from "@shared/schema";
import type { 
  InsertUser, User, 
  InsertWeightEntry, WeightEntry, 
  InsertMealPlan, MealPlan, 
  InsertFoodItem, FoodItem, 
  InsertConsumedItem, ConsumedItem 
} from "@shared/schema";

// Interface for storage methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Weight Entries methods
  createWeightEntry(entry: InsertWeightEntry): Promise<WeightEntry>;
  getWeightEntriesByUserId(userId: number): Promise<WeightEntry[]>;
  deleteWeightEntry(id: number): Promise<boolean>;
  
  // Meal Plans methods
  getAllMealPlans(): Promise<MealPlan[]>;
  getMealPlan(id: number): Promise<MealPlan | undefined>;
  createMealPlan(mealPlan: InsertMealPlan): Promise<MealPlan>;
  
  // Food Items methods
  getAllFoodItems(): Promise<FoodItem[]>;
  getFoodItem(id: number): Promise<FoodItem | undefined>;
  createFoodItem(foodItem: InsertFoodItem): Promise<FoodItem>;
  
  // Consumed Items methods
  createConsumedItem(consumedItem: InsertConsumedItem): Promise<ConsumedItem>;
  getConsumedItemsByUserId(userId: number): Promise<ConsumedItem[]>;
  deleteConsumedItem(id: number): Promise<boolean>;
  
  // User Favorites methods
  addUserFavorite(userId: number, mealPlanId: number): Promise<{id: number, userId: number, mealPlanId: number}>;
  getUserFavorites(userId: number): Promise<MealPlan[]>;
  removeUserFavorite(userId: number, mealPlanId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private weightEntries: Map<number, WeightEntry>;
  private mealPlans: Map<number, MealPlan>;
  private foodItems: Map<number, FoodItem>;
  private consumedItems: Map<number, ConsumedItem>;
  private userFavorites: Map<number, {id: number, userId: number, mealPlanId: number}>;
  private currentId: {
    users: number,
    weightEntries: number,
    mealPlans: number,
    foodItems: number,
    consumedItems: number,
    userFavorites: number
  };

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
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user = { ...insertUser, id } as User;
    this.users.set(id, user);
    return user;
  }

  // Weight Entries methods
  async createWeightEntry(insertWeightEntry: InsertWeightEntry): Promise<WeightEntry> {
    const id = this.currentId.weightEntries++;
    const entry = { ...insertWeightEntry, id } as WeightEntry;
    this.weightEntries.set(id, entry);
    return entry;
  }

  async getWeightEntriesByUserId(userId: number): Promise<WeightEntry[]> {
    return Array.from(this.weightEntries.values()).filter(
      (entry) => entry.userId === userId
    );
  }

  async deleteWeightEntry(id: number): Promise<boolean> {
    return this.weightEntries.delete(id);
  }

  // Meal Plans methods
  async getAllMealPlans(): Promise<MealPlan[]> {
    return Array.from(this.mealPlans.values());
  }

  async getMealPlan(id: number): Promise<MealPlan | undefined> {
    return this.mealPlans.get(id);
  }

  async createMealPlan(insertMealPlan: InsertMealPlan): Promise<MealPlan> {
    const id = this.currentId.mealPlans++;
    const mealPlan = { ...insertMealPlan, id } as MealPlan;
    this.mealPlans.set(id, mealPlan);
    return mealPlan;
  }

  // Food Items methods
  async getAllFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async getFoodItem(id: number): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async createFoodItem(insertFoodItem: InsertFoodItem): Promise<FoodItem> {
    const id = this.currentId.foodItems++;
    const foodItem = { ...insertFoodItem, id } as FoodItem;
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  // Consumed Items methods
  async createConsumedItem(insertConsumedItem: InsertConsumedItem): Promise<ConsumedItem> {
    const id = this.currentId.consumedItems++;
    const consumedItem = { ...insertConsumedItem, id } as ConsumedItem;
    this.consumedItems.set(id, consumedItem);
    return consumedItem;
  }

  async getConsumedItemsByUserId(userId: number): Promise<ConsumedItem[]> {
    return Array.from(this.consumedItems.values()).filter(
      (item) => item.userId === userId
    );
  }

  async deleteConsumedItem(id: number): Promise<boolean> {
    return this.consumedItems.delete(id);
  }

  // User Favorites methods
  async addUserFavorite(userId: number, mealPlanId: number): Promise<{id: number, userId: number, mealPlanId: number}> {
    const id = this.currentId.userFavorites++;
    const favorite = { id, userId, mealPlanId };
    this.userFavorites.set(id, favorite);
    return favorite;
  }

  async getUserFavorites(userId: number): Promise<MealPlan[]> {
    const favoriteIds = Array.from(this.userFavorites.values())
      .filter((fav) => fav.userId === userId)
      .map((fav) => fav.mealPlanId);
    
    return favoriteIds
      .map(id => this.mealPlans.get(id))
      .filter((plan): plan is MealPlan => plan !== undefined);
  }

  async removeUserFavorite(userId: number, mealPlanId: number): Promise<boolean> {
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
