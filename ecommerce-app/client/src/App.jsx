import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProductsPage from "./pages/ProductsPage";
import checkServerStatus from "./checkServerStatus.js";
import ScrollToTop from "./components/common/ScrollToTop";
import ProductDetailPage from "./pages/ProductDetailPage";
import ErrorPage from "./pages/ErrorPage";
// Import other pages as they are created, e.g.:
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderHistoryPage from './pages/OrderHistoryPage';
// import UserProfilePage from './pages/UserProfilePage';

export default function App() {
  // Check server status when the app loads
  useEffect(() => {
    checkServerStatus();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen ">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products/category/:category"
              element={<ProductsPage />}
            />
            <Route path="/products/search" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          {/* Define other routes here as components are built:
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          */}
        </Routes>
      </div>
    </Router>
  );
}
