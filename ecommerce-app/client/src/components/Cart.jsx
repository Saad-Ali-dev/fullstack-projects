import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart } = useCart(); // Get the cart state

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const itemCount = totalItems > 99 ? "99+" : totalItems;
  return (
    <Link
      to="/cart"
      className="flex items-center cursor-pointer hover:outline hover:outline-white rounded-sm transition text-white mr-4 p-2 py-3"
    >
      <div className="relative">
        <FaShoppingCart className="text-3xl" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5">
            {itemCount}
          </span>
        )}
      </div>
      <span className="ml-1 text-sm font-medium">Cart</span>
    </Link>
  );
};

export default Cart;
