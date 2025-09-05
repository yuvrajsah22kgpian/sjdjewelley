'use client';
import React, { useState, useEffect, Suspense, lazy } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import { searchProducts } from "../data/products";
import { useSearchStore } from "../store/store";

// Lazy load FilterPanel (like Next.js dynamic import)
const FilterPanel = lazy(() => import("./FilterPanel"));

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

// Define proper filter types to match FilterPanel
interface SelectedFilters {
  [key: string]: string[];
}

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

// Real API function using the backend
const fetchProductsApi = async (params: ApiParams): Promise<ApiResponse> => {
  const { page, filters } = params;
  const pageSize = 8;
  
  try {
    // Extract search query from filters
    const searchQuery = (filters as any).searchQuery || '';
    const cleanFilters = { ...filters };
    delete (cleanFilters as any).searchQuery;
    
    // Use the searchProducts function from our API service
    const filteredProducts = await searchProducts(searchQuery, cleanFilters);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      data: paginatedProducts,
      total: filteredProducts.length
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      data: [],
      total: 0
    };
  }
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
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    material: [],
    category: [],
    metalType: [],
    metalTones: [],
    diamondWeight: [],
    priceRange: []
  });
  const { searchQuery } = useSearchStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: SelectedFilters) => {
    setSelectedFilters(newFilters);
    // Convert FilterPanel format to our API format
    const apiFilters: Filters = {
      ...filters,
      category: newFilters.category,
      material: newFilters.material,
      // Add other filter mappings as needed
    };
    setFilters(apiFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      material: [],
      category: [],
      metalType: [],
      metalTones: [],
      diamondWeight: [],
      priceRange: []
    });
    setFilters(defaultFilters);
  };

  // Fetch products when page, filters, or search query change
  useEffect(() => {
    setLoading(true);
    // Use search query in the API call
    const searchFilters = searchQuery ? { ...filters, searchQuery } : filters;
    fetchProductsApi({ page: currentPage, filters: searchFilters })
      .then(res => {
        setProducts(res.data);
        setTotalProducts(res.total);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
        setTotalProducts(0);
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

  // Responsive grid: sm: 1, md: 2, lg: 4 cols
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {mounted && showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-3 p-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                }
              >
                <FilterPanel 
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col md:flex-row flex-1 bg-[#92bce03b]">
        {/* Desktop Filters */}
        <div className="w-full max-w-xs mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden h-fit md:sticky md:top-6">
          <Suspense
            fallback={
              <div className="animate-pulse space-y-3 p-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            }
          >
            <FilterPanel 
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </Suspense>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Hero section */}
          <section className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
              <div className="text-sm text-gray-400 mb-3">
                <span>Home</span> / <span>{heroLine1}</span>
              </div>
              <h1 className="text-3xl font-bold mb-1">{heroLine1}</h1>
              {heroLine2 && <p className="text-gray-500 text-base">{heroLine2}</p>}
            </div>
          </section>

          {/* Products Section */}
          <div className="px-4 md:px-6 pb-3">
            {/* Top controls (pagination, sort) */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-6">
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


