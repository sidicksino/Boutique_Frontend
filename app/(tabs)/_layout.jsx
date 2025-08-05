import SafeScreen from "@/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";
import React from "react";
import { COLORS } from "../../constants/colors";


const TabsLayout = () => {
  return (
    <SafeScreen>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "#ffffff",
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
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="commandeScreen"
          options={{
            title: "Orders",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-circle-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="CardScreen"
          options={{
            title: "Cart",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="FavoriteScreen"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={30} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeScreen>
  );
};

export default TabsLayout;
