"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  original_price: number;
  sale_price: number;
  discount: number;
  category: string;
  material: string;
  gemstone: string;
  occasion: string;
  in_stock: boolean;
  new_arrivals: boolean;
  certified: boolean;
  customizable: boolean;
  images: Array<{
    id: number;
    src: string;
    alt: string;
    is_primary: boolean;
  }>;
}

interface SelectedFilters {
  [key: string]: string[];
}

interface FilteredProductsProps {
  filters: SelectedFilters;
  onClearFilters?: () => void;
}

export default function FilteredProducts({ filters, onClearFilters }: FilteredProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query parameters from filters
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          // Join multiple values with commas for the backend
          params.append(key, values.join(','));
        }
      });

      const response = await fetch(`http://localhost:8000/products/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching filtered products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTotalSelectedCount = (): number => {
    return Object.values(filters).reduce((total, section) => total + section.length, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getFilterDisplayName = (key: string, value: string): string => {
    const filterLabels: { [key: string]: { [key: string]: string } } = {
      material: {
        'gold': 'Gold',
        'silver': 'Silver',
        'diamond': 'Diamond',
        'natural_diamond': 'Natural Diamond',
        'lab_grown_diamond': 'Lab Grown Diamond',
        'pearl': 'Pearl'
      },
      category: {
        'rings': 'Rings',
        'earrings': 'Earrings',
        'necklaces': 'Necklaces',
        'pendants': 'Pendants',
        'bangles_bracelets': 'Bangles/Bracelets',
        'accessories': 'Accessories'
      },
      metalType: {
        '10k': '10k',
        '14k': '14k',
        '18k': '18k',
        'sterling_silver': 'Sterling Silver',
        'platinum': 'Platinum'
      },
      metalTones: {
        'yellow_gold': 'Yellow Gold',
        'white_gold': 'White Gold',
        'rose_gold': 'Rose Gold',
        'two_tone': 'Two Tone',
        'silver': 'Silver'
      },
      diamondWeight: {
        'lt-0.25': '<0.25 CT',
        '0.25': '0.25 CT',
        '0.50': '0.50 CT',
        '0.75': '0.75 CT',
        '1.00': '1.00 CT',
        '1.50': '1.50 CT',
        '2.00': '2.00 CT',
        'gt-2.00': '>2.00 CT'
      },
      priceRange: {
        'under-100': 'Under $100',
        '100-500': '$100 - $500',
        '500-1000': '$500 - $1000',
        '1000-2500': '$1000 - $2500',
        'over-2500': 'Over $2500'
      }
    };
    
    return filterLabels[key]?.[value] || value;
  };

  if (loading) {
    return (
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Filtered Products</h2>
          <div className="text-sm text-gray-500">
            {getTotalSelectedCount()} filter(s) applied
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Filtered Products</h2>
          <div className="text-sm text-gray-500">
            {getTotalSelectedCount()} filter(s) applied
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">{error}</p>
          <button 
            onClick={fetchFilteredProducts}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Filtered Products</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {products.length} product(s) found • {getTotalSelectedCount()} filter(s) applied
          </span>
          {onClearFilters && getTotalSelectedCount() > 0 && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {getTotalSelectedCount() > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, values]) =>
            values.map((value) => (
              <span
                key={`${key}-${value}`}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
              >
                {getFilterDisplayName(key, value)}
              </span>
            ))
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-2">No products found matching your filters.</p>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your filter criteria.</p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0].src : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop"}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.new_arrivals && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {product.certified && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Certified
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2 truncate">
                  {product.category} • {product.material}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {formatPrice(product.sale_price)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={!product.in_stock}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
