import { getStyles } from "@/assets/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const HeaderCategory = () => {
  const [user, setUser] = useState(null);
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();
  const navigation = useNavigation();

  const profilePress = () => {
    router.push("pages/ProfileScreen");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) return;

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        <Ionicons name="search-outline" style={styles.headerIcon} />
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

export default HeaderCategory;
