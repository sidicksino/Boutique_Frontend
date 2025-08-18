import { getStyles } from "@/assets/style/admin.style";
import HeaderCategory from "@/components/HeaderCategoryDetail";
import SafeScreen from "@/components/SafeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const CategorieAdmin = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://boutique-backend-47jo.onrender.com/api/categories"
      );
      const data = await res.json();
      setCategories(data.categories);
      setTotal(data.total ?? 0);
    } catch (err) {
      console.error("Error fetching categories:", err);
      Alert.alert("Error", "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const onDelete = (id) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(
                `https://boutique-backend-47jo.onrender.com/api/categories/${id}`,
                { method: "DELETE" }
              );
              const result = await res.json();
              if (result.success) {
                Alert.alert("Success", "Category deleted");
                setCategories(categories.filter((cat) => cat.id !== id));
              } else {
                throw new Error(result.error || "Delete failed");
              }
            } catch (err) {
              console.error("Delete error:", err);
              Alert.alert("Error", "Failed to delete category");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeScreen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <LottieView
            source={require('../../assets/images/loading.json')}
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
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText1}> Categories </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/(admin)/ProductAdmin")}
          >
            <Text style={styles.buttonText2}> Products </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.addContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/(admin)/AddCategory")}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                style={styles.addIcon}
              />
              <Text style={styles.addButtonText}>Add Category</Text>
            </TouchableOpacity>

            {/* Afficher le total */}
            <View style={styles.totalContenair}>
              <View style={styles.dashboard}>
                <View>
                  <Text style={styles.totalText}>Total Categories</Text>
                  <Text style={styles.infoText1}>{total}</Text>
                </View>
                <Text style={styles.dashboardText}>
                  📊 Dashboard Produits
                </Text>
              </View>
            </View>

            {categories.map((category, index) => (
              <View key={category.id ?? index} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Image
                    source={{ uri: category.image_url }}
                    style={styles.illustration}
                  />
                </View>
                <Text style={styles.infoText}>{category.name}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onDelete(category.id)}
                  >
                    <Ionicons name="trash" size={18} color="#e63946" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {categories.length === 0 && (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No categories available.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default CategorieAdmin;
