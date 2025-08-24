import { useState, useEffect, Suspense, lazy } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopByMaterial from "../components/MaterialGrid";
import ShopByStyle from "../components/Stylegrid";
import CategoryGrid from "../components/CategoryGrid";
import FilteredProducts from "../components/FilteredProducts";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Lazy load FilterPanel (like Next.js dynamic import)
const FilterPanel = lazy(() => import("../components/FilterPanel"));

interface SelectedFilters {
  [key: string]: string[];
}

export default function landingpage() {
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    material: [],
    category: [],
    metalType: [],
    metalTones: [],
    diamondWeight: [],
    priceRange: []
  });
  const [showFilteredProducts, setShowFilteredProducts] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: SelectedFilters) => {
    setSelectedFilters(newFilters);
    // Show filtered products if any filters are selected
    const hasFilters = Object.values(newFilters).some(filters => filters.length > 0);
    setShowFilteredProducts(hasFilters);
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
    setShowFilteredProducts(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
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
          {/* Filtered Products Section */}
          {showFilteredProducts && (
            <div className="px-4 md:px-6 pb-3">
              <FilteredProducts filters={selectedFilters} onClearFilters={clearFilters} />
            </div>
          )}

          {/* Category Sections - Only show when no filters are active */}
          {!showFilteredProducts && (
            <>
              <div className="px-4 md:px-6 pb-3">
                <ShopByMaterial />
              </div>
              <div className="px-4 md:px-6 pb-3">
                <ShopByStyle />
              </div>
              <div className="px-4 md:px-6 pb-3">
                <CategoryGrid />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
