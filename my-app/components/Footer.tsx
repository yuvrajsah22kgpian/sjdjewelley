export default function Footer() {
  return (
    <footer className="w-full bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between font-playfair">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="images/SJD_logo.png" alt="Logo" className="h-6 w-auto" />
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-gray-700 text-xs">
          <a href="/contact" className="hover:text-black">Contact</a>
          <a href="/track-order" className="hover:text-black">Track Order</a>
          <a href="/about" className="hover:text-black">About</a>
          <a href="/careers" className="hover:text-black">Careers</a>
          <a href="/faqs" className="hover:text-black">FAQs</a>
          <a href="/legal-policies" className="hover:text-black">Legal & Policies</a>
          <a href="/disclaimer" className="hover:text-black">Disclaimer</a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-row items-end text-gray-700 text-xs gap-2">
          <span>Email: support@yourcompany.com</span>
          <span>Phone: +1 234 567 890</span>
        </div>
      </div>
    </footer>
  );
}
