import { styles } from "@/assets/style/datail.style";
import HeaderCategory from "@/components/HeaderCategoryDetail";
import ProductCard from "@/components/ProductCard";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";

const CategoryDetails = () => {
  const { categoryId, categoryName, categoryImage } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `https://boutique-backend-47jo.onrender.com/api/categories/${categoryId}/products`
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Erreur chargement produits :", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </SafeScreen>
  );
};

export default CategoryDetails;
