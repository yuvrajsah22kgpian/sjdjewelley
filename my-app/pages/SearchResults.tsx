import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useSearchStore } from '../src/store/store'
import { searchProducts } from '../src/data/products'
import { ProductCard } from '../components/Card'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const { searchQuery, setSearchQuery } = useSearchStore()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const query = searchParams.get('q') || searchQuery

  useEffect(() => {
    if (query) {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        const results = searchProducts(query, {})
        setProducts(results)
        setLoading(false)
      }, 500)
    }
  }, [query])

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results
                </h1>
                {query && (
                  <p className="text-gray-600">
                    Showing results for "{query}"
                  </p>
                )}
              </div>
              {query && (
                <button
                  onClick={clearSearch}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {products.length} product{products.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </>
          ) : query ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching "{query}"
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Try:</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Checking your spelling</li>
                  <li>• Using more general keywords</li>
                  <li>• Using fewer keywords</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Start searching
              </h2>
              <p className="text-gray-600">
                Use the search bar above to find products
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
