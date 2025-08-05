import { styles } from "@/assets/style/auth.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const ResetPassword = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const onResetPress = async () => {
    setError("");

    // Vérifier si les champs sont vides
    if (!password || !passwordConfirm) {
      setError("Please fill in both fields");
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    // Appel API ici si tu en as une
    console.log("Password reset confirmed");
    // Ex: await fetch(...)

    // Rediriger ou afficher un message de succès
    router.push("/auth/loginScreen");
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

        <Text style={styles.title}>Reset Password</Text>

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
          value={password}
          placeholder="Enter new password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={styles.input}
          value={passwordConfirm}
          placeholder="Confirm new password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(text) => setPasswordConfirm(text)}
        />

        <TouchableOpacity style={styles.button} onPress={onResetPress}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;
