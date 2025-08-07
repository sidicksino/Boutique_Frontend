import SafeScreen from "@/components/SafeScreen";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

const TabsLayout = () => {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <SafeScreen>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.income,
          tabBarInactiveTintColor: COLORS.background,
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            borderRadius: 20,
            borderTopWidth: 0,
            position: "absolute",
            left: 10,
            right: 10,
            height: 70,
            paddingBottom: 15,
            paddingTop: 10,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            padding: 4,
            fontSize: 13,
            fontWeight: "300",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Octicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="commandeScreen"
          options={{
            title: "Orders",
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-circle-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="CardScreen"
          options={{
            title: "Cart",
            tabBarIcon: ({ color }) => (
              <View style={{ position: "relative" }}>
                <Ionicons name="cart-outline" size={30} color={color} />
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -10,
                      backgroundColor: "red",
                      borderRadius: 10,
                      paddingHorizontal: 5,
                      paddingVertical: 1,
                      minWidth: 18,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                      {totalCount}
                    </Text>
                  </View>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="FavoriteScreen"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={30} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeScreen>
  );
};

export default TabsLayout;
