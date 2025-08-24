import { Link, useLocation } from 'react-router-dom'
import { Home, Package, LogOut, User, Settings, BarChart3 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="w-64 bg-gradient-to-b from-gold-50 to-white shadow-elegant">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-center h-20 px-6 border-b border-gold-200 bg-gradient-gold">
          <div className="text-center">
            <h1 className="text-2xl font-playfair font-bold text-white">SJ Jewelry</h1>
            <p className="text-xs text-gold-100 font-medium">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-gradient-gold text-white shadow-gold transform scale-105'
                    : 'text-gray-700 hover:bg-gold-100 hover:text-gold-700 hover:shadow-elegant'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User info and logout */}
        <div className="p-6 border-t border-gold-200 bg-white">
          <div className="flex items-center mb-4 p-3 bg-gold-50 rounded-xl">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900 font-inter">{user?.name}</p>
              <p className="text-xs text-gray-500 font-inter">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-transparent hover:border-red-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
