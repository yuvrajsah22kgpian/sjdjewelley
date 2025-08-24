'use client';
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./Card";
import {FilterSidebar}  from "./FilterSidebar";
import Header from "./Header";
import Footer from "./Footer";

interface ProductImage {
  src: string;
  alt: string;
}

interface Product {
  id: string;
  name: string;
  images: ProductImage[];
  originalPrice: number;
  salePrice: number;
  discount: number;
}

// Define proper filter types
interface Filters {
  category?: string[];
  material?: string[];
  gemstone?: string[];
  occasion?: string[];
  discount?: number[];
  priceMin?: number;
  priceMax?: number;
  customPriceMin?: number;
  customPriceMax?: number;
  inStock?: boolean;
  newArrivals?: boolean;
  certified?: boolean;
  customizable?: boolean;
}

interface Props {
  heroLine1: string;
  heroLine2?: string;
  defaultExpandedFilter: string;
  pageSize?: number; // default is 12
  defaultFilters?: Filters; // Changed from Record<string, any>
}

// API response type
interface ApiResponse {
  data: Product[];
  total: number;
}

// API parameters type
interface ApiParams {
  page: number;
  filters: Filters;
}

const PAGE_BUTTONS_AROUND = 2; // How many page numbers to show around current

// Demo Products Data
const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Diamond Solitaire Ring",
    images: [{ src: "/api/placeholder/300/300", alt: "Diamond Solitaire Ring" }],
    originalPrice: 2500,
    salePrice: 2000,
    discount: 20
  },
  {
    id: "2", 
    name: "Pearl Drop Earrings",
    images: [{ src: "/api/placeholder/300/300", alt: "Pearl Drop Earrings" }],
    originalPrice: 850,
    salePrice: 680,
    discount: 20
  },
  {
    id: "3",
    name: "Gold Tennis Bracelet",
    images: [{ src: "/api/placeholder/300/300", alt: "Gold Tennis Bracelet" }],
    originalPrice: 1200,
    salePrice: 960,
    discount: 20
  },
  {
    id: "4",
    name: "Emerald Cut Diamond Necklace",
    images: [{ src: "/api/placeholder/300/300", alt: "Emerald Cut Diamond Necklace" }],
    originalPrice: 3200,
    salePrice: 2560,
    discount: 20
  },
  {
    id: "5",
    name: "Vintage Ruby Ring",
    images: [{ src: "/api/placeholder/300/300", alt: "Vintage Ruby Ring" }],
    originalPrice: 1800,
    salePrice: 1440,
    discount: 20
  },
  {
    id: "6",
    name: "Sapphire Stud Earrings",
    images: [{ src: "/api/placeholder/300/300", alt: "Sapphire Stud Earrings" }],
    originalPrice: 950,
    salePrice: 760,
    discount: 20
  },
  {
    id: "7",
    name: "Diamond Eternity Band",
    images: [{ src: "/api/placeholder/300/300", alt: "Diamond Eternity Band" }],
    originalPrice: 2200,
    salePrice: 1760,
    discount: 20
  },
  {
    id: "8",
    name: "White Gold Chain Necklace",
    images: [{ src: "/api/placeholder/300/300", alt: "White Gold Chain Necklace" }],
    originalPrice: 650,
    salePrice: 520,
    discount: 20
  },
  {
    id: "9",
    name: "Tanzanite Cocktail Ring",
    images: [{ src: "/api/placeholder/300/300", alt: "Tanzanite Cocktail Ring" }],
    originalPrice: 2800,
    salePrice: 2240,
    discount: 20
  },
  {
    id: "10",
    name: "Diamond Halo Pendant",
    images: [{ src: "/api/placeholder/300/300", alt: "Diamond Halo Pendant" }],
    originalPrice: 1500,
    salePrice: 1200,
    discount: 20
  },
  {
    id: "11",
    name: "Rose Gold Bangle",
    images: [{ src: "/api/placeholder/300/300", alt: "Rose Gold Bangle" }],
    originalPrice: 750,
    salePrice: 600,
    discount: 20
  },
  {
    id: "12",
    name: "Aquamarine Drop Earrings",
    images: [{ src: "/api/placeholder/300/300", alt: "Aquamarine Drop Earrings" }],
    originalPrice: 1100,
    salePrice: 880,
    discount: 20
  },
  {
    id: "13",
    name: "Princess Cut Diamond Ring",
    images: [{ src: "/api/placeholder/300/300", alt: "Princess Cut Diamond Ring" }],
    originalPrice: 3500,
    salePrice: 2800,
    discount: 20
  },
  {
    id: "14",
    name: "Platinum Wedding Band",
    images: [{ src: "/api/placeholder/300/300", alt: "Platinum Wedding Band" }],
    originalPrice: 900,
    salePrice: 720,
    discount: 20
  },
  {
    id: "15",
    name: "Garnet Statement Necklace",
    images: [{ src: "/api/placeholder/300/300", alt: "Garnet Statement Necklace" }],
    originalPrice: 1300,
    salePrice: 1040,
    discount: 20
  },
  {
    id: "16",
    name: "Diamond Tennis Necklace",
    images: [{ src: "/api/placeholder/300/300", alt: "Diamond Tennis Necklace" }],
    originalPrice: 4200,
    salePrice: 3360,
    discount: 20
  },
  {
    id: "17",
    name: "Citrine Chandelier Earrings",
    images: [{ src: "/api/placeholder/300/300", alt: "Citrine Chandelier Earrings" }],
    originalPrice: 850,
    salePrice: 680,
    discount: 20
  },
  {
    id: "18",
    name: "Art Deco Diamond Brooch",
    images: [{ src: "/api/placeholder/300/300", alt: "Art Deco Diamond Brooch" }],
    originalPrice: 2600,
    salePrice: 2080,
    discount: 20
  },
  {
    id: "19",
    name: "Moonstone Stackable Rings",
    images: [{ src: "/api/placeholder/300/300", alt: "Moonstone Stackable Rings" }],
    originalPrice: 600,
    salePrice: 480,
    discount: 20
  },
  {
    id: "20",
    name: "Opal Pendant Necklace",
    images: [{ src: "/api/placeholder/300/300", alt: "Opal Pendant Necklace" }],
    originalPrice: 1050,
    salePrice: 840,
    discount: 20
  }
];

