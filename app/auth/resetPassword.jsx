import { getStyles } from "@/assets/style/auth.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemeContext } from "../../context/ThemeContext";

const ResetPassword = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user_id } = useLocalSearchParams(); // Changé pour utiliser user_id

  const onResetPress = async () => {
    setError("");
  
    // Validation des champs
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields");
      return;
    }
  
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch('https://boutique-backend-47jo.onrender.com/api/resetPassword/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id, 
          newPassword, 
          confirmPassword 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Reset failed");
      }

      // Redirection vers login avec message de succès
      router.push({
        pathname: "/auth/loginScreen",
        params: { resetSuccess: "true" }
      });
  
    } catch (err) {
      console.error("Reset error:", err.message);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.containers}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
          contentFit="cover"
        />

        <Text style={styles.title}>Reset Password</Text>

        {/* Message d'erreur */}
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
          value={newPassword}
          placeholder="Enter new password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(text) => {
            setNewPassword(text);
            setError("");
          }}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          value={confirmPassword}
          placeholder="Confirm new password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setError("");
          }}
          editable={!isLoading}
        />

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.disabledButton]} 
          onPress={onResetPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Reset Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;