import { useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import DripBotChat from "@/components/DripBotChat";
import productImg1 from "@assets/generated_images/sneaker_product_image_1.png";
import productImg2 from "@assets/generated_images/jacket_product_image_2.png";
import productImg3 from "@assets/generated_images/hoodie_product_image_3.png";

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Neon Purple");
  const [isSaved, setIsSaved] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Neon Purple", "Electric Blue", "Pink Glow", "Mint Fresh"];

  const suggestedProducts = [
    { id: "2", name: "Cyber Leather Jacket", price: 249, image: productImg2, shopName: "Urban Threads" },
    { id: "3", name: "Pastel Dream Hoodie", price: 89, image: productImg3, shopName: "Urban Threads" },
    { id: "4", name: "Future Tech Tee", price: 45, image: productImg1, shopName: "Urban Threads" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 hover-elevate active-elevate-2"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-lg overflow-hidden border border-primary/30 neon-glow-primary bg-card">
              <img 
                src={productImg1} 
                alt="Neon Runner Sneakers" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[productImg1, productImg2, productImg3, productImg1].map((img, idx) => (
                <div 
                  key={idx}
                  className="aspect-square rounded-md overflow-hidden border border-primary/20 cursor-pointer hover:border-primary transition-colors bg-card"
                >
                  <img 
                    src={img} 
                    alt={`Product view ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-heading font-bold mb-2" data-testid="text-product-name">
                    Neon Runner Sneakers
                  </h1>
                  <p className="text-muted-foreground" data-testid="text-shop-name">
                    Urban Threads
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover-elevate active-elevate-2"
                  onClick={() => {
                    setIsSaved(!isSaved);
                    console.log(`${isSaved ? 'Removed from' : 'Added to'} wishlist`);
                  }}
                  data-testid="button-save"
                >
                  <Heart className={`w-6 h-6 ${isSaved ? 'fill-secondary text-secondary' : ''}`} />
                </Button>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-heading font-bold gradient-text" data-testid="text-price">
                  $129
                </span>
                <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                  In Stock
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              {["Streetwear", "Limited", "New Drop"].map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="border-primary/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground">
                Step into the future with our Neon Runner Sneakers. Featuring cutting-edge design with vibrant neon accents, these kicks are perfect for making a statement. Premium materials meet street style in this must-have piece for any urban wardrobe.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`min-w-[3rem] ${
                      selectedSize === size 
                        ? "bg-primary neon-glow-primary" 
                        : "border-primary/30 hover-elevate active-elevate-2"
                    }`}
                    onClick={() => {
                      setSelectedSize(size);
                      console.log(`Selected size: ${size}`);
                    }}
                    data-testid={`button-size-${size.toLowerCase()}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className={`${
                      selectedColor === color 
                        ? "bg-primary neon-glow-primary" 
                        : "border-primary/30 hover-elevate active-elevate-2"
                    }`}
                    onClick={() => {
                      setSelectedColor(color);
                      console.log(`Selected color: ${color}`);
                    }}
                    data-testid={`button-color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center border border-primary/30 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-decrease-quantity"
                >
                  -
                </Button>
                <span className="px-4 font-semibold" data-testid="text-quantity">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                >
                  +
                </Button>
              </div>

              <Button 
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover-elevate active-elevate-2 font-semibold text-lg"
                onClick={() => console.log(`Added ${quantity} to cart`)}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <Card className="p-4 border-accent/30 bg-accent/5">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">AI Styling Suggestion</h4>
                  <p className="text-sm text-muted-foreground">
                    These sneakers pair perfectly with slim-fit black jeans and an oversized hoodie for the ultimate streetwear vibe. Try our AI Outfit Builder to see more combinations!
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 space-y-6"
        >
          <h2 className="text-2xl font-heading font-semibold">
            You Might Also Like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {suggestedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => console.log(`Clicked: ${product.name}`)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <DripBotChat />
    </div>
  );
}
