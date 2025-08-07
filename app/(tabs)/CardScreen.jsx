import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import React from 'react';
import { FlatList, Text, View } from "react-native";

const CardScreen = () => {
  const { cartItems } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {cartItems.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Panier vide</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.product.product_id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.product.name}</Text>
              <Text>Quantité : {item.quantity}</Text>
              <Text>Prix : ${item.product.price * item.quantity}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CardScreen;