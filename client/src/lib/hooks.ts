import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

// Shops hooks
export function useShops(search?: string, tags?: string[]) {
  return useQuery({
    queryKey: ["shops", search, tags],
    queryFn: () => api.shops.list(search, tags),
  });
}

export function useShop(id: string) {
  return useQuery({
    queryKey: ["shop", id],
    queryFn: () => api.shops.get(id),
    enabled: !!id,
  });
}

// Products hooks
export function useProducts(shopId?: string, search?: string, category?: string) {
  return useQuery({
    queryKey: ["products", shopId, search, category],
    queryFn: () => api.products.list(shopId, search, category),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.products.get(id),
    enabled: !!id,
  });
}

// Cart hooks
export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => api.cart.get(),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      quantity,
      size,
      color,
    }: {
      productId: string;
      quantity: number;
      size?: string;
      color?: string;
    }) => api.cart.add(productId, quantity, size, color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      api.cart.update(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.cart.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.cart.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// Wishlist hooks
export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => api.wishlist.get(),
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => api.wishlist.add(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => api.wishlist.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

// Saved shops hooks
export function useSavedShops() {
  return useQuery({
    queryKey: ["savedShops"],
    queryFn: () => api.savedShops.get(),
  });
}

export function useSaveShop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shopId: string) => api.savedShops.save(shopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedShops"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUnsaveShop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shopId: string) => api.savedShops.unsave(shopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedShops"] });
    },
  });
}

// Flash drops hooks
export function useFlashDrops() {
  return useQuery({
    queryKey: ["flashDrops"],
    queryFn: () => api.flashDrops.list(),
  });
}

// Outfit boards hooks
export function useOutfitBoards() {
  return useQuery({
    queryKey: ["outfitBoards"],
    queryFn: () => api.outfitBoards.list(),
  });
}

export function useCreateOutfitBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, description }: { name: string; description?: string }) =>
      api.outfitBoards.create(name, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outfitBoards"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useBoardItems(boardId: string) {
  return useQuery({
    queryKey: ["boardItems", boardId],
    queryFn: () => api.outfitBoards.getItems(boardId),
    enabled: !!boardId,
  });
}

export function useAddToBoardItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, productId }: { boardId: string; productId: string }) =>
      api.outfitBoards.addItem(boardId, productId),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boardItems", boardId] });
    },
  });
}

export function useRemoveFromBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, productId }: { boardId: string; productId: string }) =>
      api.outfitBoards.removeItem(boardId, productId),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boardItems", boardId] });
    },
  });
}

export function useDeleteOutfitBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (boardId: string) => api.outfitBoards.delete(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outfitBoards"] });
    },
  });
}

// Profile hooks
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => api.profile.get(),
  });
}

// DripCoin transactions hooks
export function useDripCoinTransactions() {
  return useQuery({
    queryKey: ["dripCoinTransactions"],
    queryFn: () => api.dripCoinTransactions.list(),
  });
}
