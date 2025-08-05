import { styles } from "@/assets/style/auth.styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgetPassword = () => {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState("");

  const onForgetPress = async () => {
    router.push('/auth/resetPassword')
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

        <Text style={styles.title}>Forgot Password</Text>

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
        <TouchableOpacity style={styles.button} onPress={onForgetPress}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;
