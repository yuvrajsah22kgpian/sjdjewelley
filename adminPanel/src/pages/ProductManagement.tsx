import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Edit, Trash2, Search, Filter, Package, X, Image as ImageIcon } from 'lucide-react'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  original_price: number
  sale_price: number
  discount: number
  category: string
  material: string
  gemstone: string
  occasion: string
  in_stock: boolean
  new_arrivals: boolean
  certified: boolean
  customizable: boolean
  images: Array<{
    id: number
    src: string
    alt: string
    is_primary: boolean
  }>
}

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  original_price: z.number().min(0, 'Price must be positive'),
  sale_price: z.number().min(0, 'Price must be positive'),
  discount: z.number().min(0).max(100, 'Discount must be between 0 and 100'),
  category: z.string().optional(),
  material: z.string().optional(),
  gemstone: z.string().optional(),
  occasion: z.string().optional(),
  in_stock: z.boolean(),
  new_arrivals: z.boolean(),
  certified: z.boolean(),
  customizable: z.boolean(),
  specifications: z.record(z.string()).optional(),
  images: z.array(z.object({
    src: z.string().url('Must be a valid URL'),
    alt: z.string().optional(),
    is_primary: z.boolean()
  })).optional()
})

type ProductFormData = z.infer<typeof productSchema>

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      in_stock: true,
      new_arrivals: false,
      certified: false,
      customizable: false,
      discount: 0,
      images: []
    }
  })

  const watchedImages = watch('images') || []

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    try {
      console.log('Submitting product data:', data)
      
      // Ensure images array is properly formatted
      const productData = {
        ...data,
        images: data.images || []
      }

      if (editingProduct) {
        await axios.put(`/admin/products/${editingProduct.id}`, productData)
      } else {
        await axios.post('/admin/products', productData)
      }
      
      await fetchProducts()
      reset()
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product. Please check the console for details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    reset({
      name: product.name,
      description: product.description,
      original_price: product.original_price,
      sale_price: product.sale_price,
      discount: product.discount,
      category: product.category,
      material: product.material,
      gemstone: product.gemstone,
      occasion: product.occasion,
      in_stock: product.in_stock,
      new_arrivals: product.new_arrivals,
      certified: product.certified,
      customizable: product.customizable,
      images: product.images
    })
    setShowForm(true)
  }

  const handleDelete = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/admin/products/${productId}`)
        fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const addImage = () => {
    const newImages = [...(watchedImages || []), { src: '', alt: '', is_primary: false }]
    setValue('images', newImages)
  }

  const removeImage = (index: number) => {
    const newImages = watchedImages.filter((_, i) => i !== index)
    setValue('images', newImages)
  }

  const setPrimaryImage = (index: number) => {
    const newImages = watchedImages.map((img, i) => ({
      ...img,
      is_primary: i === index
    }))
    setValue('images', newImages)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400 mx-auto mb-4"></div>
          <div className="text-lg font-inter text-gray-600">Loading products...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gradient-cream min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 font-inter mt-2">Manage your jewelry inventory</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingProduct(null)
            reset()
          }}
          className="flex items-center px-6 py-3 bg-gradient-gold text-white rounded-xl hover:shadow-gold transition-all duration-200 font-inter font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
          />
        </div>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-2xl shadow-elegant p-8 border border-gold-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-playfair font-semibold text-gray-900">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingProduct(null)
                reset()
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Product Name *
                </label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1 font-inter">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Category
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
                >
                  <option value="">Select category</option>
                  <option value="rings">Rings</option>
                  <option value="earrings">Earrings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="bangles_bracelets">Bangles & Bracelets</option>
                  <option value="pendants">Pendants</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Original Price *
                </label>
                <input
                  {...register('original_price', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
                  placeholder="0.00"
                />
                {errors.original_price && (
                  <p className="text-sm text-red-600 mt-1 font-inter">{errors.original_price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Sale Price *
                </label>
                <input
                  {...register('sale_price', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
                  placeholder="0.00"
                />
                {errors.sale_price && (
                  <p className="text-sm text-red-600 mt-1 font-inter">{errors.sale_price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Material
                </label>
                <select
                  {...register('material')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
                >
                  <option value="">Select material</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="platinum">Platinum</option>
                  <option value="natural_diamond">Natural Diamond</option>
                  <option value="lab_grown_diamond">Lab Grown Diamond</option>
                  <option value="pearl">Pearl</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Gemstone
                </label>
                <input
                  {...register('gemstone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
                  placeholder="e.g., Diamond, Ruby, Emerald"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all duration-200 font-inter"
                placeholder="Enter product description..."
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center p-3 bg-gold-50 rounded-xl border border-gold-200">
                <input
                  {...register('in_stock')}
                  type="checkbox"
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 font-inter">In Stock</span>
              </label>

              <label className="flex items-center p-3 bg-gold-50 rounded-xl border border-gold-200">
                <input
                  {...register('new_arrivals')}
                  type="checkbox"
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 font-inter">New Arrivals</span>
              </label>

              <label className="flex items-center p-3 bg-gold-50 rounded-xl border border-gold-200">
                <input
                  {...register('certified')}
                  type="checkbox"
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 font-inter">Certified</span>
              </label>

              <label className="flex items-center p-3 bg-gold-50 rounded-xl border border-gold-200">
                <input
                  {...register('customizable')}
                  type="checkbox"
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 font-inter">Customizable</span>
              </label>
            </div>

            {/* Image Management */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700 font-inter">
                  Product Images
                </label>
                <button
                  type="button"
                  onClick={addImage}
                  className="flex items-center px-3 py-1 text-sm text-gold-600 hover:text-gold-700 font-inter"
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Add Image
                </button>
              </div>
              
              {watchedImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <input
                      {...register(`images.${index}.src`)}
                      placeholder="Image URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 font-inter"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      {...register(`images.${index}.alt`)}
                      placeholder="Alt text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 font-inter"
                    />
                  </div>
                  <label className="flex items-center">
                    <input
                      {...register(`images.${index}.is_primary`)}
                      type="checkbox"
                      onChange={() => setPrimaryImage(index)}
                      className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 font-inter">Primary</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                  reset()
                }}
                className="px-6 py-3 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-200 font-inter font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-gold text-white rounded-xl hover:shadow-gold transition-all duration-200 font-inter font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-elegant overflow-hidden border border-gold-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gold-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gold-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-gold-100 flex items-center justify-center">
                            <Package className="h-6 w-6 text-gold-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 font-inter">{product.name}</div>
                        <div className="text-sm text-gray-500 font-inter">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-inter">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-inter">
                    ${product.sale_price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      product.in_stock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    } font-inter`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-gold-600 hover:text-gold-800 transition-colors"
                        title="Edit product"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
