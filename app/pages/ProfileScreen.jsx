import { styles } from "@/assets/style/profil.style";
import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const navigation = useNavigation();

  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("userToken");
          router.replace("/auth/welcomScreen");
        },
      },
    ]);
  };

  const handleChangeLanguage = () => {
    // Implement language change logic here
    Alert.alert("Language", "Select your preferred language");
  };

  const handleChangePassword = () => {
    // Navigate to change password screen
    router.push("/auth/changePassword");
  };

  return (
    <SafeScreen>
      <ScrollView style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="left" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/phote.jpeg")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit-2" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Sidick Abdoulaye</Text>
          <Text style={styles.profession}>Mobile Developer</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoItem}>
            <MaterialIcons name="email" size={24} color={COLORS.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>
                sidickabdoulayesion1@gmail.com
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Feather name="phone" size={24} color={COLORS.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>+123 456 7890</Text>
            </View>
            <TouchableOpacity>
              <Feather name="edit-2" size={18} color={COLORS.expense} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="location-outline"
              size={24}
              color={COLORS.primary}
            />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>New York, USA</Text>
            </View>
            <TouchableOpacity>
              <Feather name="edit-2" size={18} color={COLORS.expense} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleChangePassword}
          >
            <Ionicons name="key-outline" size={24} color={COLORS.primary} />
            <Text style={styles.settingText}>Change Password</Text>
            <AntDesign name="right" size={18} color={COLORS.expense} />
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <Ionicons name="moon-outline" size={24} color={COLORS.primary} />
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              trackColor={{ false: COLORS.expense, true: COLORS.primary }}
              thumbColor={isDarkMode ? COLORS.white : COLORS.white}
              onValueChange={toggleSwitch}
              value={isDarkMode}
            />
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleChangeLanguage}
          >
            <Ionicons
              name="language-outline"
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.settingText}>Language</Text>
            <View style={styles.languageSelection}>
              <Text style={styles.languageText}>{language}</Text>
              <AntDesign name="right" size={18} color={COLORS.expense} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

export default ProfileScreen;
