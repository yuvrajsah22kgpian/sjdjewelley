"use client";

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
    image: "/images/product1.jpg", // replace with your test image
  },
  {
    id: 2,
    name: "Gold Necklace",
    price: "$799",
    image: "/images/product2.jpg",
  },
  {
    id: 3,
    name: "Silver Bracelet",
    price: "$199",
    image: "/images/product3.jpg",
  },
  {
    id: 4,
    name: "Earrings Set",
    price: "$299",
    image: "/images/product4.jpg",
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