import { Product } from '../store/store'

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Diamond Solitaire Ring",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", alt: "Diamond Solitaire Ring" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=face", alt: "Diamond Solitaire Ring Side View" }
    ],
    originalPrice: 2500,
    salePrice: 2000,
    discount: 20,
    category: "rings",
    material: "natural_diamond",
    gemstone: "diamond",
    occasion: "engagement",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: true,
    description: "A timeless classic featuring a brilliant-cut diamond set in 18k white gold. Perfect for engagement or special occasions.",
    specifications: {
      "Diamond Weight": "1.5 carats",
      "Diamond Cut": "Round Brilliant",
      "Diamond Color": "F",
      "Diamond Clarity": "VS1",
      "Metal": "18k White Gold",
      "Ring Size": "6.5"
    }
  },
  {
    id: "2",
    name: "Pearl Drop Earrings",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", alt: "Pearl Drop Earrings" }
    ],
    originalPrice: 850,
    salePrice: 680,
    discount: 20,
    category: "earrings",
    material: "pearl",
    gemstone: "pearl",
    occasion: "formal",
    inStock: true,
    newArrivals: false,
    certified: false,
    customizable: false,
    description: "Elegant freshwater pearl drop earrings with sterling silver findings. Perfect for formal occasions.",
    specifications: {
      "Pearl Type": "Freshwater",
      "Pearl Size": "8mm",
      "Metal": "Sterling Silver",
      "Clasp Type": "Leverback"
    }
  },
  {
    id: "3",
    name: "Gold Tennis Bracelet",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop", alt: "Gold Tennis Bracelet" }
    ],
    originalPrice: 1200,
    salePrice: 960,
    discount: 20,
    category: "bangles_bracelets",
    material: "gold",
    gemstone: "diamond",
    occasion: "casual",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: true,
    description: "Classic tennis bracelet featuring round diamonds set in 14k yellow gold. A versatile piece for any occasion.",
    specifications: {
      "Diamond Weight": "2.0 carats total",
      "Diamond Cut": "Round Brilliant",
      "Metal": "14k Yellow Gold",
      "Length": "7.5 inches",
      "Clasp": "Lobster"
    }
  },
  {
    id: "4",
    name: "Emerald Cut Diamond Necklace",
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop", alt: "Emerald Cut Diamond Necklace" }
    ],
    originalPrice: 3200,
    salePrice: 2560,
    discount: 20,
    category: "necklaces",
    material: "natural_diamond",
    gemstone: "diamond",
    occasion: "formal",
    inStock: true,
    newArrivals: true,
    certified: true,
    customizable: true,
    description: "Stunning emerald-cut diamond pendant on a delicate chain. The geometric cut showcases the diamond's clarity and brilliance.",
    specifications: {
      "Diamond Weight": "2.5 carats",
      "Diamond Cut": "Emerald",
      "Diamond Color": "G",
      "Diamond Clarity": "VS2",
      "Metal": "18k White Gold",
      "Chain Length": "18 inches"
    }
  },
  {
    id: "5",
    name: "Vintage Ruby Ring",
    images: [
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop", alt: "Vintage Ruby Ring" }
    ],
    originalPrice: 1800,
    salePrice: 1440,
    discount: 20,
    category: "rings",
    material: "ruby",
    gemstone: "ruby",
    occasion: "vintage",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: false,
    description: "Vintage-inspired ruby ring with intricate filigree work. Features a deep red ruby surrounded by accent diamonds.",
    specifications: {
      "Ruby Weight": "1.8 carats",
      "Ruby Origin": "Burma",
      "Accent Diamonds": "0.5 carats total",
      "Metal": "18k Yellow Gold",
      "Ring Size": "7"
    }
  },
  {
    id: "6",
    name: "Sapphire Stud Earrings",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=face", alt: "Sapphire Stud Earrings" }
    ],
    originalPrice: 950,
    salePrice: 760,
    discount: 20,
    category: "earrings",
    material: "sapphire",
    gemstone: "sapphire",
    occasion: "casual",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: true,
    description: "Classic sapphire stud earrings in 14k white gold. The deep blue sapphires are perfect for everyday wear.",
    specifications: {
      "Sapphire Weight": "1.2 carats total",
      "Sapphire Color": "Royal Blue",
      "Metal": "14k White Gold",
      "Back Type": "Push Back"
    }
  },
  {
    id: "7",
    name: "Diamond Eternity Band",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=top", alt: "Diamond Eternity Band" }
    ],
    originalPrice: 2200,
    salePrice: 1760,
    discount: 20,
    category: "rings",
    material: "natural_diamond",
    gemstone: "diamond",
    occasion: "wedding",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: true,
    description: "Elegant eternity band with diamonds set all around. Perfect as a wedding band or anniversary gift.",
    specifications: {
      "Diamond Weight": "1.8 carats total",
      "Diamond Cut": "Round Brilliant",
      "Metal": "18k White Gold",
      "Ring Size": "6.5",
      "Setting": "Channel"
    }
  },
  {
    id: "8",
    name: "White Gold Chain Necklace",
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center", alt: "White Gold Chain Necklace" }
    ],
    originalPrice: 650,
    salePrice: 520,
    discount: 20,
    category: "necklaces",
    material: "gold",
    gemstone: "none",
    occasion: "casual",
    inStock: true,
    newArrivals: false,
    certified: false,
    customizable: true,
    description: "Simple and elegant white gold chain necklace. Perfect for layering or wearing alone.",
    specifications: {
      "Metal": "14k White Gold",
      "Length": "18 inches",
      "Width": "2mm",
      "Clasp": "Lobster"
    }
  },
  {
    id: "9",
    name: "Tanzanite Cocktail Ring",
    images: [
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=face", alt: "Tanzanite Cocktail Ring" }
    ],
    originalPrice: 2800,
    salePrice: 2240,
    discount: 20,
    category: "rings",
    material: "tanzanite",
    gemstone: "tanzanite",
    occasion: "cocktail",
    inStock: true,
    newArrivals: true,
    certified: true,
    customizable: true,
    description: "Stunning tanzanite cocktail ring with a large oval-cut stone. The rare blue-violet color is mesmerizing.",
    specifications: {
      "Tanzanite Weight": "3.2 carats",
      "Tanzanite Cut": "Oval",
      "Metal": "18k White Gold",
      "Ring Size": "7",
      "Setting": "Prong"
    }
  },
  {
    id: "10",
    name: "Diamond Halo Pendant",
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=top", alt: "Diamond Halo Pendant" }
    ],
    originalPrice: 1500,
    salePrice: 1200,
    discount: 20,
    category: "pendants",
    material: "natural_diamond",
    gemstone: "diamond",
    occasion: "gift",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: true,
    description: "Beautiful diamond halo pendant featuring a center stone surrounded by smaller diamonds. Comes with a matching chain.",
    specifications: {
      "Center Diamond": "0.5 carats",
      "Halo Diamonds": "0.3 carats total",
      "Metal": "14k White Gold",
      "Chain Length": "18 inches"
    }
  },
  {
    id: "11",
    name: "Rose Gold Bangle",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center", alt: "Rose Gold Bangle" }
    ],
    originalPrice: 750,
    salePrice: 600,
    discount: 20,
    category: "bangles_bracelets",
    material: "gold",
    gemstone: "none",
    occasion: "casual",
    inStock: true,
    newArrivals: false,
    certified: false,
    customizable: true,
    description: "Elegant rose gold bangle with a modern design. Perfect for stacking or wearing alone.",
    specifications: {
      "Metal": "14k Rose Gold",
      "Width": "4mm",
      "Diameter": "2.5 inches",
      "Finish": "Polished"
    }
  },
  {
    id: "12",
    name: "Aquamarine Drop Earrings",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=bottom", alt: "Aquamarine Drop Earrings" }
    ],
    originalPrice: 1100,
    salePrice: 880,
    discount: 20,
    category: "earrings",
    material: "aquamarine",
    gemstone: "aquamarine",
    occasion: "spring",
    inStock: true,
    newArrivals: true,
    certified: true,
    customizable: false,
    description: "Delicate aquamarine drop earrings with a soft blue color reminiscent of the ocean. Perfect for spring and summer.",
    specifications: {
      "Aquamarine Weight": "1.5 carats total",
      "Aquamarine Cut": "Pear",
      "Metal": "14k White Gold",
      "Length": "1.5 inches"
    }
  },
  {
    id: "13",
    name: "Princess Cut Diamond Ring",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=face", alt: "Princess Cut Diamond Ring" }
    ],
    originalPrice: 3500,
    salePrice: 2800,
    discount: 20,
    category: "rings",
    material: "natural_diamond",
    gemstone: "diamond",
    occasion: "engagement",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: true,
    description: "Modern princess-cut diamond ring with a square shape and brilliant sparkle. Set in platinum for durability.",
    specifications: {
      "Diamond Weight": "2.0 carats",
      "Diamond Cut": "Princess",
      "Diamond Color": "E",
      "Diamond Clarity": "VS1",
      "Metal": "Platinum",
      "Ring Size": "6.5"
    }
  },
  {
    id: "14",
    name: "Platinum Wedding Band",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=side", alt: "Platinum Wedding Band" }
    ],
    originalPrice: 900,
    salePrice: 720,
    discount: 20,
    category: "rings",
    material: "platinum",
    gemstone: "none",
    occasion: "wedding",
    inStock: true,
    newArrivals: false,
    certified: false,
    customizable: true,
    description: "Classic platinum wedding band with a comfort fit. The perfect complement to any engagement ring.",
    specifications: {
      "Metal": "Platinum",
      "Width": "3mm",
      "Ring Size": "7",
      "Finish": "Polished"
    }
  },
  {
    id: "15",
    name: "Garnet Statement Necklace",
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center", alt: "Garnet Statement Necklace" }
    ],
    originalPrice: 1300,
    salePrice: 1040,
    discount: 20,
    category: "necklaces",
    material: "garnet",
    gemstone: "garnet",
    occasion: "holiday",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: false,
    description: "Bold garnet statement necklace with multiple stones in a vintage-inspired design. Perfect for holiday parties.",
    specifications: {
      "Garnet Weight": "8.5 carats total",
      "Garnet Cut": "Mixed",
      "Metal": "18k Yellow Gold",
      "Length": "20 inches"
    }
  },
  {
    id: "16",
    name: "Diamond Tennis Necklace",
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=top", alt: "Diamond Tennis Necklace" }
    ],
    originalPrice: 4200,
    salePrice: 3360,
    discount: 20,
    category: "necklaces",
    material: "natural_diamond",
    gemstone: "diamond",
    occasion: "luxury",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: true,
    description: "Luxurious diamond tennis necklace with uniform stones set in white gold. A true statement piece.",
    specifications: {
      "Diamond Weight": "5.0 carats total",
      "Diamond Cut": "Round Brilliant",
      "Metal": "18k White Gold",
      "Length": "18 inches",
      "Clasp": "Lobster"
    }
  },
  {
    id: "17",
    name: "Citrine Chandelier Earrings",
    images: [
      { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=bottom", alt: "Citrine Chandelier Earrings" }
    ],
    originalPrice: 850,
    salePrice: 680,
    discount: 20,
    category: "earrings",
    material: "citrine",
    gemstone: "citrine",
    occasion: "evening",
    inStock: true,
    newArrivals: false,
    certified: false,
    customizable: true,
    description: "Dramatic citrine chandelier earrings with multiple drops. The warm yellow color adds a sunny disposition.",
    specifications: {
      "Citrine Weight": "3.2 carats total",
      "Citrine Cut": "Mixed",
      "Metal": "14k Yellow Gold",
      "Length": "2.5 inches"
    }
  },
  {
    id: "18",
    name: "Art Deco Diamond Brooch",
    images: [
      { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=center", alt: "Art Deco Diamond Brooch" }
    ],
    originalPrice: 2600,
    salePrice: 2080,
    discount: 20,
    category: "accessories",
    material: "natural_diamond",
    gemstone: "diamond",
    occasion: "vintage",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: false,
    description: "Exquisite Art Deco diamond brooch with geometric patterns and filigree work. A true collector's piece.",
    specifications: {
      "Diamond Weight": "2.8 carats total",
      "Diamond Cut": "Mixed",
      "Metal": "18k White Gold",
      "Size": "2.5 x 1.5 inches",
      "Clasp": "Safety"
    }
  },
  {
    id: "19",
    name: "Moonstone Stackable Rings",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=stack", alt: "Moonstone Stackable Rings" }
    ],
    originalPrice: 600,
    salePrice: 480,
    discount: 20,
    category: "rings",
    material: "moonstone",
    gemstone: "moonstone",
    occasion: "bohemian",
    inStock: true,
    newArrivals: true,
    certified: false,
    customizable: true,
    description: "Set of three moonstone stackable rings with an ethereal blue sheen. Perfect for the bohemian spirit.",
    specifications: {
      "Moonstone Weight": "1.5 carats total",
      "Metal": "Sterling Silver",
      "Ring Sizes": "6, 7, 8",
      "Finish": "Oxidized"
    }
  },
  {
    id: "20",
    name: "Opal Pendant Necklace",
    images: [
      { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center", alt: "Opal Pendant Necklace" }
    ],
    originalPrice: 1050,
    salePrice: 840,
    discount: 20,
    category: "pendants",
    material: "opal",
    gemstone: "opal",
    occasion: "unique",
    inStock: true,
    newArrivals: false,
    certified: true,
    customizable: false,
    description: "Unique opal pendant with a play of color that changes with the light. Each opal is one of a kind.",
    specifications: {
      "Opal Weight": "2.1 carats",
      "Opal Type": "Australian",
      "Metal": "14k Yellow Gold",
      "Chain Length": "18 inches"
    }
  }
]

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category)
}

