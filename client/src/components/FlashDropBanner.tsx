import { motion } from "framer-motion";
import { Zap, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface FlashDropBannerProps {
  title?: string;
  endsAt?: Date;
  itemsLeft?: number;
  onClick?: () => void;
}

export default function FlashDropBanner({ 
  title = "FLASH DROP: Limited Edition Neon Collection",
  endsAt = new Date(Date.now() + 3600000),
  itemsLeft = 23,
  onClick
}: FlashDropBannerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endsAt.getTime() - now;
      
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="banner-flash-drop"
    >
      <Card className="relative overflow-hidden border-2 border-secondary neon-pulse bg-gradient-to-r from-card/90 to-card/70 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 animate-shimmer" />
        
        <div className="relative p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-secondary animate-pulse" />
                <h2 className="text-2xl font-heading font-bold gradient-text" data-testid="text-flash-title">
                  {title}
                </h2>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="font-mono text-accent font-semibold" data-testid="text-time-left">
                    {timeLeft}
                  </span>
                </div>
                
                <Badge variant="outline" className="border-secondary/50 bg-secondary/10" data-testid="badge-items-left">
                  {itemsLeft} items left
                </Badge>
              </div>
            </div>

            <Button 
              className="bg-gradient-to-r from-secondary to-primary hover-elevate active-elevate-2 font-semibold"
              onClick={onClick}
              data-testid="button-shop-now"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
