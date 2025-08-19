import { ThemeContext } from "@/context/ThemeContext";
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
  const { COLORS } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Image
        source={require("../assets/images/logo1.png")}
        style={styles.image}
      />
      <Text style={[styles.title, { color: COLORS.text }]}>Oops! Page not found</Text>
      <Text style={styles.subtitle}>
        It seems the page you are looking for does not exist.
      </Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.primary }]} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
