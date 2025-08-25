import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import { useCartStore } from '../src/store/store'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import { ProductCard } from '../src/components/Card'

export default function Wishlist() {
  const { addItem } = useCartStore()
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "Classic Diamond Solitaire Ring",
      images: [
        { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", alt: "Diamond Solitaire Ring" }
      ],
      originalPrice: 2500,
      salePrice: 2000,
      discount: 20,
      category: "rings",
      material: "natural_diamond"
    },
    {
      id: "4",
      name: "Emerald Cut Diamond Necklace",
      images: [
        { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop", alt: "Emerald Cut Diamond Necklace" }
      ],
      originalPrice: 3200,
      salePrice: 2560,
      discount: 20,
      category: "necklaces",
      material: "natural_diamond"
    },
    {
      id: "9",
      name: "Tanzanite Cocktail Ring",
      images: [
        { src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=face", alt: "Tanzanite Cocktail Ring" }
      ],
      originalPrice: 2800,
      salePrice: 2240,
      discount: 20,
      category: "rings",
      material: "tanzanite"
    }
  ])

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId))
  }

  const moveToCart = (product: any) => {
    addItem(product, 1)
    removeFromWishlist(product.id)
  }

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
              onClick={() => {
                wishlistItems.forEach(item => addItem(item, 1))
                setWishlistItems([])
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
