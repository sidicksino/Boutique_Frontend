import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Charger le panier depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.product_id === product.product_id);
      if (existing) {
        return prev.map(item =>
          item.product.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    await AsyncStorage.removeItem("cartItems");
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.product_id !== productId));
  };  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart , removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
