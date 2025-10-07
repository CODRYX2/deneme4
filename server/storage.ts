import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import {
  type User, type InsertUser, users,
  type Vehicle, type InsertVehicle, vehicles,
  type Moment, type InsertMoment, moments,
  type Like, type InsertLike, likes,
  type Comment, type InsertComment, comments,
  type Crew, type InsertCrew, crews,
  type Event, type InsertEvent, events,
  type Friend, type InsertFriend, friends,
  type Alert, type InsertAlert, alerts,
  type Sticker, type InsertSticker, stickers,
  type UserSticker, type InsertUserSticker, userStickers,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Vehicles
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getVehiclesByOwner(ownerId: number): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: number, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  deleteVehicle(id: number): Promise<void>;
  
  // Moments
  getMoment(id: number): Promise<Moment | undefined>;
  getAllMoments(): Promise<Moment[]>;
  getMomentsByUser(userId: number): Promise<Moment[]>;
  createMoment(moment: InsertMoment): Promise<Moment>;
  deleteMoment(id: number): Promise<void>;
  
  // Likes
  getLike(momentId: number, userId: number): Promise<Like | undefined>;
  toggleLike(momentId: number, userId: number): Promise<{ liked: boolean; count: number }>;
  
  // Comments
  getCommentsByMoment(momentId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Crews
  getCrew(id: number): Promise<Crew | undefined>;
  getCrewsByUser(userId: number): Promise<Crew[]>;
  createCrew(crew: InsertCrew): Promise<Crew>;
  updateCrew(id: number, crew: Partial<InsertCrew>): Promise<Crew | undefined>;
  
  // Events
  getEvent(id: number): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Friends
  getFriendsByUser(userId: number): Promise<Friend[]>;
  createFriendRequest(friend: InsertFriend): Promise<Friend>;
  acceptFriendRequest(id: number): Promise<Friend | undefined>;
  
  // Alerts
  getAlertsByUser(userId: number): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(id: number): Promise<void>;
  
  // Stickers
  getAllStickers(): Promise<Sticker[]>;
  getUserStickers(userId: number): Promise<UserSticker[]>;
  collectSticker(userId: number, stickerId: number): Promise<UserSticker>;
}

export class DbStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user as any).returning();
    return result[0];
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(user as any).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Vehicles
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    const result = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
    return result[0];
  }

  async getVehiclesByOwner(ownerId: number): Promise<Vehicle[]> {
    return await db.select().from(vehicles).where(eq(vehicles.ownerId, ownerId));
  }

  async createVehicle(vehicle: InsertVehicle): Promise<Vehicle> {
    const result = await db.insert(vehicles).values(vehicle as any).returning();
    return result[0];
  }

  async updateVehicle(id: number, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const result = await db.update(vehicles).set(vehicle as any).where(eq(vehicles.id, id)).returning();
    return result[0];
  }

  async deleteVehicle(id: number): Promise<void> {
    await db.delete(vehicles).where(eq(vehicles.id, id));
  }

  // Moments
  async getMoment(id: number): Promise<Moment | undefined> {
    const result = await db.select().from(moments).where(eq(moments.id, id)).limit(1);
    return result[0];
  }

  async getAllMoments(): Promise<Moment[]> {
    return await db.select().from(moments).orderBy(desc(moments.createdAt));
  }

  async getMomentsByUser(userId: number): Promise<Moment[]> {
    return await db.select().from(moments).where(eq(moments.userId, userId)).orderBy(desc(moments.createdAt));
  }

  async createMoment(moment: InsertMoment): Promise<Moment> {
    const result = await db.insert(moments).values(moment).returning();
    return result[0];
  }

  async deleteMoment(id: number): Promise<void> {
    await db.delete(moments).where(eq(moments.id, id));
  }

  // Likes
  async getLike(momentId: number, userId: number): Promise<Like | undefined> {
    const result = await db.select().from(likes)
      .where(and(eq(likes.momentId, momentId), eq(likes.userId, userId)))
      .limit(1);
    return result[0];
  }

  async toggleLike(momentId: number, userId: number): Promise<{ liked: boolean; count: number }> {
    const existingLike = await this.getLike(momentId, userId);
    
    if (existingLike) {
      await db.delete(likes).where(eq(likes.id, existingLike.id));
      await db.update(moments)
        .set({ likesCount: sql`${moments.likesCount} - 1` })
        .where(eq(moments.id, momentId));
      
      const moment = await this.getMoment(momentId);
      return { liked: false, count: moment?.likesCount || 0 };
    } else {
      await db.insert(likes).values({ momentId, userId });
      await db.update(moments)
        .set({ likesCount: sql`${moments.likesCount} + 1` })
        .where(eq(moments.id, momentId));
      
      const moment = await this.getMoment(momentId);
      return { liked: true, count: moment?.likesCount || 0 };
    }
  }

  // Comments
  async getCommentsByMoment(momentId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.momentId, momentId)).orderBy(desc(comments.createdAt));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const result = await db.insert(comments).values(comment).returning();
    await db.update(moments)
      .set({ commentsCount: sql`${moments.commentsCount} + 1` })
      .where(eq(moments.id, comment.momentId));
    return result[0];
  }

  // Crews
  async getCrew(id: number): Promise<Crew | undefined> {
    const result = await db.select().from(crews).where(eq(crews.id, id)).limit(1);
    return result[0];
  }

  async getCrewsByUser(userId: number): Promise<Crew[]> {
    return await db.select().from(crews).where(eq(crews.creatorId, userId));
  }

  async createCrew(crew: InsertCrew): Promise<Crew> {
    const result = await db.insert(crews).values(crew as any).returning();
    return result[0];
  }

  async updateCrew(id: number, crew: Partial<InsertCrew>): Promise<Crew | undefined> {
    const result = await db.update(crews).set(crew as any).where(eq(crews.id, id)).returning();
    return result[0];
  }

  // Events
  async getEvent(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0];
  }

  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.startDate));
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(event as any).returning();
    return result[0];
  }

  // Friends
  async getFriendsByUser(userId: number): Promise<Friend[]> {
    return await db.select().from(friends).where(eq(friends.userId, userId));
  }

  async createFriendRequest(friend: InsertFriend): Promise<Friend> {
    const result = await db.insert(friends).values(friend).returning();
    return result[0];
  }

  async acceptFriendRequest(id: number): Promise<Friend | undefined> {
    const result = await db.update(friends).set({ status: 'accepted' }).where(eq(friends.id, id)).returning();
    return result[0];
  }

  // Alerts
  async getAlertsByUser(userId: number): Promise<Alert[]> {
    return await db.select().from(alerts).where(eq(alerts.userId, userId)).orderBy(desc(alerts.createdAt));
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const result = await db.insert(alerts).values(alert).returning();
    return result[0];
  }

  async markAlertAsRead(id: number): Promise<void> {
    await db.update(alerts).set({ isRead: true }).where(eq(alerts.id, id));
  }

  // Stickers
  async getAllStickers(): Promise<Sticker[]> {
    return await db.select().from(stickers);
  }

  async getUserStickers(userId: number): Promise<UserSticker[]> {
    return await db.select().from(userStickers).where(eq(userStickers.userId, userId));
  }

  async collectSticker(userId: number, stickerId: number): Promise<UserSticker> {
    const result = await db.insert(userStickers).values({ userId, stickerId }).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
