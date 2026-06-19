import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const { data } = await cartAPI.get();
      setCart(data);
      setCartCount(data.items?.length || 0);
    } catch {
      setCart(null);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
    else { setCart(null); setCartCount(0); }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await cartAPI.add({ product_id: productId, quantity });
    setCart(data);
    setCartCount(data.items?.length || 0);
    return data;
  };

  const removeFromCart = async (itemId) => {
    const { data } = await cartAPI.remove(itemId);
    setCart(data);
    setCartCount(data.items?.length || 0);
  };

  const clearCart = async () => {
    await cartAPI.clear();
    setCart(null);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
