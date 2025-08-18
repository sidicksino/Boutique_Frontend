import { getStyles } from "@/assets/style/home.style";
import Header from "@/components/Header";
import NoOrderFound from "@/components/NoOrderFound";
import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const CommandeScreen = () => {

  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  
  return (
    <View style={styles.container}>
      <Header />
      <NoOrderFound/>
    </View>
  );
};

export default CommandeScreen;
