import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
// Import other pages as they are created, e.g.:
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderHistoryPage from './pages/OrderHistoryPage';
// import UserProfilePage from './pages/UserProfilePage';
// import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen ">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          {/* Define other routes here as components are built:
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} /> 
          */}
        </Routes>
      </div>
    </Router>
  );
}
