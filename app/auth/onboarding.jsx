import { styles } from "@/assets/style/welcom.styles";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

const Onboarding = () => {
  const router = useRouter();

  const onSignPhonePress = () => {
    router.push('/auth/singupPhone');
  };

  const onSignUpPress = () => {
    router.push('/auth/singupScreen');
  };

  const googlePress = () => {
    console.log("Google Pressed");
    // router.push('/auth/singupPhone');
  };

  const facebookPress = () => {
    console.log("Facebook Pressed");
    // router.push('/auth/singupPhone');
  };

  const applePress = () => {
    console.log("Apple Pressed");
    // router.push('/auth/singupPhone');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/revenue-i3.png")}
        style={styles.illustration}
        contentFit="cover"
      />
      <Text style={styles.title}>Sign up to our app and start now</Text>
      <TouchableOpacity style={styles.button} onPress={onSignPhonePress}>
      <Ionicons name="call-outline" color={COLORS.white} size={25}/>
        <Text style={styles.buttonText}>Register with Phone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
        <Ionicons name="mail-outline" color={COLORS.white} size={25}/>
        <Text style={styles.buttonText}>Register with Gmail</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.footerText} >OR SIGN IN WITH</Text>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={googlePress} style={styles.logoSocial}>
          <Ionicons name="logo-google" size={25} style={styles.social}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={facebookPress} style={styles.logoSocial}>
          <Ionicons name="logo-facebook" size={25} style={styles.social}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={applePress} style={styles.logoSocial}>
          <Ionicons name="logo-apple" size={25} style={styles.social}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
