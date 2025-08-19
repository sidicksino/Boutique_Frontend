import { getStyles } from "@/assets/style/profil.style";
import SafeScreen from "@/components/SafeScreen";
import { useCart } from "@/context/CartContext";
import { ThemeContext } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useContext, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { COLORS, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const [language, setLanguage] = useState("English");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useCart();

  // Utilise useFocusEffect à la place de useEffect
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) {
            router.replace("/auth/loginScreen");
            return;
          }

          // URL corrigée : pas d'espaces
          const response = await fetch("https://boutique-backend-47jo.onrender.com/api/me/getUser", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          const text = await response.text();

          let data;
          try {
            data = JSON.parse(text);
          } catch (err) {
            console.log("Invalid JSON:", text);
            throw new Error("Server did not return valid JSON");
          }

          if (!response.ok) {
            throw new Error(data?.error || "Failed to fetch user");
          }

          setUser(data);
          setProfilePhoto(data?.profile_photo);
        } catch (err) {
          console.error("Error fetching user:", err.message);
          Alert.alert("Error", err.message || "Failed to load profile");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("userToken");
          logout();
          router.replace("/auth/welcomScreen");
        },
      },
    ]);
  };

  const handleChangeLanguage = () => {
    Alert.alert("Language", "Select your preferred language");
  };

  const handleChangePassword = () => {
    router.push("/auth/changePassword");
  };

  const pickImageAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        const token = await AsyncStorage.getItem("userToken");

        const uploadRes = await fetch("https://boutique-backend-47jo.onrender.com/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profile_photo: base64Image }),
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.url) {
          throw new Error("Upload failed");
        }

        Alert.alert("Success", "Photo updated!");
        setProfilePhoto(uploadData.url);
      }
    } catch (error) {
      console.error("Upload error:", error.message);
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <SafeScreen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <LottieView
            source={require("../../assets/images/loading.json")}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text style={{ marginTop: 20, fontSize: 16, color: COLORS.primary }}>
            Loading profile...
          </Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={() => router.push("/auth/EditNameScreen")}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={
                profilePhoto
                  ? { uri: profilePhoto }
                  : require("../../assets/images/avatar.jpeg")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editIcon} onPress={pickImageAndUpload}>
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          {/* Modal */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              />
              <View style={styles.modalContent}>
                <Image
                  source={
                    profilePhoto
                      ? { uri: profilePhoto }
                      : require("../../assets/images/avatar.jpeg")
                  }
                  style={styles.fullImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <Text style={styles.profession}>
          {user?.role === "Admin" ? "Administrator" : "Client"}
        </Text>
      </View>

      <ScrollView style={styles.container}>
        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {/* Email */}
          <View style={styles.infoItem}>
            <MaterialIcons name="email" size={24} color={COLORS.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email || "No email"}</Text>
            </View>
            {user?.provider === "phone" && (
              <TouchableOpacity
                onPress={() =>
                  router.push(`/auth/EditEmailPhoneScreen?provider=${user.provider}`)
                }
              >
                <Feather name="edit-2" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Phone */}
          <View style={styles.infoItem}>
            <Feather name="phone" size={24} color={COLORS.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>
                {user?.phone_number || "No phone number"}
              </Text>
            </View>
            {user?.provider === "email" && (
              <TouchableOpacity
                onPress={() =>
                  router.push(`/auth/EditEmailPhoneScreen?provider=${user.provider}`)
                }
              >
                <Feather name="edit-2" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Name */}
          <View style={styles.infoItem}>
            <Feather name="user" size={24} color={COLORS.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>
                {user?.name || "No name available"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/auth/EditNameScreen",
                  params: { currentName: user?.name },
                })
              }
            >
              <Feather name="edit-2" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
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
              thumbColor={COLORS.white}
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleChangeLanguage}
          >
            <Ionicons name="language-outline" size={24} color={COLORS.primary} />
            <Text style={styles.settingText}>Language</Text>
            <View style={styles.languageSelection}>
              <Text style={styles.languageText}>{language}</Text>
              <AntDesign name="right" size={18} color={COLORS.expense} />
            </View>
          </TouchableOpacity>
        </View>

        {user?.role === "Admin" && (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.push("/(admin)")}
          >
            <Text style={styles.adminText}>Access to your dashboard</Text>
          </TouchableOpacity>
        )}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

export default ProfileScreen;