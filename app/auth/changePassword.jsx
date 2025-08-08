import { styles } from "@/assets/style/auth.styles";
import { API_URL } from "@/constants/api";
import { COLORS } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewpassword, setShowConfirmNewpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const onChangePasswrdPress = async () => {
    setError(""); // reset erreur
    setLoading(true);

    if (!password || !newPassword || !confirmNewpassword) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmNewpassword) {
      setError("New password and confirmation do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // succès
        setLoading(false);
        alert("Password changed successfully!");
        // Tu peux aussi rediriger, vider les champs, etc.
      } else {
        setError(data.error || "Failed to change password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.containers}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ margin: 10 }}
      >
        <AntDesign name="left" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
          contentFit="cover"
        />
        <Text style={styles.title}>Change Password</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="#9A8478"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#9A8478"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            placeholder="Enter new password"
            placeholderTextColor="#9A8478"
            secureTextEntry={!showNewPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Ionicons
              name={showNewPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#9A8478"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={confirmNewpassword}
            placeholder="Confirm new password"
            placeholderTextColor="#9A8478"
            secureTextEntry={!showConfirmNewpassword}
            onChangeText={setConfirmNewpassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmNewpassword(!showConfirmNewpassword)}
          >
            <Ionicons
              name={showConfirmNewpassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#9A8478"
            />
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={onChangePasswrdPress}
          disabled={loading}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading && (
              <ActivityIndicator
                color="#fff"
                size="small"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={styles.buttonText}>Change Password</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChangePassword;
