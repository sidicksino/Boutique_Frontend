import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { getStyles } from "../assets/style/produit.styles";

const ProductCard = ({ product, onToggle }) => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;

      try {
        const res = await fetch(
          "https://boutique-backend-47jo.onrender.com/api/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        let favoritesArray = [];

        if (Array.isArray(data)) {
          favoritesArray = data;
        } else if (Array.isArray(data.favorites)) {
          favoritesArray = data.favorites;
        } else {
          console.warn(" Format inattendu des données de favoris", data);
          return;
        }

        const liked = favoritesArray.some(
          (p) => p.product_id === product.product_id
        );
        setIsLiked(liked);
      } catch (error) {
        console.error(" Erreur check favoris:", error);
      }
    };

    checkFavorite();
  }, [product]);

  const toggleLike = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.warn(" Aucun token trouvé. Veuillez vous connecter.");
        return;
      }

      if (isLiked) {
        const res = await fetch(
          `https://boutique-backend-47jo.onrender.com/api/favorites/${product.product_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error(" Erreur de suppression du favori");
          return;
        }

        setIsLiked(false);

        Toast.show({
          type: "success",
          text1: "Removed from favorites",
          text2: `${product.name} was removed`,
          position: "top",
          visibilityTime: 2000,
          topOffset: 50,
        });

      } else {
        const res = await fetch(
          `https://boutique-backend-47jo.onrender.com/api/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ product_id: product.product_id }),
          }
        );
        if (!res.ok) {
          console.error(" Erreur d'ajout aux favoris");
          return;
        }
        setIsLiked(true);
        Toast.show({
          type: "success",
          text1: "Added to favorites",
          text2: `${product.name} was added`,
          position: "top",
          visibilityTime: 2000,
          topOffset: 50,
        });
      }
      if (onToggle) onToggle();
    } catch (err) {
      console.error(" Erreur dans toggleLike:", err);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again later",
        position: "top",
        visibilityTime: 2000,
        topOffset: 50,
      });
    }
  };

  return (
    <View style={styles.cardContenair}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.push("pages/details", { product: JSON.stringify(product) })
          }
        >
          <Image
            source={{ uri: product.image_url }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.heartFavori} onPress={toggleLike}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={30}
            color={isLiked ? "red" : COLORS.primary}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>

          <View style={styles.row}>
            <Text style={styles.price}>{product.price} FCFA</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
