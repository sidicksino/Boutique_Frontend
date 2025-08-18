import { ThemeContext } from "@/context/ThemeContext";
import { useNavigation } from "expo-router";
import React, { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { getStyles } from "../assets/style/produit.styles";

const ProductCardCategorie = ({ product }) => {

  const { COLORS } = useContext(ThemeContext); // récupère le thème actuel
  const styles = getStyles(COLORS); // crée les styles dynamiques

  const navigation = useNavigation();

  return (
    <View style={styles.cardCategorie}>
      <TouchableOpacity
        onPress={() =>
          navigation.push("pages/category-details", {
            categoryId: product.category_id,
            categoryName: product.name,
            categoryImage: product.image_url,
          })
        }
      >
        <Image
          source={{ uri: product.image_url }}
          resizeMode="cover"
          style={styles.imageCategorie}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCardCategorie;
