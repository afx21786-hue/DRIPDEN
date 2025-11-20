import { Search, Heart, ShoppingCart, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface NavbarProps {
  dripCoins?: number;
  cartItems?: number;
  wishlistItems?: number;
  onSearch?: (query: string) => void;
}

export default function Navbar({ 
  dripCoins = 1250, 
  cartItems = 3, 
  wishlistItems = 12,
  onSearch 
}: NavbarProps) {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-primary/30 glass-blur"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold gradient-text" data-testid="text-logo">
              DRIPDEN
            </h1>
          </div>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shops, products, vibes..."
                className="pl-10 border-primary/30 focus:border-primary neon-glow-primary bg-card/50"
                onChange={(e) => onSearch?.(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-md bg-card border border-primary/30 neon-glow-primary">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold gradient-text" data-testid="text-dripcoins">
                {dripCoins}
              </span>
            </div>

            <Button 
              size="icon" 
              variant="ghost" 
              className="relative hover-elevate active-elevate-2"
              data-testid="button-wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-xs"
                  data-testid="badge-wishlist-count"
                >
                  {wishlistItems}
                </Badge>
              )}
            </Button>

            <Button 
              size="icon" 
              variant="ghost" 
              className="relative hover-elevate active-elevate-2"
              data-testid="button-cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItems}
                </Badge>
              )}
            </Button>

            <Button 
              size="icon" 
              variant="ghost"
              className="hover-elevate active-elevate-2"
              data-testid="button-profile"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
