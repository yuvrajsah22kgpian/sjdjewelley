import { Product } from '../store/store'

// API base URL
const API_BASE_URL = 'http://localhost:8000'

// API service functions
export const apiService = {
  // Get all products with optional filters
  async getProducts(filters?: {
    category?: string
    material?: string
    gemstone?: string
    occasion?: string
    in_stock?: boolean
    new_arrivals?: boolean
    certified?: boolean
    customizable?: boolean
  }): Promise<Product[]> {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString())
        }
      })
    }
    
    const response = await fetch(`${API_BASE_URL}/products?${params}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    
    const data = await response.json()
    return data.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      images: product.images.map((img: any) => ({
        src: img.src,
        alt: img.alt
      })),
      originalPrice: product.original_price,
      salePrice: product.sale_price,
      discount: product.discount,
      category: product.category,
      material: product.material,
      gemstone: product.gemstone,
      occasion: product.occasion,
      inStock: product.in_stock,
      newArrivals: product.new_arrivals,
      certified: product.certified,
      customizable: product.customizable,
      description: product.description,
      specifications: product.specifications
    }))
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch product')
    }
    
    const product = await response.json()
    return {
      id: product.id.toString(),
      name: product.name,
      images: product.images.map((img: any) => ({
        src: img.src,
        alt: img.alt
      })),
      originalPrice: product.original_price,
      salePrice: product.sale_price,
      discount: product.discount,
      category: product.category,
      material: product.material,
      gemstone: product.gemstone,
      occasion: product.occasion,
      inStock: product.in_stock,
      newArrivals: product.new_arrivals,
      certified: product.certified,
      customizable: product.customizable,
      description: product.description,
      specifications: product.specifications
    }
  },

  // Search products
  async searchProducts(query: string, filters?: any): Promise<Product[]> {
    const params = new URLSearchParams()
    if (query) {
      params.append('query', query)
    }
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v))
          } else {
            params.append(key, value.toString())
          }
        }
      })
    }
    
    const response = await fetch(`${API_BASE_URL}/products/search?${params}`)
    if (!response.ok) {
      throw new Error('Failed to search products')
    }
    
    const data = await response.json()
    return data.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      images: product.images.map((img: any) => ({
        src: img.src,
        alt: img.alt
      })),
      originalPrice: product.original_price,
      salePrice: product.sale_price,
      discount: product.discount,
      category: product.category,
      material: product.material,
      gemstone: product.gemstone,
      occasion: product.occasion,
      inStock: product.in_stock,
      newArrivals: product.new_arrivals,
      certified: product.certified,
      customizable: product.customizable,
      description: product.description,
      specifications: product.specifications
    }))
  }
}

// Legacy functions for backward compatibility (now using API)
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return apiService.getProducts({ category })
}

export const getProductsByMaterial = async (material: string): Promise<Product[]> => {
  return apiService.getProducts({ material })
}

export const getProductsByOccasion = async (occasion: string): Promise<Product[]> => {
  return apiService.getProducts({ occasion })
}

export const getProductById = async (id: string): Promise<Product | null> => {
  return apiService.getProductById(id)
}

export const searchProducts = async (query: string, filters: any = {}): Promise<Product[]> => {
  return apiService.searchProducts(query, filters)
}

// Export the API service as default
export default apiService
