import SafeScreen from "@/components/SafeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    router.replace("/auth/welcomScreen");
  };

  return (
    <SafeScreen>
      <View>
        <Text>Dark Mode</Text>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

export default ProfileScreen;
