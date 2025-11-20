type FetchOptions = RequestInit & {
  params?: Record<string, string>;
};

async function fetchAPI(
  endpoint: string,
  { params, ...options }: FetchOptions = {}
): Promise<Response> {
  const url = new URL(`/api${endpoint}`, window.location.origin);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  return response;
}

export const api = {
  // Auth
  auth: {
    register: async (username: string, password: string) => {
      const response = await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      return response.json();
    },
    login: async (username: string, password: string) => {
      const response = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }
      return response.json();
    },
    logout: async () => {
      const response = await fetchAPI("/auth/logout", {
        method: "POST",
      });
      return response.json();
    },
    me: async () => {
      try {
        const response = await fetchAPI("/auth/me");
        if (!response.ok) return null;
        return response.json();
      } catch {
        return null;
      }
    },
  },

  // Shops
  shops: {
    list: async (search?: string, tags?: string[]) => {
      const response = await fetchAPI("/shops", {
        params: {
          search: search || "",
          tags: tags?.join(",") || "",
        },
      });
      return response.json();
    },
    get: async (id: string) => {
      const response = await fetchAPI(`/shops/${id}`);
      return response.json();
    },
    create: async (data: any) => {
      const response = await fetchAPI("/shops", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },

  // Products
  products: {
    list: async (shopId?: string, search?: string, category?: string) => {
      const response = await fetchAPI("/products", {
        params: {
          shopId: shopId || "",
          search: search || "",
          category: category || "",
        },
      });
      return response.json();
    },
    get: async (id: string) => {
      const response = await fetchAPI(`/products/${id}`);
      return response.json();
    },
    create: async (data: any) => {
      const response = await fetchAPI("/products", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },

  // Cart
  cart: {
    get: async () => {
      const response = await fetchAPI("/cart");
      if (!response.ok) return [];
      return response.json();
    },
    add: async (productId: string, quantity: number, size?: string, color?: string) => {
      const response = await fetchAPI("/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity, size, color }),
      });
      return response.json();
    },
    update: async (id: string, quantity: number) => {
      const response = await fetchAPI(`/cart/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
      return response.json();
    },
    remove: async (id: string) => {
      const response = await fetchAPI(`/cart/${id}`, {
        method: "DELETE",
      });
      return response.json();
    },
    clear: async () => {
      const response = await fetchAPI("/cart", {
        method: "DELETE",
      });
      return response.json();
    },
  },

  // Wishlist
  wishlist: {
    get: async () => {
      const response = await fetchAPI("/wishlist");
      if (!response.ok) return [];
      return response.json();
    },
    add: async (productId: string) => {
      const response = await fetchAPI("/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId }),
      });
      return response.json();
    },
    remove: async (productId: string) => {
      const response = await fetchAPI(`/wishlist/${productId}`, {
        method: "DELETE",
      });
      return response.json();
    },
  },

  // Saved shops
  savedShops: {
    get: async () => {
      const response = await fetchAPI("/saved-shops");
      if (!response.ok) return [];
      return response.json();
    },
    save: async (shopId: string) => {
      const response = await fetchAPI("/saved-shops", {
        method: "POST",
        body: JSON.stringify({ shopId }),
      });
      return response.json();
    },
    unsave: async (shopId: string) => {
      const response = await fetchAPI(`/saved-shops/${shopId}`, {
        method: "DELETE",
      });
      return response.json();
    },
  },

  // Flash drops
  flashDrops: {
    list: async () => {
      const response = await fetchAPI("/flash-drops");
      return response.json();
    },
    create: async (data: any) => {
      const response = await fetchAPI("/flash-drops", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },

  // Outfit boards
  outfitBoards: {
    list: async () => {
      const response = await fetchAPI("/outfit-boards");
      if (!response.ok) return [];
      return response.json();
    },
    create: async (name: string, description?: string) => {
      const response = await fetchAPI("/outfit-boards", {
        method: "POST",
        body: JSON.stringify({ name, description }),
      });
      return response.json();
    },
    getItems: async (boardId: string) => {
      const response = await fetchAPI(`/outfit-boards/${boardId}/items`);
      return response.json();
    },
    addItem: async (boardId: string, productId: string) => {
      const response = await fetchAPI(`/outfit-boards/${boardId}/items`, {
        method: "POST",
        body: JSON.stringify({ productId }),
      });
      return response.json();
    },
    removeItem: async (boardId: string, productId: string) => {
      const response = await fetchAPI(`/outfit-boards/${boardId}/items/${productId}`, {
        method: "DELETE",
      });
      return response.json();
    },
    delete: async (boardId: string) => {
      const response = await fetchAPI(`/outfit-boards/${boardId}`, {
        method: "DELETE",
      });
      return response.json();
    },
  },

  // Profile
  profile: {
    get: async () => {
      const response = await fetchAPI("/profile");
      if (!response.ok) return null;
      return response.json();
    },
  },

  // DripCoin transactions
  dripCoinTransactions: {
    list: async () => {
      const response = await fetchAPI("/dripcoin-transactions");
      if (!response.ok) return [];
      return response.json();
    },
  },
};
