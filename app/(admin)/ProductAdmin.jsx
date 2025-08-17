import { styles } from "@/assets/style/admin.style";
import HeaderCategory from "@/components/HeaderCategoryDetail";
import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useNavigation } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductAdmin = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Fetch Products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://boutique-backend-47jo.onrender.com/api/products/all"
      );
      const data = await res.json();

      setProducts(data.products ?? []);
      setTotal(data.total ?? 0);
      setByCategory(data.byCategory ?? []);
    } catch (err) {
      console.error("Error fetching products:", err);
      Alert.alert("Error", "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshFlag]);

  // Delete products
  const onDelete = (id) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(
                `https://boutique-backend-47jo.onrender.com/api/products/${id}`,
                { method: "DELETE" }
              );
              const result = await res.json();
              if (result.success) {
                Alert.alert("Success", "Product deleted");
                setProducts((prevProducts) =>
                  prevProducts.filter((p) => p.product_id !== id)
                );
                setTotal((prevTotal) => prevTotal - 1);
              }
               else {
                throw new Error(result.error || "Delete failed");
              }
            } catch (err) {
              console.error("Delete error:", err);
              Alert.alert("Error", "Failed to delete product");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeScreen>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            source={require("../../assets/images/loading.json")}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text style={{ marginTop: 20, fontSize: 16, color: COLORS.primary }}>
            Loading profile...
          </Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View style={styles.container}>
        <HeaderCategory />
        <View style={styles.line}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText2}> products </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText1}> Products </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.addContainer}>
            {/* Bouton ajouter */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/(admin)/AddProduct")}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                style={styles.addIcon}
              />
              <Text style={styles.addButtonText}>Add Product</Text>
            </TouchableOpacity>

            {/* Afficher le total */}
            <View style={styles.totalContenair}>
              <View style={styles.dashboard}>
                <View>
                  <Text style={styles.totalText}>Total Products</Text>
                  <Text style={styles.infoText1}>{total}</Text>
                </View>
                <Text style={styles.dashboardText}>📊 Dashboard Produits</Text>
              </View>

              <View style={styles.totalProduct}>
                {Array.isArray(byCategory) &&
                  byCategory.map((cat, idx) => (
                    <Text key={idx} style={styles.infoText2}>
                      {cat.category_name} : {cat.total}
                    </Text>
                  ))}
              </View>
            </View>

            {/* Liste des produits */}
            {products.map((product, index) => (
              <View key={product.product_id ?? index} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Image
                    source={{ uri: product.image_url }}
                    style={styles.illustration}
                  />
                </View>
                <View>
                  <Text style={styles.infoText}>{product.name}</Text>
                  <Text style={styles.infoText}>Price : ${product.price}</Text>
                  <Text style={styles.infoText}>
                    Category : {product.category_name}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onDelete(product.product_id)}
                  >
                    <Ionicons name="trash" size={18} color="#e63946" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {products.length === 0 && (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No products available.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default ProductAdmin;
