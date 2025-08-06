import { styles } from "@/assets/style/auth.styles";
import { API_URL } from "@/constants/api";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = () => {

  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSignUpPress = async () => {
    setLoading(true);
    if (!emailAddress || !password) {
      alert("Please fill all fields");
      setLoading(false)
      return;
    }
    // Vérification du format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Vérification de la longueur du mot de passe
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Vérification que le mot de passe contient au moins une lettre et un chiffre
    if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(password)) {
      alert("Password must include at least one letter and one number");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created ");
        router.push("/auth/loginScreen");
      } else if (response.status === 409) {
        alert("This email is already registered");
      } else {
        alert(data.message || "Registration failed ");
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }finally {
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

        <Text style={styles.title}>Register with Gmail</Text>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholderTextColor="#9A8478"
          placeholder="Enter your email"
          onChangeText={(email) => setEmailAddress(email)}
          textContentType="username"
          autoComplete="email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

<TouchableOpacity
          style={styles.button}
          onPress={onSignUpPress}
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
            <Text style={styles.buttonText}>
              {loading ? "Signing up..." : "Sign Up"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/loginScreen")}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
