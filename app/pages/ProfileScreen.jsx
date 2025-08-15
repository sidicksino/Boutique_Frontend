import { styles } from "@/assets/style/profil.style";
import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import { useCart } from "@/context/CartContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useCart();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          router.replace("/auth/loginScreen");
          return;
        }

        const response = await fetch(
          "https://boutique-backend-47jo.onrender.com/api/me/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.log(" Not valid JSON:", text);
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
  }, []);

  const toggleSwitch = () => setIsDarkMode((prev) => !prev);

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
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setProfilePhoto(uri);

        const token = await AsyncStorage.getItem("userToken");

        const formData = new FormData();
        formData.append("file", {
          uri,
          name: "profile.jpg",
          type: "image/jpeg",
        });

        const uploadRes = await fetch(
          "https://boutique-backend-47jo.onrender.com/api/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.url) {
          throw new Error("Upload failed");
        }

        const updateRes = await fetch(
          "https://boutique-backend-47jo.onrender.com/api/me/updateProfile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profile_photo: uploadData.url,
            }),
          }
        );

        const updateData = await updateRes.json();

        if (updateRes.ok) {
          Alert.alert("Success", "Photo updated!");
          setProfilePhoto(uploadData.url);
        } else {
          throw new Error(updateData?.error || "Update failed");
        }
      }
    } catch (error) {
      console.error(" Upload error:", error.message);
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <SafeScreen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <LottieView
            source={require('../../assets/images/loading.json')}
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
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="left" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            onPress={() => router.push("/pages/EditProfileScreen")}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {/* Image cliquable pour afficher en grand */}
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
            <TouchableOpacity
              style={styles.editIcon}
              onPress={pickImageAndUpload}
            >
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            {/* Modal corrigé */}
            <Modal
              visible={modalVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                {/* Fond sombre cliquable pour fermer modal */}
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setModalVisible(false)}
                />

                {/* Contenu du modal (image et bouton fermeture) */}
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
          <Text style={styles.name}>{user?.name || "No name available"}</Text>
          <Text style={styles.profession}>
            {user?.role === "Admin" ? "Administrator" : "Client"}
          </Text>
        </View>

        {/* Info */}
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
              <TouchableOpacity onPress={() => router.push("/auth/editEmail")}>
                <Feather name="edit-2" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Phone Number */}
          <View style={styles.infoItem}>
            <Feather name="phone" size={24} color={COLORS.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>
                {user?.phone_number || "Aucun phone number"}
              </Text>
            </View>
            {user?.provider === "email" && (
              <TouchableOpacity onPress={() => router.push("/auth/editPhone")}>
                <Feather name="edit-2" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            )}
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

        {user?.role === "Admin" && (
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/(admin)")}>
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
