import { styles } from "@/assets/style/home.style";
import Header from "@/components/Header";
import NoCartFound from "@/components/NoCartFound";
import React from 'react';
import { View } from 'react-native';


const CardScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NoCartFound />
    </View>
  )
}

export default CardScreen