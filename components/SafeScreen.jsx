import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }) => {
  const { COLORS } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom ,flex: 1, backgroundColor: COLORS.background }}>
      {children}
    </View>
  );
};

export default SafeScreen;