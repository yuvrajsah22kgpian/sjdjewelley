import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingpage";

// Material pages
import LabGrownDiamond from "../pages/material/lab_grown_diamond_jewelry";
import NaturalDiamond from "../pages/material/natural_diamond_jewelry";
import PlainGoldJewelry from "../pages/material/plain_gold_jewelry";

// Category pages
import Rings from "../pages/categories/rings";
import Earrings from "../pages/categories/earrings";
import Necklaces from "../pages/categories/necklaces";
import BanglesBracelets from "../pages/categories/bangles_bracelets";
import Pendants from "../pages/categories/pendants";
import Accessories from "../pages/categories/accessories";

// Style pages
import MensJewelry from "../pages/style/men";
import WomensJewelry from "../pages/style/women";

// Auth pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// User pages
import Cart from "../pages/Cart";
import Account from "../pages/Account";
import ProductDetail from "../pages/ProductDetail";
import Wishlist from "../pages/Wishlist";
import SearchResults from "../pages/SearchResults";

// About / Story pages
import About from "../pages/about-us";
import OurStory from "../pages/story"; 
import Faq from "../pages/FAQ";
import DisclaimerPage from "../pages/Disclaimer";
import SJDJobApplicationForm from "../pages/careers";
import ContactPage from "../pages/contact";

// Policy pages
import ShippingPolicyPage from "../pages/ShippingPolicyPage";
import ReturnPolicyPage from "../pages/ReturnPolicyPage";
import PrivacyPolicyPage from "../pages/PrivacyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Material pages */}
      <Route path="/material/lab_grown_diamond" element={<LabGrownDiamond />} />
      <Route path="/material/natural_diamond" element={<NaturalDiamond />} />
      <Route path="/material/plain_gold" element={<PlainGoldJewelry />} />

      {/* Category pages */}
      <Route path="/categories/rings" element={<Rings />} />
      <Route path="/categories/earrings" element={<Earrings />} />
      <Route path="/categories/necklaces" element={<Necklaces />} />
      <Route path="/categories/bangles_bracelets" element={<BanglesBracelets />} />
      <Route path="/categories/pendants" element={<Pendants />} />
      <Route path="/categories/accessories" element={<Accessories />} />

      {/* Style pages */}
      <Route path="/style/men" element={<MensJewelry />} />
      <Route path="/style/women" element={<WomensJewelry />} />

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User pages */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* About pages */}
      <Route path="/about-us" element={<About />} />
      <Route path="/story" element={<OurStory />} />
      <Route path="/Faqs" element={<Faq />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/careers" element={<SJDJobApplicationForm />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Policy pages */}
      <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
      <Route path="/return-policy" element={<ReturnPolicyPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    </Routes>
  );
}
