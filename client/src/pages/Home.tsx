import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FlashDropBanner from "@/components/FlashDropBanner";
import FilterBar from "@/components/FilterBar";
import ShopCard from "@/components/ShopCard";
import DripBotChat from "@/components/DripBotChat";
import { motion } from "framer-motion";

import bannerImg1 from "@assets/generated_images/streetwear_shop_banner_image.png";
import bannerImg2 from "@assets/generated_images/vintage_shop_banner_image.png";
import bannerImg3 from "@assets/generated_images/minimal_shop_banner_image.png";
import productImg1 from "@assets/generated_images/sneaker_product_image_1.png";
import productImg2 from "@assets/generated_images/jacket_product_image_2.png";
import productImg3 from "@assets/generated_images/hoodie_product_image_3.png";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const mockShops = [
    {
      id: "1",
      name: "Urban Threads",
      banner: bannerImg1,
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=urban",
      tags: ["Streetwear", "Trending", "Local Favorite"],
      location: "Downtown",
      products: [
        { image: productImg1 },
        { image: productImg2 },
        { image: productImg3 }
      ],
      isTrending: true
    },
    {
      id: "2",
      name: "Retro Vibes",
      banner: bannerImg2,
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=retro",
      tags: ["Vintage", "Unique", "90s"],
      location: "East Side",
      products: [
        { image: productImg2 },
        { image: productImg3 },
        { image: productImg1 }
      ],
      isTrending: false
    },
    {
      id: "3",
      name: "Minimal Studio",
      banner: bannerImg3,
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=minimal",
      tags: ["Minimal", "Clean", "Modern"],
      location: "West District",
      products: [
        { image: productImg3 },
        { image: productImg1 },
        { image: productImg2 }
      ],
      isTrending: false
    },
    {
      id: "4",
      name: "Neon District",
      banner: bannerImg1,
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=neon",
      tags: ["Streetwear", "Hypebeast", "Limited"],
      location: "Central",
      products: [
        { image: productImg1 },
        { image: productImg3 },
        { image: productImg2 }
      ],
      isTrending: true
    },
    {
      id: "5",
      name: "Pastel Dreams",
      banner: bannerImg3,
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=pastel",
      tags: ["Girly", "Soft Girl", "Kawaii"],
      location: "North End",
      products: [
        { image: productImg2 },
        { image: productImg1 },
        { image: productImg3 }
      ],
      isTrending: false
    },
    {
      id: "6",
      name: "Sneaker Haven",
      banner: bannerImg2,
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=sneaker",
      tags: ["Sneakers", "Limited Drops", "Authentic"],
      location: "South Plaza",
      products: [
        { image: productImg1 },
        { image: productImg2 },
        { image: productImg3 }
      ],
      isTrending: true
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        dripCoins={1250}
        cartItems={3}
        wishlistItems={12}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockShops.map((shop, index) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ShopCard
                  {...shop}
                  onClick={() => console.log(`Clicked shop: ${shop.name}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <DripBotChat />
    </div>
  );
}
