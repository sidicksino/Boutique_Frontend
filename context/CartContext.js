// Fichier: context/CartContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartKey, setCartKey] = useState("cartItems_guest");
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'ID utilisateur au démarrage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          setUserId(null);
          setIsLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        
        if (!decoded.user_id) {
          throw new Error("Token invalide: user_id manquant");
        }
        
        setUserId(decoded.user_id);
      } catch (error) {
        console.error("Erreur token:", error.message);
        await AsyncStorage.removeItem("userToken");
        setUserId(null);
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Mettre à jour la clé du panier quand l'utilisateur change
  useEffect(() => {
    if (userId === null) {
      setCartKey("cartItems_guest");
      return;
    }

    const newKey = `cartItems_${userId}`;
    setCartKey(newKey);
  }, [userId]);

  // Charger le panier quand la clé change
  useEffect(() => {
    if (!cartKey) return;

    const loadCart = async () => {
      setIsLoading(true);
      try {
        const storedCart = await AsyncStorage.getItem(cartKey);
        setCartItems(storedCart ? JSON.parse(storedCart) : []);
      } catch (error) {
        console.error("Erreur chargement panier:", error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [cartKey]);

  // Synchroniser les modifications du panier
  const syncCart = async (items) => {
    if (!cartKey) return;
    
    try {
      if (items.length > 0) {
        await AsyncStorage.setItem(cartKey, JSON.stringify(items));
      } else {
        await AsyncStorage.removeItem(cartKey);
      }
    } catch (error) {
      console.error("Erreur sauvegarde panier:", error);
    }
  };

  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.product_id === product.product_id
      );
      
      let newItems;
      if (existingIndex >= 0) {
        newItems = [...prev];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity
        };
      } else {
        newItems = [...prev, { product, quantity }];
      }
      
      syncCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const newItems = prev.filter(
        (item) => item.product.product_id !== productId
      );
      
      syncCart(newItems);
      return newItems;
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    if (cartKey) {
      try {
        await AsyncStorage.removeItem(cartKey);
      } catch (error) {
        console.error("Erreur vidage panier:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken"); // Supprimer le token
      setUserId(null); // Réinitialiser l'utilisateur
      setCartItems([]); // Réinitialiser le panier
      setCartKey("cartItems_guest"); // Remettre à la clé par défaut
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isLoading,
        logout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};