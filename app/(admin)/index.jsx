import { styles } from "@/assets/style/admin.style";
import HeaderCategory from "@/components/HeaderCategoryDetail";
import SafeScreen from "@/components/SafeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const CategorieAdmin = () => {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <HeaderCategory />
        <View style={styles.line}>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText1}> Categories </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.push("/(admin)/ProductAdmin")}
          >
            <Text style={styles.buttonText2}> Products </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={styles.addContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/(admin)/AddCategory")}>
          <Ionicons name="add-circle-outline" size={24} style={styles.addIcon}/>
          <Text style={styles.addButtonText}>Add Category</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default CategorieAdmin;
