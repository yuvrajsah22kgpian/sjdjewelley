const categories = [
  { name: "Rings", href: "/categories/rings", image: "/images/ring.jpeg" },
  { name: "Pendants", href: "/categories/pendants", image: "/images/pendants.jpg" },
  { name: "Bangles/Bracelets", href: "/categories/bangles", image: "/images/bangles.jpg" },
  { name: "Necklaces", href: "/categories/necklaces", image: "/images/necklaces.jpg" },
  { name: "Earrings", href: "/categories/earrings", image: "/images/earrings.jpg" },
  { name: "Accessories", href: "/categories/accessories", image: "/images/accessories.jpg" },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">
        SHOP BY CATEGORIES
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={cat.href}
            className="group relative border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* Category Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-lg font-medium">
                {cat.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}