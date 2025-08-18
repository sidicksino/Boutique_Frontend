import { getStyles } from "@/assets/style/welcom.styles";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React, { useContext } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

const WelcomeScreen = () => {
  const { COLORS } = useContext(ThemeContext); // récupère le thème actuel
  const styles = getStyles(COLORS); // crée les styles dynamiques

  const router = useRouter();

  return (
    <View style={styles.containerWel}>
      <MotiView
        from={{ opacity: 0, translateY: -30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 1000 }}
        style={styles.logoContainerWel}
      >
        <Image
          source={require("../../assets/images/revenue-i4.png")}
          style={styles.logoWel}
          resizeMode="contain"
        />
      </MotiView>

      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 600 }}
        style={styles.titleWel}
      >
        Welcome to
      </MotiText>
      <MotiText
        from={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ delay: 800, duration: 600 }}
        style={styles.brandWel}
      >
        SINO BOUR
      </MotiText>

      <Text style={styles.subtitleWel}>Your all-in-one fashion & tech store</Text>

      <View style={styles.buttonGroupWel}>
        <TouchableOpacity style={styles.buttonWel} onPress={() => router.push("/auth/loginScreen")}>
          <Text style={styles.buttonTextWel}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButtonWel} onPress={() => router.push("/auth/onboarding")}>
          <Text style={styles.outlineButtonTextWel}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
