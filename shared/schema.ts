import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users (Kullanıcılar)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  bio: text("bio"),
  location: text("location"),
  profileImage: text("profile_image"),
  socialLinks: jsonb("social_links").$type<Array<{ platform: string; url: string }>>().default([]),
  primaryVehicleId: integer("primary_vehicle_id"),
  crewIds: jsonb("crew_ids").$type<number[]>().default([]),
  vipStatus: boolean("vip_status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Vehicles (Araçlar/Garaj)
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").notNull().references(() => users.id),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  licensePlate: text("license_plate").notNull(),
  country: text("country").notNull(), // TR, DE, US
  plateStyle: text("plate_style").default("standard"), // standard, carbon, chrome
  photos: jsonb("photos").$type<string[]>().default([]),
  technicalDetails: jsonb("technical_details").$type<{
    hp?: number;
    torque?: number;
    modifications?: string[];
  }>(),
  socialTag: text("social_tag"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({ id: true, createdAt: true });
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;

// Moments (Anlar/Gönderiler)
export const moments = pgTable("moments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  caption: text("caption"),
  imageUrl: text("image_url").notNull(),
  likesCount: integer("likes_count").default(0),
  commentsCount: integer("comments_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMomentSchema = createInsertSchema(moments).omit({ id: true, createdAt: true, likesCount: true, commentsCount: true });
export type InsertMoment = z.infer<typeof insertMomentSchema>;
export type Moment = typeof moments.$inferSelect;

// Likes (Beğeniler)
export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  momentId: integer("moment_id").notNull().references(() => moments.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLikeSchema = createInsertSchema(likes).omit({ id: true, createdAt: true });
export type InsertLike = z.infer<typeof insertLikeSchema>;
export type Like = typeof likes.$inferSelect;

// Comments (Yorumlar)
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  momentId: integer("moment_id").notNull().references(() => moments.id),
  userId: integer("user_id").notNull().references(() => users.id),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCommentSchema = createInsertSchema(comments).omit({ id: true, createdAt: true });
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

// Crews (Ekipler)
export const crews = pgTable("crews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  logoText: text("logo_text").default("F2"),
  badgeColor: text("badge_color").default("bg-primary"),
  creatorId: integer("creator_id").notNull().references(() => users.id),
  members: jsonb("members").$type<number[]>().default([]),
  chatChannelId: text("chat_channel_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCrewSchema = createInsertSchema(crews).omit({ id: true, createdAt: true });
export type InsertCrew = z.infer<typeof insertCrewSchema>;
export type Crew = typeof crews.$inferSelect;

// Events (Etkinlikler)
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organizerId: integer("organizer_id").notNull().references(() => users.id),
  location: text("location").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isPrivate: boolean("is_private").default(false),
  collaborators: jsonb("collaborators").$type<string[]>().default([]),
  attendees: jsonb("attendees").$type<number[]>().default([]),
  chatChannelId: text("chat_channel_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Friends (Arkadaşlıklar)
export const friends = pgTable("friends", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  friendId: integer("friend_id").notNull().references(() => users.id),
  status: text("status").notNull(), // pending, accepted
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFriendSchema = createInsertSchema(friends).omit({ id: true, createdAt: true });
export type InsertFriend = z.infer<typeof insertFriendSchema>;
export type Friend = typeof friends.$inferSelect;

// Alerts/Notifications (Bildirimler)
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // like, comment, crew_invite, friend_request
  message: text("message").notNull(),
  relatedId: integer("related_id"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true, createdAt: true });
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

// Stickers (Çıkartmalar)
export const stickers = pgTable("stickers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStickerSchema = createInsertSchema(stickers).omit({ id: true, createdAt: true });
export type InsertSticker = z.infer<typeof insertStickerSchema>;
export type Sticker = typeof stickers.$inferSelect;

// User Stickers (Kullanıcı Çıkartmaları)
export const userStickers = pgTable("user_stickers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  stickerId: integer("sticker_id").notNull().references(() => stickers.id),
  collectedAt: timestamp("collected_at").defaultNow(),
});

export const insertUserStickerSchema = createInsertSchema(userStickers).omit({ id: true, collectedAt: true });
export type InsertUserSticker = z.infer<typeof insertUserStickerSchema>;
export type UserSticker = typeof userStickers.$inferSelect;
