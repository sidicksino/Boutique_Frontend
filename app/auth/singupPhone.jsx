import { styles } from "@/assets/style/auth.styles";
import { API_URL } from "@/constants/api";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const SignUpPhoneScreen = () => {
  const onSignUpPress = async () => {
    if (!phone || !password) {
      alert("Please fill all fields");
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
    }
  };
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
          textContentType="telephoneNumber"
          autoComplete="tel"
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
