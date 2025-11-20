import { useState } from "react";
import { ArrowLeft, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import DripBotChat from "@/components/DripBotChat";
import bannerImg from "@assets/generated_images/streetwear_shop_banner_image.png";
import productImg1 from "@assets/generated_images/sneaker_product_image_1.png";
import productImg2 from "@assets/generated_images/jacket_product_image_2.png";
import productImg3 from "@assets/generated_images/hoodie_product_image_3.png";

export default function ShopPage() {
  const [isFollowing, setIsFollowing] = useState(false);

  const mockProducts = [
    { id: "1", name: "Neon Runner Sneakers", price: 129, image: productImg1, shopName: "Urban Threads" },
    { id: "2", name: "Cyber Leather Jacket", price: 249, image: productImg2, shopName: "Urban Threads" },
    { id: "3", name: "Pastel Dream Hoodie", price: 89, image: productImg3, shopName: "Urban Threads" },
    { id: "4", name: "Future Tech Tee", price: 45, image: productImg1, shopName: "Urban Threads" },
    { id: "5", name: "Neon Cargo Pants", price: 95, image: productImg2, shopName: "Urban Threads" },
    { id: "6", name: "Holographic Cap", price: 35, image: productImg3, shopName: "Urban Threads" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Button 
          variant="ghost" 
          className="hover-elevate active-elevate-2"
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
            src={bannerImg} 
            alt="Shop banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full border-2 border-primary neon-glow-primary overflow-hidden bg-card">
                <img 
                  src="https://api.dicebear.com/7.x/shapes/svg?seed=urban" 
                  alt="Urban Threads logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-heading font-bold mb-1" data-testid="text-shop-name">
                  Urban Threads
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Downtown
                  </span>
                  <span>500+ Products</span>
                  <span>2.5K Followers</span>
                </div>
              </div>
            </div>

            <Button
              className={`${isFollowing ? 'bg-primary' : 'border-primary/50'} hover-elevate active-elevate-2`}
              variant={isFollowing ? "default" : "outline"}
              onClick={() => {
                setIsFollowing(!isFollowing);
                console.log(`${isFollowing ? 'Unfollowed' : 'Followed'} shop`);
              }}
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
              Your go-to destination for cutting-edge streetwear and urban fashion. We curate the latest trends from local and international brands, bringing you the freshest drops in the city.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Streetwear", "Trending", "Local Favorite", "New Arrivals"].map((tag) => (
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <ProductCard
                  {...product}
                  onClick={() => console.log(`Clicked product: ${product.name}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <DripBotChat />
    </div>
  );
}
