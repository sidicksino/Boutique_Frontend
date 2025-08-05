import { styles } from "@/assets/style/datail.style";
import HeaderCategory from "@/components/HeaderCategoryDetail";
import ProductCard from "@/components/ProductCard";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const CategoryDetails = () => {
  const { categoryId, categoryName, categoryImage } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      `https://boutique-backend-47jo.onrender.com/api/categories/${categoryId}/products`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement produits :", err);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <SafeScreen>
      <View style={styles.container}>
        <HeaderCategory />
        {categoryImage && (
          <Image
            source={{ uri: categoryImage }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
        )}

        <Text style={styles.categoryTitle}>Produits dans "{categoryName}"</Text>

        {loading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AntDesign name="inbox" size={64} color="gray" />
            <Text style={styles.emptyText}>Aucun produit trouvé</Text>
            <Text style={styles.emptySubText}>
              Revenez plus tard pour voir les nouveaux articles dans cette
              catégorie.
            </Text>
          </View>
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.product_id.toString()}
            renderItem={({ item }) => <ProductCard product={item} />}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeScreen>
  );
};

export default CategoryDetails;
