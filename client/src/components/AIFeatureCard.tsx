import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AIFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  onClick?: () => void;
}

export default function AIFeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  onClick
}: AIFeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="p-6 border-primary/30 hover:border-primary transition-all duration-300 bg-card/60 hover:shadow-neon-primary cursor-pointer group"
        onClick={onClick}
        data-testid={`card-ai-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div 
          className={`w-14 h-14 rounded-lg ${gradient} flex items-center justify-center mb-4 neon-glow-primary group-hover:shadow-neon-secondary transition-all duration-300`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-xl font-heading font-semibold mb-2" data-testid="text-feature-title">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4" data-testid="text-feature-description">
          {description}
        </p>

        <Button 
          variant="ghost" 
          className="w-full border border-primary/30 hover-elevate active-elevate-2"
          data-testid="button-try-feature"
        >
          Try Now
        </Button>
      </Card>
    </motion.div>
  );
}
