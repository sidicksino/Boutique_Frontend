// app/auth/EditEmailPhoneScreen.js

import { API_URL } from "@/constants/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function EditEmailPhoneScreen() {
  const router = useRouter();
  const { provider } = useLocalSearchParams(); // "email" ou "phone"
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Détermine quel champ on modifie
  const editableField = provider === "email" ? "phone_number" : "email";
  const placeholder = editableField === "email" ? "Enter new email" : "Enter new phone";
  const label = editableField === "email" ? "Email" : "Phone Number";
  const keyboardType = editableField === "email" ? "email-address" : "phone-pad";

  // Charger la valeur actuelle du champ modifiable
  useEffect(() => {
    const loadValue = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("Error", "Session expired.");
          return router.replace("/auth/loginScreen");
        }

        const res = await fetch(`${API_URL}/api/me/getUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await res.json();
        if (res.ok) {
          // Charger le champ qu'on peut modifier
          setValue(userData[editableField] || "");
        } else {
          Alert.alert("Error", "Failed to load profile data");
        }
      } catch (err) {
        Alert.alert("Error", "Network issue. Please try again.");
      }
    };

    loadValue();
  }, [provider, editableField]);

  const validateAndSubmit = async () => {
    setError("");
    setLoading(true);

    if (!value.trim()) {
      setError(`${label} is required`);
      setLoading(false);
      return;
    }

    // Validation
    if (editableField === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }
    }

    if (editableField === "phone_number") {
      const phoneRegex = /^[0-9]{8,15}$/;
      const cleanPhone = value.replace(/\s/g, "");
      if (!phoneRegex.test(cleanPhone)) {
        setError("Phone must be 8–15 digits");
        setLoading(false);
        return;
      }
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "Session expired.");
        return router.replace("/auth/loginScreen");
      }

      const response = await fetch(`${API_URL}/api/me/updateContact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [editableField]: editableField === "phone_number" ? value.replace(/\s/g, "") : value.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", `${label} updated successfully!`);
        router.back();
      } else {
        setError(data.error || data.message || "Update failed. Please try again.");
      }      
    } catch (err) {
      setError("Network error. Please check your connection.");
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
        <Text style={styles.headerTitle}>Edit {label}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#9A8478"
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={validateAndSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.saveButtonText}>Save {label}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles (inchangés)
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