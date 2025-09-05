import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  images: { src: string; alt: string }[]
  originalPrice: number
  salePrice: number
  discount: number
  category?: string
  material?: string
  gemstone?: string
  occasion?: string
  inStock?: boolean
  newArrivals?: boolean
  certified?: boolean
  customizable?: boolean
  description?: string
  specifications?: Record<string, string>
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
}

interface SearchState {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    category: string[]
    material: string[]
    gemstone: string[]
    occasion: string[]
    priceMin?: number
    priceMax?: number
    inStock?: boolean
    newArrivals?: boolean
    certified?: boolean
    customizable?: boolean
  }
  setFilters: (filters: Partial<SearchState['filters']>) => void
  clearFilters: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          }
          return {
            items: [...state.items, { ...product, quantity }]
          }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.salePrice * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          if (state.items.find(item => item.id === product.id)) {
            return state; // Already in wishlist
          }
          return {
            items: [...state.items, product]
          }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (productId) => {
        const { items } = get()
        return items.some(item => item.id === productId)
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)

export const useSearchStore = create<SearchState>()((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filters: {
    category: [],
    material: [],
    gemstone: [],
    occasion: [],
  },
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  clearFilters: () => set({
    filters: {
      category: [],
      material: [],
      gemstone: [],
      occasion: [],
    }
  }),
}))
