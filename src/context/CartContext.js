"use client";

import React, { createContext, useReducer, useEffect, useContext } from "react";

const CartContext = createContext();

const loadCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart_items");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState = {
  items: loadCart(),
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existingIndex = state.items.findIndex((i) => i.product._id === product._id);

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += quantity || 1;
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, { product, quantity: quantity || 1 }] };
    }
    case "UPDATE_QUANTITY": {
      const { productId, amount } = action.payload;
      const newItems = state.items.map((item) => {
        if (item.product._id === productId) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      });
      return { ...state, items: newItems };
    }
    case "REMOVE_ITEM": {
      return { ...state, items: state.items.filter((i) => i.product._id !== action.payload) };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  const updateQuantity = (productId, amount) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, amount } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, updateQuantity, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};