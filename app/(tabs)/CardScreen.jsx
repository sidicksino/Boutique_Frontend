import { styles } from "@/assets/style/cardscreen.style";
import Header from "@/components/Header";
import NoCartFound from "@/components/NoCartFound";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CardScreen = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: clearCart },
    ]);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

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
                  <Text style={styles.info}>Qty: {item.quantity}</Text>
                  <Text style={styles.info}>
                    Price: ${item.product.price * item.quantity}
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
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={handleClearCart}
              >
                <Text style={styles.buttonText}>Clear Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.checkoutButton]}
                onPress={() => alert("Checkout not implemented")}
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
