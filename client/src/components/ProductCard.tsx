import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  shopName: string;
  isSaved?: boolean;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  shopName,
  isSaved = false,
  onClick
}: ProductCardProps) {
  const [saved, setSaved] = useState(isSaved);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-product-${id}`}
    >
      <Card 
        className="overflow-hidden cursor-pointer border border-primary/20 hover:border-primary transition-all duration-300 bg-card/60 hover:shadow-neon-primary group"
        onClick={onClick}
      >
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover-elevate active-elevate-2"
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
              console.log(`${saved ? 'Removed from' : 'Added to'} wishlist: ${name}`);
            }}
            data-testid="button-save-product"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-secondary text-secondary' : ''}`} />
          </Button>
        </div>

        <div className="p-3 space-y-2">
          <div>
            <h4 className="font-medium text-sm truncate" data-testid="text-product-name">
              {name}
            </h4>
            <p className="text-xs text-muted-foreground" data-testid="text-shop-name">
              {shopName}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold gradient-text" data-testid="text-price">
              ${price}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
