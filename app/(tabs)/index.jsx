import { styles } from "@/assets/style/home.style";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCardCategorie from "@/components/ProductCategories";
import { ResizeMode, Video } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

const HomeScreen = () => {
  const video = useRef(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fonction pour charger les catégories
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://boutique-backend-47jo.onrender.com/api/categories");
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fonction pour charger les produits
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://boutique-backend-47jo.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fonction de rafraîchissement (pull to refresh)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchProducts(), fetchCategories()]).finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const renderHeader = () => (
    <View>
      <Video
        ref={video}
        source={require("../../assets/images/sidick (2).mp4")}
        style={{ width: "100%", height: 250 }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      <Text style={styles.productTitle}>Product Categories</Text>

      {loadingCategories ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.category_id.toString()}
          renderItem={({ item }) => <ProductCardCategorie product={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}

      <Text style={styles.productTitle}>Our Products</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {loadingProducts ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.product_id.toString()}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;
