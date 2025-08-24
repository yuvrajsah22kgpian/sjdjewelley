'use client';
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./Card";
import {FilterSidebar}  from "./FilterSidebar";
import Header from "./Header";
import Footer from "./Footer";
import { searchProducts } from "../src/data/products";
import { useSearchStore } from "../src/store/store";

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

// Remove the demo products data as we'll use the real data from products.ts

// Mock API function with proper typing
const mockFetchProductsApi = async (params: ApiParams): Promise<ApiResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { page, filters } = params;
  const pageSize = 12;
  
  // Extract search query from filters
  const searchQuery = (filters as any).searchQuery || '';
  const cleanFilters = { ...filters };
  delete (cleanFilters as any).searchQuery;
  
  // Use the searchProducts function from our data
  const filteredProducts = searchProducts(searchQuery, cleanFilters);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    data: paginatedProducts,
    total: filteredProducts.length
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
  const { searchQuery } = useSearchStore();

  // Fetch products when page, filters, or search query change
  useEffect(() => {
    setLoading(true);
    // Use search query in the API call
    const searchFilters = searchQuery ? { ...filters, searchQuery } : filters;
    mockFetchProductsApi({ page: currentPage, filters: searchFilters })
      .then(res => {
        setProducts(res.data);
        setTotalProducts(res.total);
      })
      .finally(() => setLoading(false));
  }, [currentPage, filters, searchQuery]);

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


