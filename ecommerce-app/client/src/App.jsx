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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./pages/CartPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import axios from "axios";
import ChatbotPage from "./pages/ChatbotPage";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";


export default function App() {
  // Check server status when the app loads
  useEffect(() => {
    checkServerStatus();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen ">
        <ToastContainer />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products/category/:category"
              element={<ProductsPage />}
            />
            <Route path="/products/search" element={<ProductsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
