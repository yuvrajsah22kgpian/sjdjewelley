// import Image from "./Image";
// import logo from "../assets/images/SJD_logo.png"; 

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t">
  <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center items-center font-playfair">
    {/* Links - Centered */}
    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-gray-700 text-xs text-center">
      <a href="/contact" className="hover:text-black transition-colors">Contact</a>
      <a href="/track-order" className="hover:text-black transition-colors">Track Order</a>
      <a href="/about-us" className="hover:text-black transition-colors">About</a>
      <a href="/careers" className="hover:text-black transition-colors">Careers</a>
      <a href="/faqs" className="hover:text-black transition-colors">FAQs</a>
      <a href="/legal-policies" className="hover:text-black transition-colors">Legal & Policies</a>
      <a href="/disclaimer" className="hover:text-black transition-colors">Disclaimer</a>
    </div>
  </div>
</footer>

  );
}
