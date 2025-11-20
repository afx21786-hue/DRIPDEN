import { storage } from "./storage";

async function seed() {
  console.log("Starting seed...");

  try {
    // Create shops
    const urbanThreads = await storage.createShop({
      name: "Urban Threads",
      description: "Cutting-edge streetwear with bold designs and exclusive drops",
      banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=urban",
      location: "Downtown",
      tags: ["Streetwear", "Trending", "Local Favorite"],
      isTrending: true,
    });

    const retroVibes = await storage.createShop({
      name: "Retro Vibes",
      description: "Vintage fashion from the 80s and 90s era",
      banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=retro",
      location: "East Side",
      tags: ["Vintage", "Unique", "90s"],
      isTrending: false,
    });

    const minimalStudio = await storage.createShop({
      name: "Minimal Studio",
      description: "Clean, modern aesthetic for the minimalist wardrobe",
      banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=minimal",
      location: "West District",
      tags: ["Minimal", "Clean", "Modern"],
      isTrending: false,
    });

    const neonDistrict = await storage.createShop({
      name: "Neon District",
      description: "Hypebeast central with limited edition drops and exclusive collabs",
      banner: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=neon",
      location: "Central",
      tags: ["Streetwear", "Hypebeast", "Limited"],
      isTrending: true,
    });

    const pastelDreams = await storage.createShop({
      name: "Pastel Dreams",
      description: "Soft girl aesthetic with kawaii vibes and dreamy pastels",
      banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=pastel",
      location: "North End",
      tags: ["Girly", "Soft Girl", "Kawaii"],
      isTrending: false,
    });

    const sneakerHaven = await storage.createShop({
      name: "Sneaker Haven",
      description: "Authentic sneakers and limited drops from top brands",
      banner: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=sneaker",
      location: "South Plaza",
      tags: ["Sneakers", "Limited Drops", "Authentic"],
      isTrending: true,
    });

    console.log("Shops created successfully");

    // Create products for Urban Threads
    const product1 = await storage.createProduct({
      shopId: urbanThreads.id,
      name: "Neon Wave Hoodie",
      description: "Premium hoodie with neon gradient design, perfect for standing out",
      price: "89.99",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Purple", "Blue"],
      stock: 50,
      category: "Streetwear",
    });

    const product2 = await storage.createProduct({
      shopId: urbanThreads.id,
      name: "Electric Cargo Pants",
      description: "Futuristic cargo pants with reflective details and multiple pockets",
      price: "129.99",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
      images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"],
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Black", "Olive", "Grey"],
      stock: 35,
      category: "Streetwear",
    });

    // Create products for Sneaker Haven
    const product3 = await storage.createProduct({
      shopId: sneakerHaven.id,
      name: "Cyber Runner X1",
      description: "Limited edition sneakers with holographic accents and neon soles",
      price: "199.99",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black/Neon", "White/Purple", "Grey/Blue"],
      stock: 20,
      category: "Sneakers",
    });

    const product4 = await storage.createProduct({
      shopId: sneakerHaven.id,
      name: "Street Kings High-Tops",
      description: "Premium high-top sneakers with leather details and vintage styling",
      price: "149.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "White", "Red"],
      stock: 40,
      category: "Sneakers",
    });

    // Create products for Neon District
    const product5 = await storage.createProduct({
      shopId: neonDistrict.id,
      name: "Hypebeast Bomber Jacket",
      description: "Exclusive bomber jacket with embroidered patches and satin finish",
      price: "249.99",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Burgundy", "Navy"],
      stock: 15,
      category: "Streetwear",
    });

    const product6 = await storage.createProduct({
      shopId: neonDistrict.id,
      name: "Limited Drop Graphic Tee",
      description: "Ultra-limited graphic tee with artist collaboration design",
      price: "59.99",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White"],
      stock: 25,
      category: "Streetwear",
    });

    // Create products for Retro Vibes
    const product7 = await storage.createProduct({
      shopId: retroVibes.id,
      name: "90s Vintage Denim Jacket",
      description: "Authentic vintage denim jacket from the 90s with distressed details",
      price: "79.99",
      image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800",
      images: ["https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800"],
      sizes: ["S", "M", "L"],
      colors: ["Blue Wash", "Black Wash"],
      stock: 8,
      category: "Vintage",
    });

    // Create products for Minimal Studio
    const product8 = await storage.createProduct({
      shopId: minimalStudio.id,
      name: "Essential Minimalist Tee",
      description: "Premium cotton tee with clean lines and perfect fit",
      price: "39.99",
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800",
      images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800"],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Black", "Grey", "Beige"],
      stock: 100,
      category: "Minimal",
    });

    // Create products for Pastel Dreams
    const product9 = await storage.createProduct({
      shopId: pastelDreams.id,
      name: "Kawaii Cloud Hoodie",
      description: "Soft pastel hoodie with cute cloud embroidery and cozy fleece",
      price: "69.99",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
      images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800"],
      sizes: ["XS", "S", "M", "L"],
      colors: ["Pastel Pink", "Baby Blue", "Lavender"],
      stock: 45,
      category: "Girly",
    });

    console.log("Products created successfully");

    // Create flash drops
    const flashDrop1 = await storage.createFlashDrop({
      productId: product5.id,
      limitedQuantity: 15,
      remainingQuantity: 15,
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    });

    const flashDrop2 = await storage.createFlashDrop({
      productId: product3.id,
      limitedQuantity: 20,
      remainingQuantity: 20,
      endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    });

    console.log("Flash drops created successfully");
    console.log("Seed completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed();
