import { Search, Heart, ShoppingCart, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, label: "DripBot AI", count: 2 },
    { id: 2, label: "Shop Updates", count: 5 },
    { id: 3, label: "Flash Drops", count: 1 }
  ];

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

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-primary/30 neon-glow-primary">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold gradient-text" data-testid="text-dripcoins">
                {dripCoins}
              </span>
            </div>

            <div className="relative">
              <Button 
                size="icon" 
                variant="ghost" 
                className="relative hover-elevate active-elevate-2 h-9 w-9"
                onClick={() => setShowNotifications(!showNotifications)}
                data-testid="button-dripden-notifications"
              >
                <div className="w-5 h-5 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
                  D
                </div>
                {(notifications.reduce((sum, n) => sum + n.count, 0) > 0) && (
                  <div className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-secondary text-[10px] font-bold border border-background">
                    {notifications.reduce((sum, n) => sum + n.count, 0)}
                  </div>
                )}
              </Button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-64 bg-card border border-primary/30 rounded-lg shadow-neon-primary glass-blur overflow-hidden"
                    data-testid="dropdown-notifications"
                  >
                    <div className="p-3 border-b border-primary/20">
                      <h3 className="font-heading font-semibold text-sm">Notifications</h3>
                    </div>
                    <div className="divide-y divide-primary/10">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          className="w-full p-3 hover-elevate active-elevate-2 text-left flex items-center justify-between gap-2"
                          onClick={() => {
                            console.log(`Selected notification: ${notification.id}`);
                            setShowNotifications(false);
                          }}
                          data-testid={`notification-${notification.id}`}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {notification.id}
                            </div>
                            <span className="text-sm truncate">{notification.label}</span>
                          </div>
                          {notification.count > 0 && (
                            <div className="h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full bg-secondary text-[10px] font-bold flex-shrink-0">
                              {notification.count}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button 
              size="icon" 
              variant="ghost" 
              className="relative hover-elevate active-elevate-2 h-9 w-9"
              data-testid="button-wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems > 0 && (
                <div className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-secondary text-[10px] font-bold border border-background">
                  {wishlistItems}
                </div>
              )}
            </Button>

            <Button 
              size="icon" 
              variant="ghost" 
              className="relative hover-elevate active-elevate-2 h-9 w-9"
              data-testid="button-cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <div className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-primary text-[10px] font-bold border border-background">
                  {cartItems}
                </div>
              )}
            </Button>

            <Button 
              size="icon" 
              variant="ghost"
              className="hover-elevate active-elevate-2 h-9 w-9"
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
