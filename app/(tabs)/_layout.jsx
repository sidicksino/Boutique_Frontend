import SafeScreen from "@/components/SafeScreen";
import IonIcons from "@expo/vector-icons/Ionicons";
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
            borderRadius: 40,
            borderTopWidth: 0,
            position: "absolute",
            left: 10,
            right: 10,
            height: 80,
            paddingBottom: 15,
            paddingTop: 10,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <IonIcons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="commandeScreen"
          options={{
            title: "Commandes",
            tabBarIcon: ({ color, size }) => (
              <IonIcons name="bag-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="CardScreen"
          options={{
            title: "Cartes",
            tabBarIcon: ({ color, size }) => (
              <IonIcons name="card-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            title: "Profil",
            tabBarIcon: ({ color, size }) => (
              <IonIcons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeScreen>
  );
};

export default TabsLayout;
