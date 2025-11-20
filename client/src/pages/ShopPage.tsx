import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import DripBotChat from "@/components/DripBotChat";
import { useShop, useProducts, useSaveShop, useUnsaveShop, useSavedShops } from "@/lib/hooks";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function ShopPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: shop, isLoading: shopLoading } = useShop(id!);
  const { data: products, isLoading: productsLoading } = useProducts(id);
  const { data: savedShops } = useSavedShops();
  const saveShop = useSaveShop();
  const unsaveShop = useUnsaveShop();

  const isFollowing = savedShops?.some((s: any) => s.shopId === id) || false;

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        await unsaveShop.mutateAsync(id!);
        toast({ title: "Shop unfollowed" });
      } else {
        await saveShop.mutateAsync(id!);
        toast({ title: "Shop followed! You earned 10 DripCoins!", variant: "default" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (shopLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse gradient-text text-2xl font-heading">Loading shop...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading gradient-text mb-4">Shop not found</h1>
          <Button onClick={() => setLocation("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Button 
          variant="ghost" 
          className="hover-elevate active-elevate-2"
          onClick={() => setLocation("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shops
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 rounded-lg overflow-hidden border border-primary/30 neon-glow-primary"
        >
          <img 
            src={shop.banner || "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200"} 
            alt="Shop banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full border-2 border-primary neon-glow-primary overflow-hidden bg-card">
                <img 
                  src={shop.logo || `https://api.dicebear.com/7.x/shapes/svg?seed=${shop.name}`} 
                  alt={`${shop.name} logo`} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-heading font-bold mb-1" data-testid="text-shop-name">
                  {shop.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {shop.location}
                  </span>
                  <span>{products?.length || 0} Products</span>
                </div>
              </div>
            </div>

            <Button
              className={`${isFollowing ? 'bg-primary' : 'border-primary/50'} hover-elevate active-elevate-2`}
              variant={isFollowing ? "default" : "outline"}
              onClick={handleFollowClick}
              data-testid="button-follow"
            >
              <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
              {isFollowing ? 'Following' : 'Follow Shop'}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div>
            <h2 className="text-2xl font-heading font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">
              {shop.description || "Discover the latest fashion trends at this amazing local shop."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {shop.tags?.map((tag: string) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="border-primary/30"
                data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-heading font-semibold">
            Products
          </h2>

          {productsLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse gradient-text">Loading products...</div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={parseFloat(product.price)}
                    image={product.image}
                    shopName={shop.name}
                    onClick={() => setLocation(`/product/${product.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No products available yet.
            </div>
          )}
        </motion.div>
      </div>

      <DripBotChat />
    </div>
  );
}
