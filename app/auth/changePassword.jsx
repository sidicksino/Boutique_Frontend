import { getStyles } from "@/assets/style/auth.styles";
import { API_URL } from "@/constants/api";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { ThemeContext } from "../../context/ThemeContext";

const ChangePassword = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState(""); // Fixed naming
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const onChangePasswrdPress = async () => {
    setError("");
    setLoading(true);
    Keyboard.dismiss(); // Dismiss keyboard

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

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setError("Authentication token missing");
        setLoading(false);
        router.replace("/auth/loginScreen");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/resetPassword/changePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password,
            newPassword,
            confirmNewpassword, // Fixed key name
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Password updated",
          text2: data.message,
          position: "top",
          visibilityTime: 2000,
          topOffset: 50,
        });

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        setError(data.message || "Failed to change password");
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
      extraHeight={200}
      extraScrollHeight={100}
      keyboardOpeningTime={0}
      scrollEnabled={true}
      behavior="padding" 
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
            secureTextEntry={!showConfirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
          >
            <Ionicons
              name={showConfirmNewPassword ? "eye-outline" : "eye-off-outline"}
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
