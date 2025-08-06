import { styles } from "@/assets/style/auth.styles";
import { API_URL } from "@/constants/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = () => {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLoginPress = async () => {
    setError(""); // réinitialiser l’erreur à chaque tentative

    setLoading(true);

    if (!emailOrPhone || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhone: emailOrPhone,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token);
        router.push("/(tabs)");
      } else if (response.status === 401) {
        setError("Email or password incorrect");
      } else if (response.status === 404) {
        setError("User not found. Please register.");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Server error. Please try again later.");
    } finally {
      // désactive le loading à la fin (succès ou erreur)
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
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
          contentFit="cover"
        />

        <Text style={styles.title}>Login</Text>

        {/* Message d'erreur affiché ici */}
        {error !== "" && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color="#E74C3C" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color="#9A8478" />
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailOrPhone}
          placeholderTextColor="#9A8478"
          placeholder="Enter your phone number or email"
          onChangeText={(email) => setEmailOrPhone(email)}
          textContentType="username"
          autoComplete="email"
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="#9A8478"
            secureTextEntry={!showPassword}
            onChangeText={(password) => setPassword(password)}
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
        <TouchableOpacity onPress={() => router.push("/auth/forgetPassword")}>
          <Text style={styles.forgetText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onLoginPress}
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
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/onboarding")}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
