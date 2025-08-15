import { styles } from "@/assets/style/admin.style";
import HeaderCategory from "@/components/HeaderCategoryDetail";
import SafeScreen from "@/components/SafeScreen";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProductAdmin = () => {

  const navigation = useNavigation();
  
  return (
    <SafeScreen>
      <View style={styles.container}>
        <HeaderCategory />
        <View style={styles.line} >
          <TouchableOpacity style={styles.button2} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText2} > Categories </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText1}> Products </Text>
          </TouchableOpacity>
        </View>
        <Text>CategorieAdmin</Text>
      </View>
    </SafeScreen>
  );
};

export default ProductAdmin;
