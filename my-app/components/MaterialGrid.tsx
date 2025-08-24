const materialCategories= [
  { 
    id: 1, 
    name: 'Natural Diamond Jewelry', 
    image: '/images/natural-diamond.jpg',
    href: '/material/lab_grown_diamond'
  },
  { 
    id: 2, 
    name: 'Lab Grown Diamond Jewelry', 
    image: '/images/lab-grown-diamond.jpg',
    href: '/shop/lab-grown-diamond'
  },
  { 
    id: 3, 
    name: 'Plain Gold Jewelry', 
    image: '/images/plain-gold.jpg',
    href: '/shop/plain-gold'
  },
];


export default function ShopByMaterial() {
  return (
    <section className="mb-12">
      <h2 className="text-center text-2xl font-semibold mb-6">SHOP BY MATERIAL</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {materialCategories.map((cat) => (
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
              <span className="text-white text-lg font-medium text-center px-2">
                {cat.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

