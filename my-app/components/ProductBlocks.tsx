"use client";
import React from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Diamond Ring",
    price: "$499",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Gold Necklace",
    price: "$799",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Silver Bracelet",
    price: "$199",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Earrings Set",
    price: "$299",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
  },
];

export default function ProductBlocks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Featured Products
      </h2>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            {/* Product Info */}
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-3 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}