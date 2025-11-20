import { motion } from "framer-motion";
import { Heart, TrendingUp, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShopCardProps {
  id: string;
  name: string;
  banner: string;
  logo: string;
  tags: string[];
  location: string;
  products: { image: string }[];
  isFollowing?: boolean;
  isTrending?: boolean;
  onClick?: () => void;
}

export default function ShopCard({
  name,
  banner,
  logo,
  tags,
  location,
  products,
  isFollowing = false,
  isTrending = false,
  onClick
}: ShopCardProps) {
  const [following, setFollowing] = useState(isFollowing);

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid={`card-shop-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Card 
        className="overflow-hidden cursor-pointer border-primary/30 hover:border-primary transition-all duration-300 neon-glow-primary hover:shadow-neon-primary bg-card/80"
        onClick={onClick}
      >
        <div className="relative h-40 overflow-hidden">
          <img 
            src={banner} 
            alt={`${name} banner`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          
          {isTrending && (
            <Badge className="absolute top-3 right-3 bg-secondary border-secondary/30 gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </Badge>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-3">
            <div className="w-16 h-16 rounded-full border-2 border-primary/50 neon-glow-primary overflow-hidden bg-card">
              <img src={logo} alt={`${name} logo`} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg" data-testid={`text-shop-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
                {name}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="border-primary/30 text-xs"
                data-testid={`badge-tag-${tag.toLowerCase()}`}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 flex -space-x-2">
              {products.slice(0, 3).map((product, idx) => (
                <div 
                  key={idx} 
                  className="w-12 h-12 rounded-md overflow-hidden border-2 border-card bg-card"
                >
                  <img 
                    src={product.image} 
                    alt={`Product ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <Button
              size="sm"
              variant={following ? "default" : "outline"}
              className={following ? "bg-primary hover-elevate active-elevate-2" : "border-primary/30 hover-elevate active-elevate-2"}
              onClick={(e) => {
                e.stopPropagation();
                setFollowing(!following);
                console.log(`${following ? 'Unfollowed' : 'Followed'} ${name}`);
              }}
              data-testid="button-follow-shop"
            >
              <Heart className={`w-4 h-4 ${following ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
