import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, hashPassword } from "./auth";
import passport from "passport";
import { insertUserSchema } from "@shared/schema";

function requireAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Auth routes
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.issues });
      }

      const { username, password } = result.data;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
      });

      await storage.createDripCoinTransaction({
        userId: user.id,
        amount: 1250,
        reason: "Welcome bonus",
      });

      req.login(
        { id: user.id, username: user.username, dripCoins: user.dripCoins + 1250 },
        (err) => {
          if (err) return next(err);
          res.json({
            message: "User registered successfully",
            user: { id: user.id, username: user.username, dripCoins: user.dripCoins + 1250 },
          });
        }
      );
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in successfully", user: req.user });
  });

  app.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, (req, res) => {
    res.json({ user: req.user });
  });

  // Shop routes
  app.get("/api/shops", async (req, res, next) => {
    try {
      const { search, tags } = req.query;
      const shops = await storage.listShops({
        search: search as string,
        tags: tags ? (tags as string).split(",") : undefined,
      });
      res.json(shops);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/shops/:id", async (req, res, next) => {
    try {
      const shop = await storage.getShop(req.params.id);
      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }
      res.json(shop);
    } catch (error) {
      next(error);
    }
  });

  // Product routes
  app.get("/api/products", async (req, res, next) => {
    try {
      const { shopId, search, category } = req.query;
      const products = await storage.listProducts({
        shopId: shopId as string,
        search: search as string,
        category: category as string,
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/products/:id", async (req, res, next) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/products", requireAuth, async (req, res, next) => {
    try {
      const product = await storage.createProduct(req.body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  // Cart routes
  app.get("/api/cart", requireAuth, async (req, res, next) => {
    try {
      const items = await storage.getCartItems(req.user!.id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/cart", requireAuth, async (req, res, next) => {
    try {
      const item = await storage.addToCart({
        ...req.body,
        userId: req.user!.id,
      });
      
      await storage.createDripCoinTransaction({
        userId: req.user!.id,
        amount: 5,
        reason: "Added item to cart",
      });

      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/cart/:id", requireAuth, async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const item = await storage.updateCartItem(req.params.id, quantity);
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/cart/:id", requireAuth, async (req, res, next) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/cart", requireAuth, async (req, res, next) => {
    try {
      await storage.clearCart(req.user!.id);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      next(error);
    }
  });

  // Wishlist routes
  app.get("/api/wishlist", requireAuth, async (req, res, next) => {
    try {
      const items = await storage.getWishlistItems(req.user!.id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/wishlist", requireAuth, async (req, res, next) => {
    try {
      const item = await storage.addToWishlist({
        userId: req.user!.id,
        productId: req.body.productId,
      });

      await storage.createDripCoinTransaction({
        userId: req.user!.id,
        amount: 3,
        reason: "Saved item to wishlist",
      });

      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/wishlist/:productId", requireAuth, async (req, res, next) => {
    try {
      await storage.removeFromWishlist(req.user!.id, req.params.productId);
      res.json({ message: "Item removed from wishlist" });
    } catch (error) {
      next(error);
    }
  });

  // Saved shops routes
  app.get("/api/saved-shops", requireAuth, async (req, res, next) => {
    try {
      const shops = await storage.getSavedShops(req.user!.id);
      res.json(shops);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/saved-shops", requireAuth, async (req, res, next) => {
    try {
      const saved = await storage.saveShop({
        userId: req.user!.id,
        shopId: req.body.shopId,
      });

      await storage.createDripCoinTransaction({
        userId: req.user!.id,
        amount: 10,
        reason: "Followed a shop",
      });

      res.json(saved);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/saved-shops/:shopId", requireAuth, async (req, res, next) => {
    try {
      await storage.unsaveShop(req.user!.id, req.params.shopId);
      res.json({ message: "Shop unfollowed" });
    } catch (error) {
      next(error);
    }
  });

  // Flash drops routes
  app.get("/api/flash-drops", async (req, res, next) => {
    try {
      const drops = await storage.getActiveFlashDrops();
      res.json(drops);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/flash-drops", requireAuth, async (req, res, next) => {
    try {
      const drop = await storage.createFlashDrop(req.body);
      res.json(drop);
    } catch (error) {
      next(error);
    }
  });

  // Outfit boards routes
  app.get("/api/outfit-boards", requireAuth, async (req, res, next) => {
    try {
      const boards = await storage.getOutfitBoards(req.user!.id);
      res.json(boards);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/outfit-boards", requireAuth, async (req, res, next) => {
    try {
      const board = await storage.createOutfitBoard({
        ...req.body,
        userId: req.user!.id,
      });

      await storage.createDripCoinTransaction({
        userId: req.user!.id,
        amount: 15,
        reason: "Created outfit board",
      });

      res.json(board);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/outfit-boards/:id/items", requireAuth, async (req, res, next) => {
    try {
      const items = await storage.getBoardItems(req.params.id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/outfit-boards/:id/items", requireAuth, async (req, res, next) => {
    try {
      const item = await storage.addProductToBoard({
        boardId: req.params.id,
        productId: req.body.productId,
      });
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/outfit-boards/:boardId/items/:productId", requireAuth, async (req, res, next) => {
    try {
      await storage.removeProductFromBoard(req.params.boardId, req.params.productId);
      res.json({ message: "Product removed from board" });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/outfit-boards/:id", requireAuth, async (req, res, next) => {
    try {
      await storage.deleteOutfitBoard(req.params.id);
      res.json({ message: "Outfit board deleted" });
    } catch (error) {
      next(error);
    }
  });

  // DripCoin transactions
  app.get("/api/dripcoin-transactions", requireAuth, async (req, res, next) => {
    try {
      const transactions = await storage.getDripCoinTransactions(req.user!.id);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  });

  // User profile
  app.get("/api/profile", requireAuth, async (req, res, next) => {
    try {
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const [wishlistItems, savedShops, outfitBoards, dripCoinTransactions] = await Promise.all([
        storage.getWishlistItems(user.id),
        storage.getSavedShops(user.id),
        storage.getOutfitBoards(user.id),
        storage.getDripCoinTransactions(user.id),
      ]);

      res.json({
        user: {
          id: user.id,
          username: user.username,
          dripCoins: user.dripCoins,
          createdAt: user.createdAt,
        },
        wishlistItems,
        savedShops,
        outfitBoards,
        recentTransactions: dripCoinTransactions.slice(0, 10),
      });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
