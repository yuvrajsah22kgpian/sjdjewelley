import Image from "./Image";
import logo from "../assets/images/SJD_logo.png";
import { useState } from "react";

export default function Footer() {
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = useState(false);

  return (
    <footer className="w-full bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center items-center font-playfair">
        {/* Logo and All Links in One Line */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-gray-700 text-xs text-center">
          {/* Logo */}
          <Image 
            src={logo} 
            alt="SJD Logo" 
            className="h-8 w-auto"
          />
          
          {/* Contact Links */}
         
          {/* Navigation Links */}
          <a href="/contact" className="hover:text-black transition-colors">Contact</a>
          <a href="/track-order" className="hover:text-black transition-colors">Track Order</a>
          <a href="/about-us" className="hover:text-black transition-colors">About</a>
          <a href="/careers" className="hover:text-black transition-colors">Careers</a>
          <a href="/faqs" className="hover:text-black transition-colors">FAQs</a>
          
          {/* Legal & Policies Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setIsPolicyDropdownOpen(!isPolicyDropdownOpen)}
              className="hover:text-black transition-colors flex items-center gap-1"
            >
              Legal & Policies
              <svg 
                className={`w-3 h-3 transition-transform ${isPolicyDropdownOpen ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isPolicyDropdownOpen && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px] z-10">
                <a 
                  href="/shipping-policy" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors text-xs"
                  onClick={() => setIsPolicyDropdownOpen(false)}
                >
                  Shipping Policy
                </a>
                <a 
                  href="/return-policy" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors text-xs"
                  onClick={() => setIsPolicyDropdownOpen(false)}
                >
                  Return Policy
                </a>
                <a 
                  href="/privacy-policy" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors text-xs"
                  onClick={() => setIsPolicyDropdownOpen(false)}
                >
                  Privacy Policy
                </a>
              </div>
            )}
          </div>
          
          <a href="/disclaimer" className="hover:text-black transition-colors">Disclaimer</a>
           <a 
            href="tel:+1234567890" 
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +1 (234) 567-8900
          </a>
          
          <a 
            href="mailto:info@sjd.com" 
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            info@sjd.com
          </a>

        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {isPolicyDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsPolicyDropdownOpen(false)}
        />
      )}
    </footer>
  );
}
