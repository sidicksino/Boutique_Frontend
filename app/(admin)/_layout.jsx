import { ThemeContext } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";

export default function AdminLayout() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="ProductAdmin" />
        <Stack.Screen name="AddCategory" />
      </Stack>
      <StatusBar style={isDarkMode ? "light" : "dark"}/>
    </>
  );
}
