import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (!pathname.startsWith("/")) {
          router.replace("/auth/welcomScreen");
        }
      }
      setIsAuthLoading(false);
    };

    checkAuth();
  }, [pathname]);

  if (isAuthLoading) return null;

  return (
    <CartProvider>

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(admin)" />
      </Stack>
      <StatusBar style="auto" />
      </CartProvider>
  );
}
