// Fichier: screens/CardScreen.js
import { getStyles } from "@/assets/style/cardscreen.style";
import Header from "@/components/Header";
import NoCartFound from "@/components/NoCartFound";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const CardScreen = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const { cartItems, clearCart, removeFromCart, isLoading } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    Alert.alert("Vider le panier", "Êtes-vous sûr ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Oui", onPress: clearCart },
    ]);
  };

  const handleRemoveItem = (productId) => {
    Alert.alert("Delete Product", "Are you sure ?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => removeFromCart(productId) },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      {cartItems.length === 0 ? (
        <NoCartFound />
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.product_id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image
                  source={{ uri: item.product.image_url }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.name}>{item.product.name}</Text>
                  <Text style={styles.info}>Quantity: {item.quantity}</Text>
                  <Text style={styles.info}>
                    Price: {item.product.price * item.quantity} FCFA
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(item.product.product_id)}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: {totalPrice.toFixed(2)} FCFA
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={handleClearCart}
              >
                <Text style={styles.buttonText}>Empty Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.checkoutButton]}
                onPress={() => alert("Checkout non implémenté")}
              >
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CardScreen;