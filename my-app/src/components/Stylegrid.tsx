import { Link } from "react-router-dom";

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
    // image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    image:"src/assets/images/Ring1.jpeg",
    href: "/style/men"
  },
  { 
    id: 2, 
    name: "Women", 
    image: "https://images.unsplash.com/photo-1586297098710-0382a496c814?w=400&h=400&fit=crop&crop=face",
    href: "/style/women"
  },
];

export default function ShopByStyle(){
  return (
    <section className="mb-6">
      <h2 className="text-center text-xl font-semibold mb-4">SHOP BY STYLE</h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {styleCategories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.href}
            className="group relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition w-42 h-42"
          >
            {/* Category Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-sm font-medium text-center px-2">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
