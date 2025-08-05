import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/style/produit.styles";

const FavoriteCard = ({ product, onToggle }) => {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveFavorite = async () => {
    setIsProcessing(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.warn(" Aucun token trouvé. Veuillez vous connecter.");
        return;
      }

      const res = await fetch(
        `https://boutique-backend-47jo.onrender.com/api/favorites/${product.product_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        if (onToggle) onToggle();
      } else {
        Alert.alert("Erreur", "Impossible de supprimer le favori.");
      }
    } catch (error) {
      console.error("Erreur suppression favori :", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.cardContenair}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.push("details", { product: JSON.stringify(product) })
          }
        >
          <Image
            source={{ uri: product.image_url }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.heartFavori}
          onPress={handleRemoveFavorite}
          disabled={isProcessing}
        >
          <Ionicons
            name="trash-outline"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>

          <View style={styles.row}>
            <Text style={styles.price}>${product.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavoriteCard;
