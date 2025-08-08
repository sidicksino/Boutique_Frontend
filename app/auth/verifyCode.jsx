import { styles } from "@/assets/style/auth.styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const VerifyCode = () => {
  const router = useRouter();
  const { emailOrPhone } = useLocalSearchParams();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Ajout du loading state

  const onVerify = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      const response = await fetch(
        "https://boutique-backend-47jo.onrender.com/api/resetPassword/verifyCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }), // Seul le code est nécessaire
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Invalid or expired code");
      }

      // Navigue vers l'écran de reset avec le user_id
      router.push({
        pathname: "/auth/resetPassword",
        params: { user_id: data.user_id }, // Envoie le user_id au lieu de emailOrPhone
      });
    } catch (err) {
      setError(err.message);
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
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
          contentFit="cover"
        />
        <Text style={styles.title}>Enter Verification Code</Text>        
        <TextInput
          style={styles.input}
          placeholder="Enter code"
          keyboardType="numeric"
          onChangeText={setCode}
          value={code}
          editable={!isLoading}
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.disabledButton]} 
          onPress={onVerify}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VerifyCode;