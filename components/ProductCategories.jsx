import { useNavigation } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/style/produit.styles";

const ProductCardCategorie = ({ product }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardCategorie}>
      <TouchableOpacity
        onPress={() =>
          navigation.push("category-details", {
            categoryId: product.category_id,
            categoryName: product.name, // facultatif pour affichage dans la page
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
