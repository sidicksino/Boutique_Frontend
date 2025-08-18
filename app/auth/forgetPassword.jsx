import { getStyles } from "@/assets/style/auth.styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemeContext } from "../../context/ThemeContext";

const ForgetPassword = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onForgetPress = async () => {
    if (!emailOrPhone.trim()) {
      setError("Please enter your email or phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://boutique-backend-47jo.onrender.com/api/resetPassword/requestReset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gestion spécifique des erreurs connues
        if (data.error === "User not found") {
          setError("No account found with this email or phone number");
        } else if (data.message) {
          setError(data.message);
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
        return;
      }

      // Navigue vers l'écran de vérification
      router.push({
        pathname: '/auth/verifyCode',
        params: { emailOrPhone },
      });

    } catch (error) {
      console.error("Erreur lors de l'envoi du code :", error.message);
      setError("Failed to send code. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.containers}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
          contentFit="cover"
        />

        <Text style={styles.title}>Forgot Password</Text>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailOrPhone}
          placeholderTextColor="#9A8478"
          placeholder="Enter your phone number or email"
          onChangeText={(text) => {
            setEmailOrPhone(text);
            setError("");
          }}
          textContentType="username"
          autoComplete="email"
        />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={onForgetPress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Sending..." : "Send OTP"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;