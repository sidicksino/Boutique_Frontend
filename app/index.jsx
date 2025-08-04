import { styles } from "@/assets/style/home.style";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, View } from "react-native";

export default function Index() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('auth/welcomScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.welcome}>
      <Image source={require('../assets/images/image.png')} 
       style = {styles.welcomeImage}
      />
    </View>
  );
}
