// app/auth/EditNameScreen.js

import { API_URL } from "@/constants/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

export default function EditNameScreen() {
  const router = useRouter();
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charger le nom actuel
  useEffect(() => {
    const loadName = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) return router.replace("/auth/loginScreen");

        const res = await fetch(`${API_URL}/api/me/getUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await res.json();
        if (res.ok) {
          setName(userData.name || "");
        }
      } catch (err) {
        Alert.alert("Error", "Failed to load name");
      }
    };

    loadName();
  }, []);

  const handleSave = async () => {
    setError("");
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (name.trim().length < 2 || name.trim().length > 50) {
      setError("Name must be 2–50 characters");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "Session expired.");
        return router.replace("/auth/loginScreen");
      }

      const response = await fetch(`${API_URL}/api/me/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Name updated successfully!");
        router.back();
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Name</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor="#9A8478"
          maxLength={50}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.saveButtonText}>Save Name</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const getStyles = (COLORS) => ({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 50,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
    flex: 1,
  },
  inputContainer: { padding: 16 },
  label: { fontSize: 16, color: COLORS.text, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.card,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
  saveButton: {
    margin: 16,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});