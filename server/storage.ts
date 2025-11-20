import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { eq, and, desc, ilike, sql } from "drizzle-orm";
import * as schema from "@shared/schema";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
import type {
  User,
  InsertUser,
  Shop,
  InsertShop,
  Product,
  InsertProduct,
  CartItem,
  InsertCartItem,
  WishlistItem,
  InsertWishlistItem,
  SavedShop,
  InsertSavedShop,
  FlashDrop,
  InsertFlashDrop,
  OutfitBoard,
  InsertOutfitBoard,
  OutfitBoardItem,
  InsertOutfitBoardItem,
  DripCoinTransaction,
  InsertDripCoinTransaction,
} from "@shared/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

export class DatabaseStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  async updateUserDripCoins(userId: string, amount: number): Promise<User | undefined> {
    const [user] = await db
      .update(schema.users)
      .set({ dripCoins: sql`${schema.users.dripCoins} + ${amount}` })
      .where(eq(schema.users.id, userId))
      .returning();
    return user;
  }

  // Shop operations
  async createShop(insertShop: InsertShop): Promise<Shop> {
    const [shop] = await db.insert(schema.shops).values(insertShop).returning();
    return shop;
  }

  async getShop(id: string): Promise<Shop | undefined> {
    const [shop] = await db.select().from(schema.shops).where(eq(schema.shops.id, id));
    return shop;
  }

  async listShops(filters?: { search?: string; tags?: string[] }): Promise<Shop[]> {
    let query = db.select().from(schema.shops);
    
    if (filters?.search) {
      query = query.where(ilike(schema.shops.name, `%${filters.search}%`)) as any;
    }
    
    const shops = await query;
    return shops;
  }

  async updateShop(id: string, updates: Partial<InsertShop>): Promise<Shop | undefined> {
    const [shop] = await db.update(schema.shops).set(updates).where(eq(schema.shops.id, id)).returning();
    return shop;
  }

  async deleteShop(id: string): Promise<void> {
    await db.delete(schema.shops).where(eq(schema.shops.id, id));
  }

  // Product operations
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(schema.products).values(insertProduct).returning();
    return product;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(schema.products).where(eq(schema.products.id, id));
    return product;
  }

  async listProducts(filters?: { shopId?: string; search?: string; category?: string }): Promise<Product[]> {
    let conditions = [];
    
    if (filters?.shopId) {
      conditions.push(eq(schema.products.shopId, filters.shopId));
    }
    if (filters?.search) {
      conditions.push(ilike(schema.products.name, `%${filters.search}%`));
    }
    if (filters?.category) {
      conditions.push(eq(schema.products.category, filters.category));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(schema.products).where(and(...conditions));
    }
    
    return await db.select().from(schema.products);
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db.update(schema.products).set(updates).where(eq(schema.products.id, id)).returning();
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(schema.products).where(eq(schema.products.id, id));
  }

  // Cart operations
  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const existing = await db
      .select()
      .from(schema.cartItems)
      .where(
        and(
          eq(schema.cartItems.userId, insertCartItem.userId),
          eq(schema.cartItems.productId, insertCartItem.productId),
          insertCartItem.size ? eq(schema.cartItems.size, insertCartItem.size) : sql`${schema.cartItems.size} IS NULL`,
          insertCartItem.color ? eq(schema.cartItems.color, insertCartItem.color) : sql`${schema.cartItems.color} IS NULL`
        )
      );

    if (existing.length > 0) {
      const [updated] = await db
        .update(schema.cartItems)
        .set({ quantity: sql`${schema.cartItems.quantity} + ${insertCartItem.quantity}` })
        .where(eq(schema.cartItems.id, existing[0].id))
        .returning();
      return updated;
    }

    const [cartItem] = await db.insert(schema.cartItems).values(insertCartItem).returning();
    return cartItem;
  }

  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db
      .select()
      .from(schema.cartItems)
      .leftJoin(schema.products, eq(schema.cartItems.productId, schema.products.id))
      .where(eq(schema.cartItems.userId, userId));

    return items.map((item) => ({
      ...item.cart_items,
      product: item.products!,
    }));
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [item] = await db
      .update(schema.cartItems)
      .set({ quantity })
      .where(eq(schema.cartItems.id, id))
      .returning();
    return item;
  }

  async removeFromCart(id: string): Promise<void> {
    await db.delete(schema.cartItems).where(eq(schema.cartItems.id, id));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(schema.cartItems).where(eq(schema.cartItems.userId, userId));
  }

  // Wishlist operations
  async addToWishlist(insertWishlistItem: InsertWishlistItem): Promise<WishlistItem> {
    const [item] = await db.insert(schema.wishlistItems).values(insertWishlistItem).returning();
    return item;
  }

  async getWishlistItems(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    const items = await db
      .select()
      .from(schema.wishlistItems)
      .leftJoin(schema.products, eq(schema.wishlistItems.productId, schema.products.id))
      .where(eq(schema.wishlistItems.userId, userId));

    return items.map((item) => ({
      ...item.wishlist_items,
      product: item.products!,
    }));
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    await db
      .delete(schema.wishlistItems)
      .where(and(eq(schema.wishlistItems.userId, userId), eq(schema.wishlistItems.productId, productId)));
  }

  // Saved shops operations
  async saveShop(insertSavedShop: InsertSavedShop): Promise<SavedShop> {
    const [saved] = await db.insert(schema.savedShops).values(insertSavedShop).returning();
    return saved;
  }

  async getSavedShops(userId: string): Promise<(SavedShop & { shop: Shop })[]> {
    const items = await db
      .select()
      .from(schema.savedShops)
      .leftJoin(schema.shops, eq(schema.savedShops.shopId, schema.shops.id))
      .where(eq(schema.savedShops.userId, userId));

    return items.map((item) => ({
      ...item.saved_shops,
      shop: item.shops!,
    }));
  }

  async unsaveShop(userId: string, shopId: string): Promise<void> {
    await db
      .delete(schema.savedShops)
      .where(and(eq(schema.savedShops.userId, userId), eq(schema.savedShops.shopId, shopId)));
  }

  // Flash drops operations
  async createFlashDrop(insertFlashDrop: InsertFlashDrop): Promise<FlashDrop> {
    const [drop] = await db.insert(schema.flashDrops).values(insertFlashDrop).returning();
    return drop;
  }

  async getActiveFlashDrops(): Promise<(FlashDrop & { product: Product })[]> {
    const now = new Date();
    const drops = await db
      .select()
      .from(schema.flashDrops)
      .leftJoin(schema.products, eq(schema.flashDrops.productId, schema.products.id))
      .where(sql`${schema.flashDrops.endsAt} > ${now}`)
      .orderBy(desc(schema.flashDrops.createdAt));

    return drops.map((drop) => ({
      ...drop.flash_drops,
      product: drop.products!,
    }));
  }

  async updateFlashDropQuantity(id: string, quantity: number): Promise<FlashDrop | undefined> {
    const [drop] = await db
      .update(schema.flashDrops)
      .set({ remainingQuantity: quantity })
      .where(eq(schema.flashDrops.id, id))
      .returning();
    return drop;
  }

  // Outfit boards operations
  async createOutfitBoard(insertBoard: InsertOutfitBoard): Promise<OutfitBoard> {
    const [board] = await db.insert(schema.outfitBoards).values(insertBoard).returning();
    return board;
  }

  async getOutfitBoards(userId: string): Promise<OutfitBoard[]> {
    return await db.select().from(schema.outfitBoards).where(eq(schema.outfitBoards.userId, userId));
  }

  async addProductToBoard(insertItem: InsertOutfitBoardItem): Promise<OutfitBoardItem> {
    const [item] = await db.insert(schema.outfitBoardItems).values(insertItem).returning();
    return item;
  }

  async getBoardItems(boardId: string): Promise<(OutfitBoardItem & { product: Product })[]> {
    const items = await db
      .select()
      .from(schema.outfitBoardItems)
      .leftJoin(schema.products, eq(schema.outfitBoardItems.productId, schema.products.id))
      .where(eq(schema.outfitBoardItems.boardId, boardId));

    return items.map((item) => ({
      ...item.outfit_board_items,
      product: item.products!,
    }));
  }

  async removeProductFromBoard(boardId: string, productId: string): Promise<void> {
    await db
      .delete(schema.outfitBoardItems)
      .where(
        and(eq(schema.outfitBoardItems.boardId, boardId), eq(schema.outfitBoardItems.productId, productId))
      );
  }

  async deleteOutfitBoard(id: string): Promise<void> {
    await db.delete(schema.outfitBoards).where(eq(schema.outfitBoards.id, id));
  }

  // DripCoin transactions
  async createDripCoinTransaction(
    insertTransaction: InsertDripCoinTransaction
  ): Promise<DripCoinTransaction> {
    const [transaction] = await db.insert(schema.dripCoinTransactions).values(insertTransaction).returning();
    await this.updateUserDripCoins(insertTransaction.userId, insertTransaction.amount);
    return transaction;
  }

  async getDripCoinTransactions(userId: string): Promise<DripCoinTransaction[]> {
    return await db
      .select()
      .from(schema.dripCoinTransactions)
      .where(eq(schema.dripCoinTransactions.userId, userId))
      .orderBy(desc(schema.dripCoinTransactions.createdAt));
  }
}

export const storage = new DatabaseStorage();
