import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  dripCoins: integer("drip_coins").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const shops = pgTable("shops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  banner: text("banner"),
  logo: text("logo"),
  location: text("location"),
  tags: text("tags").array(),
  isTrending: boolean("is_trending").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shopId: varchar("shop_id").notNull().references(() => shops.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  images: text("images").array(),
  sizes: text("sizes").array(),
  colors: text("colors").array(),
  stock: integer("stock").notNull().default(0),
  category: text("category"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  size: text("size"),
  color: text("color"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const wishlistItems = pgTable("wishlist_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const savedShops = pgTable("saved_shops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  shopId: varchar("shop_id").notNull().references(() => shops.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const flashDrops = pgTable("flash_drops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  limitedQuantity: integer("limited_quantity").notNull(),
  remainingQuantity: integer("remaining_quantity").notNull(),
  endsAt: timestamp("ends_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const outfitBoards = pgTable("outfit_boards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const outfitBoardItems = pgTable("outfit_board_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  boardId: varchar("board_id").notNull().references(() => outfitBoards.id, { onDelete: "cascade" }),
  productId: varchar("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dripCoinTransactions = pgTable("drip_coin_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertShopSchema = createInsertSchema(shops).omit({
  id: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export const insertWishlistItemSchema = createInsertSchema(wishlistItems).omit({
  id: true,
  createdAt: true,
});

export const insertSavedShopSchema = createInsertSchema(savedShops).omit({
  id: true,
  createdAt: true,
});

export const insertFlashDropSchema = createInsertSchema(flashDrops).omit({
  id: true,
  createdAt: true,
});

export const insertOutfitBoardSchema = createInsertSchema(outfitBoards).omit({
  id: true,
  createdAt: true,
});

export const insertOutfitBoardItemSchema = createInsertSchema(outfitBoardItems).omit({
  id: true,
  createdAt: true,
});

export const insertDripCoinTransactionSchema = createInsertSchema(dripCoinTransactions).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertShop = z.infer<typeof insertShopSchema>;
export type Shop = typeof shops.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

export type InsertWishlistItem = z.infer<typeof insertWishlistItemSchema>;
export type WishlistItem = typeof wishlistItems.$inferSelect;

export type InsertSavedShop = z.infer<typeof insertSavedShopSchema>;
export type SavedShop = typeof savedShops.$inferSelect;

export type InsertFlashDrop = z.infer<typeof insertFlashDropSchema>;
export type FlashDrop = typeof flashDrops.$inferSelect;

export type InsertOutfitBoard = z.infer<typeof insertOutfitBoardSchema>;
export type OutfitBoard = typeof outfitBoards.$inferSelect;

export type InsertOutfitBoardItem = z.infer<typeof insertOutfitBoardItemSchema>;
export type OutfitBoardItem = typeof outfitBoardItems.$inferSelect;

export type InsertDripCoinTransaction = z.infer<typeof insertDripCoinTransactionSchema>;
export type DripCoinTransaction = typeof dripCoinTransactions.$inferSelect;
