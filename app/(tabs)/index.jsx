import { styles } from "@/assets/style/home.style";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCardCategorie from "@/components/ProductCategories";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const HomeScreen = () => {
  const video = useRef(null);

  // États pour produits et catégories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Charger les catégories depuis l'API
  useEffect(() => {
    fetch("https://boutique-backend-47jo.onrender.com/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
        setLoadingCategories(false);
      });
  }, []);

  // Charger les produits depuis l'API
  useEffect(() => {
    fetch("https://boutique-backend-47jo.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoadingProducts(false);
      });
  }, []);

  // Rendu de l'en-tête avec vidéo et catégories
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
          horizontal={true}
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
        />
      )}
    </View>
  );
};

export default HomeScreen;
