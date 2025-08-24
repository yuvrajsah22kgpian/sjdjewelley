type StyleCategory = {
  id: number;
  name: string;
  image: string;
  href: string;
};

const styleCategories: StyleCategory[] = [
  { 
    id: 1, 
    name: "Men", 
    image: "/images/men-style.jpg",
    href: "/shop/men"
  },
  { 
    id: 2, 
    name: "Women", 
    image: "/images/women-style.jpg",
    href: "/shop/women"
  },
];

export default function ShopByStyle(){
  return (
    <section className="mb-12">
      <h2 className="text-center text-2xl font-semibold mb-6">SHOP BY STYLE</h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {styleCategories.map((cat) => (
          <a
            key={cat.id}
            href={cat.href}
            className="group relative border rounded-xl overflow-hidden shadow hover:shadow-lg transition w-64"
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
}