export const getProductsByMaterial = (material: string) => {
  return products.filter(product => product.material === material)
}

export const getProductsByOccasion = (occasion: string) => {
  return products.filter(product => product.occasion === occasion)
}

export const getProductById = (id: string) => {
  return products.find(product => product.id === id)
}

export const searchProducts = (query: string, filters: any = {}) => {
  let filteredProducts = products

  // Apply search query
  if (query) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase()) ||
      product.material?.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Apply filters
  if (filters.category && filters.category.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.category.includes(product.category)
    )
  }

  if (filters.material && filters.material.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.material.includes(product.material)
    )
  }

  if (filters.gemstone && filters.gemstone.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.gemstone.includes(product.gemstone)
    )
  }

  if (filters.occasion && filters.occasion.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.occasion.includes(product.occasion)
    )
  }

  if (filters.priceMin !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.salePrice >= filters.priceMin
    )
  }

  if (filters.priceMax !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.salePrice <= filters.priceMax
    )
  }

  if (filters.inStock !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.inStock === filters.inStock
    )
  }

  if (filters.newArrivals !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.newArrivals === filters.newArrivals
    )
  }

  if (filters.certified !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.certified === filters.certified
    )
  }

  if (filters.customizable !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.customizable === filters.customizable
    )
  }

  return filteredProducts
}