// Mock API function with proper typing
const mockFetchProductsApi = async (params: ApiParams): Promise<ApiResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { page } = params;
  const pageSize = 12;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const paginatedProducts = DEMO_PRODUCTS.slice(startIndex, endIndex);
  
  return {
    data: paginatedProducts,
    total: DEMO_PRODUCTS.length
  };
};

export default function ProductsPage({
  heroLine1,
  heroLine2,
  defaultExpandedFilter,
  pageSize = 12,
  defaultFilters = {}
}: Props) {
  // State for sidebar, pagination, filters, data
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  // Fetch products when page or filters change
  useEffect(() => {
    setLoading(true);
    mockFetchProductsApi({ page: currentPage, filters })
      .then(res => {
        setProducts(res.data);
        setTotalProducts(res.total);
      })
      .finally(() => setLoading(false));
  }, [currentPage, filters]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  // PAGINATION BUTTON GENERATION (show max 5 buttons for example)
  const getPageButtons = (): number[] => {
    const pages: number[] = [];
    const left = Math.max(1, currentPage - PAGE_BUTTONS_AROUND);
    const right = Math.min(totalPages, currentPage + PAGE_BUTTONS_AROUND);
    for (let i = left; i <= right; i++) pages.push(i);
    return pages;
  };

  // Check if we're on client side for responsive sidebar
  const isClient = typeof window !== "undefined";
  const showSidebarOnDesktop = !isClient || window.innerWidth >= 768;

  // Responsive grid: sm: 1, md: 2, lg: 4 cols
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
            <div className="text-sm text-gray-400 mb-3">
              <span>Home</span> / <span>Natural Diamond Jewelry</span>
            </div>
            <h1 className="text-3xl font-bold mb-1">{heroLine1}</h1>
            {heroLine2 && <p className="text-gray-500 text-base">{heroLine2}</p>}
          </div>
        </section>

        {/* Filters, Sort, Pagination */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 flex gap-4">
          {/* Filter button and sidebar */}
          <div className="block md:hidden mb-2">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-medium"
              onClick={() => setShowFilters(f => !f)}
              type="button"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Sidebar: always rendered on desktop, toggled on mobile */}
          {(showFilters || showSidebarOnDesktop) && (
            <aside className="hidden md:block w-64 shrink-0">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                defaultExpandedOption={defaultExpandedFilter}
              />
            </aside>
          )}

          {showFilters && (
            <aside className="md:hidden fixed inset-0 z-40 bg-black/50 flex">
              <div className="w-72 max-w-xs bg-white shadow-lg h-full">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  defaultExpandedOption={defaultExpandedFilter}
                  onClose={() => setShowFilters(false)}
                />
              </div>
              <div 
                className="flex-1" 
                onClick={() => setShowFilters(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowFilters(false);
                  }
                }}
                aria-label="Close filters"
              />
            </aside>
          )}

          {/* Main content: products grid */}
          <div className="flex-1 min-w-0">
            {/* Top controls (filters, pagination, sort) */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-6">
                <button
                  className="flex md:hidden items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white font-medium"
                  onClick={() => setShowFilters(f => !f)}
                  type="button"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
                <div className="hidden md:block">
                  <span className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalProducts)} of {totalProducts} products
                  </span>
                </div>
              </div>

              {/* Pagination Buttons */}
              <nav className="flex items-center gap-1">
                <button
                  className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  aria-label="Previous Page"
                >
                  <ChevronLeft />
                </button>
                {getPageButtons().map(num => (
                  <button
                    key={num}
                    className={`px-3 py-2 rounded ${
                      currentPage === num
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  aria-label="Next Page"
                >
                  <ChevronRight />
                </button>
              </nav>

              {/* Sort dropdown */}
              <div>
                <select className="border border-gray-200 rounded px-3 py-2 text-sm">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: pageSize }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-white rounded-lg min-h-[320px] border"
                    />
                  ))
                : products.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))}
            </div>

            {/* Load More or Pagination again */}
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-8 py-2 rounded border bg-white shadow text-base font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages || loading}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
// update the code


