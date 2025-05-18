import React, { createContext, useReducer, useContext, useEffect } from "react";

// Initial state - Load from localStorage if available
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === newItem.id,
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item,
        );
        return { ...state, cart: updatedCart };
      } else {
        // Item does not exist, add new item
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...newItem, quantity: newItem.quantity || 1 },
          ],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "UPDATE_QUANTITY":
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id),
        };
      } else {
        // Otherwise, update the quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item,
          ),
        };
      }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

// Create Context
const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Effect to save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Value provided to consumers
  const contextValue = {
    cart: state.cart,
    dispatch,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
