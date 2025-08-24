// components/ChatButton.tsx
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useRef } from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ChatButton() {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = async () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(async () => {
      const role = await AsyncStorage.getItem("userRole");
      if (role === "Admin") {
        router.push("/chat/ChatMonitor"); // 👉 Admin voit tout
      } else {
        router.push("/chat/ChatPage"); // 👉 Client voit son chat
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[styles.chatStyle, { transform: [{ scale: scaleAnim }] }]}
      >
        <Ionicons name="chatbubbles-sharp" size={28} color="white" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = (COLORS) =>
  StyleSheet.create({
    chatStyle: {
      position: "absolute",
      bottom: 100,
      right: 20,
      width: 60,
      height: 60,
      backgroundColor: COLORS.primary,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
      zIndex: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  });