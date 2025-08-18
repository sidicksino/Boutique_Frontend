import { getStyles } from "@/assets/style/home.style";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const HeaderCategory = () => {

  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();
  const navigation = useNavigation();

  const profilePress = () => {
    router.push("pages/ProfileScreen");
  };
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
            source={require("../assets/images/avatar.jpeg")}
            style={styles.headerLogo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderCategory;
