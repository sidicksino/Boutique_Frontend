import { getStyles } from "@/assets/style/datail.style";
import HeaderCategory from "@/components/HeaderCategoryDetail";
import ProductCard from "@/components/ProductCard";
import SafeScreen from "@/components/SafeScreen";
import { ThemeContext } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";

const CategoryDetails = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  
  const { categoryId, categoryName, categoryImage } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/auth/loginScreen");
        return;
      }
      const res = await fetch(
        `https://boutique-backend-47jo.onrender.com/api/categories/${categoryId}/products`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
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
          <View style={styles.imageContainerCategory}>
            <Image
              source={{ uri: categoryImage }}
              style={styles.categoryImage}
              resizeMode="cover"
            />
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <AntDesign name="inbox" size={64} color="white" />
            </View>
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
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
            ListHeaderComponent={
              <Text style={styles.sectionTitleCategory}>Produits dans "{categoryName}"</Text>
            }
          />
        )}
      </View>
    </SafeScreen>
  );
};

export default CategoryDetails;
