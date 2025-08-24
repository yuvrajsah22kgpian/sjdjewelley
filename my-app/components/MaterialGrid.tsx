import { Link } from "react-router-dom";

const materialCategories= [
  { 
    id: 1, 
    name: 'Natural Diamond Jewelry', 
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=face',
    href: '/material/natural_diamond'
  },
  { 
    id: 2, 
    name: 'Lab Grown Diamond Jewelry', 
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=face',
    href: '/material/lab_grown_diamond'
  },
  { 
    id: 3, 
    name: 'Plain Gold Jewelry', 
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center',
    href: '/material/plain_gold'
  },
];


export default function ShopByMaterial() {
  return (
    <section className="mb-12">
      <h2 className="text-center text-2xl font-semibold mb-6">SHOP BY MATERIAL</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {materialCategories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.href}
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
          </Link>
        ))}
      </div>
    </section>
  );
};

