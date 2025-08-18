import { getStyles } from "@/assets/style/home.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect } from "react";
import { Image, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Index() {

  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  
  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        return router.replace("auth/welcomScreen");
      }

      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          await AsyncStorage.removeItem("userToken");
          return router.replace("auth/welcomScreen");
        }
        router.replace("/(tabs)");

      } catch (err) {
        await AsyncStorage.removeItem("userToken");
        router.replace("auth/welcomScreen");
      }
    };

    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);

  return (
    <View style={styles.welcome}>
      <Image
        source={require('../assets/images/image.png')}
        style={styles.welcomeImage}
      />
    </View>
  );
}
