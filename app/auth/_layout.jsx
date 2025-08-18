import SafeScreen from "@/components/SafeScreen";
import { ThemeContext } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";

export default function RootLayout() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <SafeScreen>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="loginScreen" />
        </Stack>
      </SafeScreen>
    </>
  );
}
