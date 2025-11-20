import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FlashDropBanner from "@/components/FlashDropBanner";
import FilterBar from "@/components/FilterBar";
import ShopCard from "@/components/ShopCard";
import DripBotChat from "@/components/DripBotChat";
import { motion } from "framer-motion";
import { useShops, useProducts } from "@/lib/hooks";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: shops, isLoading: shopsLoading } = useShops(searchQuery);
  const { data: allProducts } = useProducts();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [authLoading, user, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse gradient-text text-2xl font-heading">Loading DRIPDEN...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getShopProducts = (shopId: string) => {
    if (!allProducts) return [];
    return allProducts
      .filter((p: any) => p.shopId === shopId)
      .slice(0, 3)
      .map((p: any) => ({ image: p.image }));
  };

  const displayShops = shops || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        dripCoins={user.dripCoins}
        cartItems={0}
        wishlistItems={0}
        onSearch={setSearchQuery}
      />

      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FlashDropBanner />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">
                Explore <span className="gradient-text">Local Shops</span>
              </h2>
              <p className="text-muted-foreground">
                Discover your city's hottest fashion destinations
              </p>
            </div>
          </div>

          <FilterBar onFilterChange={setActiveFilter} />

          {shopsLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse gradient-text">Loading shops...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayShops.map((shop: any, index: number) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <ShopCard
                    id={shop.id}
                    name={shop.name}
                    banner={shop.banner}
                    logo={shop.logo}
                    tags={shop.tags || []}
                    location={shop.location}
                    products={getShopProducts(shop.id)}
                    isTrending={shop.isTrending}
                    onClick={() => setLocation(`/shop/${shop.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>

      <DripBotChat />
    </div>
  );
}
