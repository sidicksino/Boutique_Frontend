import ProductCard from "@/components/ProductCard";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const CategoryDetails = () => {
  const { categoryId, categoryName } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://boutique-backend-47jo.onrender.com/api/categories/${categoryId}/products`)
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
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Produits de la catégorie : {categoryName}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : products.length === 0 ? (
        <Text>Aucun produit trouvé pour cette catégorie.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </View>
  );
};

export default CategoryDetails;
