import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { 
  insertMomentSchema, insertCommentSchema, insertVehicleSchema, 
  insertCrewSchema, insertEventSchema, insertFriendSchema, insertAlertSchema 
} from "@shared/schema";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ===== MOMENTS ROUTES =====
  app.get("/api/moments", async (req, res) => {
    try {
      const moments = await storage.getAllMoments();
      res.json(moments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch moments" });
    }
  });

  app.get("/api/moments/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const moments = await storage.getMomentsByUser(userId);
      res.json(moments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user moments" });
    }
  });

  app.post("/api/moments", upload.single('image'), async (req, res) => {
    try {
      const data = insertMomentSchema.parse({
        ...req.body,
        userId: parseInt(req.body.userId),
        imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
      });
      const moment = await storage.createMoment(data);
      res.json(moment);
    } catch (error) {
      res.status(400).json({ error: "Failed to create moment" });
    }
  });

  app.delete("/api/moments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMoment(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete moment" });
    }
  });

  // ===== LIKES ROUTES =====
  app.post("/api/moments/:id/like", async (req, res) => {
    try {
      const momentId = parseInt(req.params.id);
      const userId = parseInt(req.body.userId);
      const result = await storage.toggleLike(momentId, userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle like" });
    }
  });

  // ===== COMMENTS ROUTES =====
  app.get("/api/moments/:id/comments", async (req, res) => {
    try {
      const momentId = parseInt(req.params.id);
      const comments = await storage.getCommentsByMoment(momentId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  app.post("/api/moments/:id/comments", async (req, res) => {
    try {
      const momentId = parseInt(req.params.id);
      const data = insertCommentSchema.parse({
        momentId,
        userId: parseInt(req.body.userId),
        text: req.body.text
      });
      const comment = await storage.createComment(data);
      res.json(comment);
    } catch (error) {
      res.status(400).json({ error: "Failed to create comment" });
    }
  });

  // ===== VEHICLES ROUTES =====
  app.get("/api/vehicles", async (req, res) => {
    try {
      const ownerId = req.query.ownerId ? parseInt(req.query.ownerId as string) : null;
      if (ownerId) {
        const vehicles = await storage.getVehiclesByOwner(ownerId);
        res.json(vehicles);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  });

  app.get("/api/vehicles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vehicle = await storage.getVehicle(id);
      res.json(vehicle || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicle" });
    }
  });

  app.post("/api/vehicles", upload.array('photos', 5), async (req, res) => {
    try {
      const photos = req.files ? (req.files as Express.Multer.File[]).map(f => `/uploads/${f.filename}`) : [];
      const data = insertVehicleSchema.parse({
        ...req.body,
        ownerId: parseInt(req.body.ownerId),
        year: parseInt(req.body.year),
        photos: [...photos, ...(req.body.photos || [])]
      });
      const vehicle = await storage.createVehicle(data);
      res.json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Failed to create vehicle" });
    }
  });

  app.put("/api/vehicles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vehicle = await storage.updateVehicle(id, req.body);
      res.json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Failed to update vehicle" });
    }
  });

  app.delete("/api/vehicles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteVehicle(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete vehicle" });
    }
  });

  // ===== CREWS ROUTES =====
  app.get("/api/crews", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : null;
      if (userId) {
        const crews = await storage.getCrewsByUser(userId);
        res.json(crews);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch crews" });
    }
  });

  app.get("/api/crews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const crew = await storage.getCrew(id);
      res.json(crew || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch crew" });
    }
  });

  app.post("/api/crews", async (req, res) => {
    try {
      const data = insertCrewSchema.parse({
        ...req.body,
        creatorId: parseInt(req.body.creatorId)
      });
      const crew = await storage.createCrew(data);
      res.json(crew);
    } catch (error) {
      res.status(400).json({ error: "Failed to create crew" });
    }
  });

  app.put("/api/crews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const crew = await storage.updateCrew(id, req.body);
      res.json(crew);
    } catch (error) {
      res.status(400).json({ error: "Failed to update crew" });
    }
  });

  // ===== EVENTS ROUTES =====
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      res.json(event || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const data = insertEventSchema.parse({
        ...req.body,
        organizerId: parseInt(req.body.organizerId),
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate)
      });
      const event = await storage.createEvent(data);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to create event" });
    }
  });

  // ===== FRIENDS ROUTES =====
  app.get("/api/friends/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const friends = await storage.getFriendsByUser(userId);
      res.json(friends);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch friends" });
    }
  });

  app.post("/api/friends", async (req, res) => {
    try {
      const data = insertFriendSchema.parse({
        userId: parseInt(req.body.userId),
        friendId: parseInt(req.body.friendId),
        status: 'pending'
      });
      const friend = await storage.createFriendRequest(data);
      res.json(friend);
    } catch (error) {
      res.status(400).json({ error: "Failed to create friend request" });
    }
  });

  app.put("/api/friends/:id/accept", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const friend = await storage.acceptFriendRequest(id);
      res.json(friend);
    } catch (error) {
      res.status(500).json({ error: "Failed to accept friend request" });
    }
  });

  // ===== ALERTS ROUTES =====
  app.get("/api/alerts/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const alerts = await storage.getAlertsByUser(userId);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const data = insertAlertSchema.parse({
        userId: parseInt(req.body.userId),
        type: req.body.type,
        message: req.body.message,
        relatedId: req.body.relatedId ? parseInt(req.body.relatedId) : null
      });
      const alert = await storage.createAlert(data);
      res.json(alert);
    } catch (error) {
      res.status(400).json({ error: "Failed to create alert" });
    }
  });

  app.put("/api/alerts/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.markAlertAsRead(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark alert as read" });
    }
  });

  // ===== STICKERS ROUTES =====
  app.get("/api/stickers", async (req, res) => {
    try {
      const stickers = await storage.getAllStickers();
      res.json(stickers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stickers" });
    }
  });

  app.get("/api/stickers/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userStickers = await storage.getUserStickers(userId);
      res.json(userStickers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user stickers" });
    }
  });

  app.post("/api/stickers/collect", async (req, res) => {
    try {
      const userId = parseInt(req.body.userId);
      const stickerId = parseInt(req.body.stickerId);
      const userSticker = await storage.collectSticker(userId, stickerId);
      res.json(userSticker);
    } catch (error) {
      res.status(400).json({ error: "Failed to collect sticker" });
    }
  });

  // ===== USER ROUTES =====
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      res.json(user || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to update user" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
