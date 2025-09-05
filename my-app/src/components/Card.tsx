import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import { useCartStore, useWishlistStore, useAuthStore } from "../store/store";
import { cn } from "../utils/cn";
import apiService from "../services/api";

// Accessible, stylish icon button
interface IconButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  "aria-label": string;
}
const IconButton: React.FC<IconButtonProps> = ({
  children,
  className = "",
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={onClick}
    tabIndex={0}
    className={cn(
      "inline-flex items-center justify-center rounded-md",
      "transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      "disabled:opacity-40 disabled:pointer-events-none",
      className
    )}
  >
    {children}
  </button>
);

// Badge for discounts
interface DiscountBadgeProps {
  children: React.ReactNode;
  className?: string;
}
const DiscountBadge: React.FC<DiscountBadgeProps> = ({
  children,
  className = "",
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-bold",
      "bg-red-500 text-white shadow-sm",
      className
    )}
  >
    {children}
  </span>
);

interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  images: ProductImage[];
  originalPrice: number;
  salePrice: number;
  discount: number;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  images,
  originalPrice,
  salePrice,
  discount,
  className = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
  const [wishlistAnimation, setWishlistAnimation] = useState<boolean>(false);
  const [cartAnimation, setCartAnimation] = useState<boolean>(false);
  const [cartLoading, setCartLoading] = useState<boolean>(false);

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  // Check if item is in wishlist
  useEffect(() => {
    setIsWishlisted(isInWishlist(id));
  }, [id, isInWishlist]);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      window.location.href = '/login';
      return;
    }

    setWishlistLoading(true);
    setWishlistAnimation(true);
    
    try {
      if (isWishlisted) {
        // Remove from wishlist
        await apiService.removeFromWishlist(parseInt(id));
        removeFromWishlist(id);
        setIsWishlisted(false);
      } else {
        // Add to wishlist
        await apiService.addToWishlist(parseInt(id));
        addToWishlist({
          id,
          name,
          images,
          originalPrice,
          salePrice,
          discount
        });
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setWishlistLoading(false);
      // Reset animation after a short delay
      setTimeout(() => setWishlistAnimation(false), 600);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartLoading(true);
    setCartAnimation(true);
    
    addItem({
      id,
      name,
      images,
      originalPrice,
      salePrice,
      discount
    }, quantity);
    
    // Reset animation after a short delay
    setTimeout(() => {
      setCartLoading(false);
      setCartAnimation(false);
    }, 600);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-lg border border-gray-200",
        "hover:shadow-xl transition-all duration-300 overflow-hidden relative",
        "group flex flex-col",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={images[currentImageIndex]?.src}
          alt={images[currentImageIndex]?.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ minHeight: 180 }}
          draggable={false}
        />

        {/* Navigation */}
        {images.length > 1 && isHovered && (
          <>
            <IconButton
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(
                  (prev) => (prev - 1 + images.length) % images.length
                );
              }}
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </IconButton>
            <IconButton
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
              }}
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </IconButton>
          </>
        )}

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                className={cn(
                  "rounded-full w-2 h-2 border border-white shadow transition-colors",
                  i === currentImageIndex ? "bg-white" : "bg-white/50"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(i);
                }}
                aria-label={`Show product image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info Area */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <div className="mb-3">
          <Link to={`/product/${id}`}>
            <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
              {name}
            </h3>
          </Link>
        </div>

        {/* Bottom Row - All Controls in One Line */}
        <div className="flex items-center justify-between gap-1 text-xs">
          {/* Price Section */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              ${salePrice.toLocaleString()}
            </span>
            {originalPrice > salePrice && (
              <span className="text-xs text-gray-500 line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <DiscountBadge className="h-5">-{discount}%</DiscountBadge>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded">
            <IconButton
              aria-label="Decrease"
              disabled={quantity <= 1}
              className="h-5 w-5 rounded-r-none border-0 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                if (quantity > 1) setQuantity((q) => q - 1);
              }}
            >
              <Minus className="h-2 w-2" />
            </IconButton>
            <span className="px-1.5 py-0.5 text-xs font-medium min-w-[1.25rem] text-center border-x border-gray-200">
              {quantity}
            </span>
            <IconButton
              aria-label="Increase"
              className="h-5 w-5 rounded-l-none border-0 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setQuantity((q) => q + 1);
              }}
            >
              <Plus className="h-2 w-2" />
            </IconButton>
          </div>

          {/* Wishlist Button */}
          <div className="relative">
            <IconButton
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "h-5 w-5 hover:bg-gray-100 transition-all duration-300",
                wishlistAnimation && "scale-110 bg-red-50"
              )}
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
            >
              <Heart
                className={cn(
                  "h-2.5 w-2.5 transition-all duration-300",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400",
                  wishlistLoading && "opacity-50 animate-pulse",
                  wishlistAnimation && "scale-125"
                )}
              />
            </IconButton>
            {/* Success animation overlay */}
            {wishlistAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={cn(
                  "text-white text-xs px-2 py-1 rounded-full animate-bounce",
                  isWishlisted ? "bg-red-500" : "bg-gray-500"
                )}>
                  {isWishlisted ? "♥ Added!" : "♡ Removed!"}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="relative group">
            <IconButton
              aria-label="Add to cart"
              className={cn(
                "bg-blue-600 hover:bg-blue-700 text-white h-5 w-5 p-0 relative transition-all duration-300",
                cartAnimation && "scale-110 bg-green-600",
                cartLoading && "animate-pulse"
              )}
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              <ShoppingCart 
                className={cn(
                  "h-2.5 w-2.5 transition-all duration-300",
                  cartAnimation && "scale-125"
                )} 
              />
            </IconButton>
            {/* Tooltip */}
            <span className="absolute bottom-full right-0 mb-1 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Add to Cart
            </span>
            {/* Success animation overlay */}
            {cartAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  ✓ Added!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
