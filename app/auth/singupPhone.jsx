import { getStyles } from "@/assets/style/auth.styles";
import { API_URL } from "@/constants/api";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemeContext } from "../../context/ThemeContext";

const SignUpPhoneScreen = () => {

  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    setLoading(true);
    if (!phone || !password) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }

    // Vérification du format du numéro de téléphone
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Format international
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number");
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
          phone_number: phone,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created ");
        router.push("/auth/loginScreen");
      } else {
        alert(data.message || "Registration failed ");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
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

        <Text style={styles.title}>Register with Phone</Text>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={phone}
          placeholderTextColor="#9A8478"
          placeholder="Enter your phone number"
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
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
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/loginScreen")}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpPhoneScreen;
