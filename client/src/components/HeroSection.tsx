import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@assets/generated_images/hero_neon_cityscape_background.png";

export default function HeroSection() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-10" />
      
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            <span className="gradient-text">Discover</span> Your City's
            <br />
            <span className="gradient-text">Hottest Drip</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Explore local fashion shops, build AI-powered outfits, and find your vibe with DRIPDEN
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover-elevate active-elevate-2 text-lg px-8"
              data-testid="button-explore-shops"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Shops
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 glass-blur hover-elevate active-elevate-2 text-lg px-8"
              data-testid="button-ai-outfit"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try AI Outfit Builder
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-heading font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground">Local Shops</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-heading font-bold gradient-text">10K+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-heading font-bold gradient-text flex items-center justify-center gap-1">
                <TrendingUp className="w-6 h-6" />
                100%
              </div>
              <div className="text-sm text-muted-foreground">AI Powered</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
