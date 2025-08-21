import { getStyles } from "@/assets/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const [user, setUser] = useState(null);
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();

  const profilePress = () => {
    router.push("pages/ProfileScreen");
  };

  const reasherPress = () => {
    router.push("pages/RechercheScreen");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          router.replace("/auth/loginScreen");
          return;
        }

        const res = await fetch(
          "https://boutique-backend-47jo.onrender.com/api/me/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch user");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>Sino</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity  style={styles.rechercher} onPress={reasherPress}>
          <Ionicons name="search-outline" style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={profilePress} style={styles.logoSocial}>
          <Image
            source={
              user && user.profile_photo
                ? { uri: user.profile_photo }
                : require("../assets/images/avatar.jpeg")
            }
            style={styles.headerLogo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
