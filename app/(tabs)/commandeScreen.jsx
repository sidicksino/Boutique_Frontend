import { styles } from "@/assets/style/home.style";
import Header from "@/components/Header";
import NoOrderFound from "@/components/NoOrderFound";
import React from "react";
import { View } from "react-native";

const CommandeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NoOrderFound/>
    </View>
  );
};

export default CommandeScreen;
