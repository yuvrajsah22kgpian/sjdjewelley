// import { Link } from "react-router-dom";

// const categories = [
//   { 
//     name: "Rings", 
//     href: "/categories/rings", 
//     image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop" 
//   },
//   { 
//     name: "Pendants", 
//     href: "/categories/pendants", 
//     image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=top" 
//   },
//   { 
//     name: "Bangles/Bracelets", 
//     href: "/categories/bangles_bracelets", 
//     image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" 
//   },
//   { 
//     name: "Necklaces", 
//     href: "/categories/necklaces", 
//     image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center" 
//   },
//   { 
//     name: "Earrings", 
//     href: "/categories/earrings", 
//     image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" 
//   },
//   { 
//     name: "Accessories", 
//     href: "/categories/accessories", 
//     image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=center" 
//   },
// ];

// export default function CategoryGrid() {
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-6">
//       <h2 className="text-xl font-semibold text-center mb-4">
//         SHOP BY CATEGORIES
//       </h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {categories.map((cat) => (
//           <Link
//             key={cat.name}
//             to={cat.href}
//             className="group relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
//           >
//             {/* Category Image */}
//             <img
//               src={cat.image}
//               alt={cat.name}
//               className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
//             />
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//               <span className="text-white text-sm font-medium">
//                 {cat.name}
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";

const categories = [
  { 
    name: "Rings", 
    href: "/categories/rings", 
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop" 
  },
  { 
    name: "Pendants", 
    href: "/categories/pendants", 
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=top" 
  },
  { 
    name: "Bangles/Bracelets", 
    href: "/categories/bangles_bracelets", 
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" 
  },
  { 
    name: "Necklaces", 
    href: "/categories/necklaces", 
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center" 
  },
  { 
    name: "Earrings", 
    href: "/categories/earrings", 
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" 
  },
  { 
    name: "Accessories", 
    href: "/categories/accessories", 
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=center" 
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-center mb-6">
        SHOP BY CATEGORIES
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-fit">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="group relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 w-42 h-42"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
      </div>
    </section>
  );
}
