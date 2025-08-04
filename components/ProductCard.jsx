import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/style/produit.styles";

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContenair}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.push("details", { product })}
        >
          <Image  source={{ uri: product.image_url }} resizeMode="cover" style={styles.image} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>

          <View style={styles.row}>
            <Text style={styles.price}>${product.price}</Text>
            <TouchableOpacity style={styles.heartFavori}>
              <Ionicons name="heart-outline" size={40} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
