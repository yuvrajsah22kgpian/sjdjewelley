import { useState, useEffect } from 'react'
import { Package, Users, ShoppingCart, TrendingUp, DollarSign, Gem } from 'lucide-react'
import axios from 'axios'

interface DashboardStats {
  totalProducts: number
  totalUsers: number
  totalOrders: number
  totalRevenue: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // In a real app, you'd have dedicated stats endpoints
      // For now, we'll simulate the data
      setStats({
        totalProducts: 20,
        totalUsers: 150,
        totalOrders: 45,
        totalRevenue: 125000
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-gradient-to-br from-gold-400 to-gold-600',
      textColor: 'text-gold-700',
      bgColor: 'bg-gold-50'
    },
    {
      title: 'Total Customers',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400 mx-auto mb-4"></div>
          <div className="text-lg font-inter text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gradient-cream min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 font-inter">Welcome to the SJD Jewelry admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className={`${stat.bgColor} rounded-2xl shadow-elegant p-6 border border-white/50 backdrop-blur-sm`}>
              <div className="flex items-center">
                <div className={`p-4 rounded-xl ${stat.color} shadow-gold`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 font-inter">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor} font-playfair`}>{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-elegant p-8 border border-gold-100">
        <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center p-6 border border-gold-200 rounded-xl hover:bg-gold-50 hover:border-gold-300 transition-all duration-200 group">
            <div className="p-3 bg-gradient-gold rounded-lg mr-4 group-hover:shadow-gold transition-shadow">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-900 font-inter">Add New Product</span>
              <p className="text-xs text-gray-500 mt-1">Create a new jewelry item</p>
            </div>
          </button>
          <button className="flex items-center p-6 border border-gold-200 rounded-xl hover:bg-gold-50 hover:border-gold-300 transition-all duration-200 group">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mr-4 group-hover:shadow-lg transition-shadow">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-900 font-inter">View Customers</span>
              <p className="text-xs text-gray-500 mt-1">Manage customer accounts</p>
            </div>
          </button>
          <button className="flex items-center p-6 border border-gold-200 rounded-xl hover:bg-gold-50 hover:border-gold-300 transition-all duration-200 group">
            <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mr-4 group-hover:shadow-lg transition-shadow">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-gray-900 font-inter">View Orders</span>
              <p className="text-xs text-gray-500 mt-1">Track order status</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-2xl shadow-elegant p-8 border border-gold-100">
        <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gold-50 rounded-xl">
            <div className="p-2 bg-gold-200 rounded-lg mr-4">
              <Gem className="h-5 w-5 text-gold-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 font-inter">New product added: Diamond Ring</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-xl">
            <div className="p-2 bg-blue-200 rounded-lg mr-4">
              <ShoppingCart className="h-5 w-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 font-inter">New order received: #ORD-001</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
