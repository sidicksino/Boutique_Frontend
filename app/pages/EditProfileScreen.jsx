import { styles } from "@/assets/style/editProfil.style";
import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [preferences, setPreferences] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const res = await fetch("https://boutique-backend-47jo.onrender.com/api/me/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
          setName(data.name || "");
          setProfilePhoto(data.profile_photo || "");
          setPreferences(data.preferences || "");
        } else {
          Alert.alert("Error", data.error || "Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await fetch("https://boutique-backend-47jo.onrender.com/api/me/updateProfile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          profile_photo: profilePhoto,
          preferences,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.error || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Server error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeScreen>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 10 }}>Loading profile...</Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.sectionTitle}>Edit Profile</Text>

        <View style={styles.photoContainer}>
          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={{ color: COLORS.gray }}>No photo</Text>
            </View>
          )}
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />

        <Text style={styles.infoLabel}>Profile Photo URL</Text>
        <TextInput
          style={styles.input}
          value={profilePhoto}
          onChangeText={setProfilePhoto}
          placeholder="https://example.com/photo.jpg"
        />

        <Text style={styles.infoLabel}>Preferences (JSON format)</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          value={preferences}
          onChangeText={setPreferences}
          placeholder='{ "darkMode": true }'
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

export default EditProfileScreen;
