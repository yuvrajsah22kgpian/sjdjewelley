import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import { useCartStore, useAuthStore } from '../src/store/store'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import { ProductCard } from '../src/components/Card'
import apiService from '../src/services/api'

export default function Wishlist() {
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load wishlist from backend
  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const loadWishlist = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiService.getWishlist()
      if (response.data) {
        // Transform backend data to frontend format
        const transformedItems = response.data.map((item: any) => ({
          id: item.product.id.toString(),
          name: item.product.name,
          images: item.product.images?.map((img: any) => ({
            src: img.src,
            alt: img.alt || item.product.name
          })) || [{ src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", alt: item.product.name }],
          originalPrice: item.product.original_price,
          salePrice: item.product.sale_price,
          discount: item.product.discount,
          category: item.product.category,
          material: item.product.material,
          gemstone: item.product.gemstone,
          occasion: item.product.occasion,
          inStock: item.product.in_stock,
          newArrivals: item.product.new_arrivals,
          certified: item.product.certified,
          customizable: item.product.customizable,
          description: item.product.description,
          specifications: item.product.specifications
        }))
        setWishlistItems(transformedItems)
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error)
      setError('Failed to load wishlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await apiService.removeFromWishlist(parseInt(productId))
      if (response.data || response.error === undefined) {
        setWishlistItems(items => items.filter(item => item.id !== productId))
      } else {
        throw new Error(response.error || 'Failed to remove item')
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
      alert('Failed to remove item from wishlist. Please try again.')
    }
  }

  const moveToCart = (product: any) => {
    addItem(product, 1)
    removeFromWishlist(product.id)
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in to view your wishlist</h1>
            <p className="text-gray-600 mb-8">Sign in to save items to your wishlist and access them from any device.</p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Loading your wishlist...</h1>
            <p className="text-gray-600">Please wait while we fetch your saved items.</p>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <Heart className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={loadWishlist}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // Show empty wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">Start adding items to your wishlist to save them for later.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mr-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <span className="ml-3 text-sm text-gray-500">({wishlistItems.length} items)</span>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative">
                <ProductCard {...item} />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    title="Move to cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={async () => {
                try {
                  // Add all items to cart
                  wishlistItems.forEach(item => addItem(item, 1))
                  
                  // Remove all items from wishlist in backend
                  const removePromises = wishlistItems.map(item => 
                    apiService.removeFromWishlist(parseInt(item.id))
                  )
                  await Promise.all(removePromises)
                  
                  // Clear local state
                  setWishlistItems([])
                } catch (error) {
                  console.error('Failed to move all items to cart:', error)
                  alert('Some items could not be moved to cart. Please try again.')
                }
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Move All to Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
