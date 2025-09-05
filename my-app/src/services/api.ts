const API_BASE_URL = 'http://localhost:8000'

interface ApiResponse<T> {
  data?: T
  error?: string
}

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth-token')
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = { ...this.getAuthHeaders() }
      
      // Don't set Content-Type for FormData, let browser set it with boundary
      if (options.body instanceof FormData) {
        delete (headers as any)['Content-Type']
      }
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      console.error('API request failed:', error)
      return { error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)

    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    localStorage.setItem('auth-token', data.access_token)
    return data
  }

  async register(userData: { email: string; name: string; password: string }) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getCurrentUser() {
    return this.request('/me')
  }

  // Wishlist endpoints
  async getWishlist() {
    return this.request('/wishlist')
  }

  async addToWishlist(productId: number) {
    return this.request(`/wishlist/${productId}`, {
      method: 'POST',
    })
  }

  async removeFromWishlist(productId: number) {
    return this.request(`/wishlist/${productId}`, {
      method: 'DELETE',
    })
  }

  // Orders endpoints
  async getOrders() {
    return this.request('/orders')
  }

  async getOrder(orderId: number) {
    return this.request(`/orders/${orderId}`)
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // Products endpoints
  async getProducts(params?: {
    skip?: number
    limit?: number
    category?: string
    material?: string
    gemstone?: string
    occasion?: string
    in_stock?: boolean
    new_arrivals?: boolean
    certified?: boolean
    customizable?: boolean
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/products?${queryString}` : '/products'
    return this.request(endpoint)
  }

  async getProduct(productId: number) {
    return this.request(`/products/${productId}`)
  }

  async searchProducts(query: string, filters?: any) {
    const searchParams = new URLSearchParams()
    searchParams.append('query', query)
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            searchParams.append(key, value.join(','))
          } else {
            searchParams.append(key, value.toString())
          }
        }
      })
    }
    
    return this.request(`/products/search?${searchParams.toString()}`)
  }

  // Account Application endpoints
  async createAccountApplication(applicationData: any, files?: {
    driverLicenseFile?: File;
    salesTaxPermitFile?: File;
    leaseAgreementFile?: File;
  }) {
    const formData = new FormData();
    
    // Add all form fields
    Object.keys(applicationData).forEach(key => {
      if (applicationData[key] !== null && applicationData[key] !== undefined) {
        formData.append(key, applicationData[key]);
      }
    });
    
    // Add files if provided
    if (files) {
      if (files.driverLicenseFile) {
        formData.append('driver_license_file', files.driverLicenseFile);
      }
      if (files.salesTaxPermitFile) {
        formData.append('sales_tax_permit_file', files.salesTaxPermitFile);
      }
      if (files.leaseAgreementFile) {
        formData.append('lease_agreement_file', files.leaseAgreementFile);
      }
    }
    
    return this.request<{
      id: number;
      email: string;
      account_number: string;
      account_type: string;
      legal_name: string;
      status: string;
      created_at: string;
    }>('/account-applications', {
      method: 'POST',
      body: formData,
    })
  }

  async getAccountApplications(params?: {
    skip?: number
    limit?: number
    status?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    const endpoint = queryString ? `/account-applications?${queryString}` : '/account-applications'
    return this.request(endpoint)
  }

  async getAccountApplication(applicationId: number) {
    return this.request(`/account-applications/${applicationId}`)
  }

  async updateApplicationStatus(applicationId: number, status: string, reviewNotes?: string) {
    return this.request(`/account-applications/${applicationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
        review_notes: reviewNotes
      }),
    })
  }
}

export const apiService = new ApiService()
export default apiService
