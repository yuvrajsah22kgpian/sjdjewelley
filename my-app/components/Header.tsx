import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Phone, Menu, X } from "lucide-react";
import { useCartStore, useAuthStore, useSearchStore } from "../src/store/store";

export default function Header() {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const { getTotalItems } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (mounted) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen, mounted]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mounted) {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isMobileMenuOpen, mounted]);

  if (!mounted) {
    // SSR fallback
    return (
      <header className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/images/SJD_logo.png"
                alt="Logo"
                className="h-8 sm:h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <div className="flex-1"></div>
          <div className="w-16"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="w-full bg-white shadow-md relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="images/SJD_logo.png"
                alt="SJD Jewelry Wholesale Logo"
                className="h-8 sm:h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {/* Search Bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                if (searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
                }
              }}
              className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jewelry..."
                className="outline-none bg-transparent px-2 py-1 w-56 text-sm"
                suppressHydrationWarning
              />
            </form>

            {/* Navigation Links */}
            <nav className="flex items-center gap-5 text-gray-700 text-sm font-medium ml-6">
              <Link 
                to="/wishlist" 
                className="hover:text-blue-600 flex items-center gap-1 transition-colors duration-200"
              >
                <Heart size={16} />
                <span>Wishlist</span>
              </Link>
              <Link 
                to="/cart" 
                className="hover:text-blue-600 flex items-center gap-1 transition-colors duration-200 relative"
              >
                <ShoppingCart size={16} />
                <span>Cart</span>
                {/* Cart badge */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </Link>
              {isAuthenticated ? (
                <Link 
                  to="/account" 
                  className="hover:text-blue-600 flex items-center gap-1 transition-colors duration-200"
                >
                  <User size={16} />
                  <span>Account</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="hover:text-blue-600 flex items-center gap-1 transition-colors duration-200"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Right - Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle mobile menu"
              suppressHydrationWarning
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Below Header */}
        <div className="lg:hidden border-t border-gray-200 px-4 py-3 bg-gray-50">
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
              }
            }}
            className="flex items-center border rounded-lg px-3 py-2 bg-white"
          >
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewelry..."
              className="outline-none bg-transparent px-2 py-1 flex-1 text-sm"
              suppressHydrationWarning
            />
          </form>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="mobile-menu-container absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                suppressHydrationWarning
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Content */}
            <nav className="p-4 space-y-1">
              
              <Link 
                to="/wishlist" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart size={20} />
                <span className="font-medium">Wishlist</span>
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                </div>
                <span className="font-medium">Shopping Cart</span>
              </Link>
              
              {isAuthenticated ? (
                <Link 
                  to="/account" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} />
                  <span className="font-medium">My Account</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} />
                  <span className="font-medium">Login</span>
                </Link>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Additional Mobile Links */}
              <a 
                href="/categories" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">Browse Categories</span>
              </a>
              
              <a 
                href="/about" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">About Us</span>
              </a>
            </nav>

            {/* Mobile Contact Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone size={16} />
                <span>+1-234-567-890</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Call us for wholesale inquiries
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
