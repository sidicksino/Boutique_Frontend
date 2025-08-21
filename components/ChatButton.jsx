// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import React, { useContext } from "react";
// import { Pressable, StyleSheet } from "react-native";
// import { ThemeContext } from "../context/ThemeContext";

// const getStyles = (COLORS) =>
//   StyleSheet.create({
//     chatStyle: {
//       position: "absolute",
//       bottom: 100,
//       right: 20,
//       width: 60,
//       height: 60,
//       backgroundColor: COLORS.primary,
//       borderRadius: 30,
//       justifyContent: "center",
//       alignItems: "center",
//       elevation: 5,
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 3,
//     },
//   });

// export default function ChatButton() {
//   const { COLORS } = useContext(ThemeContext);
//   const styles = getStyles(COLORS);
//   const navigation = useNavigation();

//   return (
//     <Pressable
//       style={styles.chatStyle}
//       onPress={() => navigation.navigate("ChatPage")}
//     >
//       <Ionicons name="chatbubbles" size={28} color="white" />
//     </Pressable>
//   );
// }

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useRef } from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ChatButton() {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("ChatPage");
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
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
  });
