import { getStyles } from "@/assets/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();

  const profilePress = () => {
    router.push("pages/ProfileScreen");
  };

  const reasherPress = () => {
    router.push("pages/RechercheScreen");
  };
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>Sino</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={reasherPress}>
          <Ionicons name="search-outline" style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={profilePress} style={styles.logoSocial}>
          <Image
            source={require("../assets/images/avatar.jpeg")}
            style={styles.headerLogo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
