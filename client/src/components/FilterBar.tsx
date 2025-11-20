import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const categories = [
  "All",
  "Streetwear",
  "Vintage",
  "Minimal",
  "Girly",
  "Sneakers",
  "Budget"
];

interface FilterBarProps {
  onFilterChange?: (filter: string) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilter = (category: string) => {
    setActiveFilter(category);
    onFilterChange?.(category);
    console.log(`Filter changed to: ${category}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      data-testid="filter-bar"
    >
      {categories.map((category) => {
        const isActive = activeFilter === category;
        return (
          <Badge
            key={category}
            variant={isActive ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap transition-all duration-300 ${
              isActive 
                ? "bg-primary border-primary neon-glow-primary" 
                : "border-primary/30 hover:border-primary hover-elevate active-elevate-2"
            }`}
            onClick={() => handleFilter(category)}
            data-testid={`filter-${category.toLowerCase()}`}
          >
            {category}
          </Badge>
        );
      })}
    </motion.div>
  );
}
