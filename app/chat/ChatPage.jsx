import SafeScreen from "@/components/SafeScreen";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useRef } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatPage() {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const flatListRef = useRef(null);
  const router = useRouter();

  // 💬 Messages mock
  const messages = [
    {
      id: "1",
      message: "Bonjour, comment puis-je vous aider ?",
      sender_type: "admin",
      time: "10:00",
    },
    {
      id: "2",
      message: "J’ai un souci avec ma commande.",
      sender_type: "user",
      time: "10:02",
    },
  ];

  const profilePress = () => {
    router.push("pages/ProfileScreen");
  };

  return (
    <SafeScreen>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={profilePress} style={styles.logoSocial}>
          <Image
            source={require("../../assets/images/avatar.jpeg")}
            style={styles.headerLogo}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Support Client</Text>
          <Text style={styles.headerSubtitle}>En ligne</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenu */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* 💬 Liste des messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender_type === "user" && styles.userContainer,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  item.sender_type === "user"
                    ? [styles.userBubble, { backgroundColor: COLORS.primary }]
                    : styles.adminBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.sender_type === "user"
                      ? styles.userText
                      : styles.adminText,
                  ]}
                >
                  {item.message}
                </Text>
                <View style={styles.messageMeta}>
                  <Text
                    style={[
                      styles.timeText,
                      item.sender_type === "user"
                        ? styles.userTimeText
                        : styles.adminTimeText,
                    ]}
                  >
                    {item.time}
                  </Text>
                  {item.sender_type === "user" && (
                    <Ionicons
                      name="checkmark-done"
                      size={12}
                      color="rgba(255, 255, 255, 0.7)"
                      style={styles.statusIcon}
                    />
                  )}
                </View>
              </View>
            </View>
          )}
        />

        {/* ✍️ Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { backgroundColor: "white" }]}
              placeholder="Écrire un message..."
              placeholderTextColor="#888"
              multiline
              maxLength={500}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: COLORS.primary }]}
              accessibilityLabel="Envoyer le message"
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

const getStyles = (COLORS) =>
  StyleSheet.create({
    flex: { flex: 1 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.primary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    headerLogo: {
      width: 44,
      height: 44,
      borderRadius: 50,
      marginHorizontal: 5,
      marginRight: 25
    },
    backButton: { marginRight: 16 },
    headerInfo: { flex: 1 },
    headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
    headerSubtitle: { color: "rgba(255, 255, 255, 0.8)", fontSize: 13 },
    headerIcon: { marginLeft: 16 },
    list: {
      padding: 16,
      paddingBottom: 80,
      backgroundColor: COLORS.background,
    },
    messageContainer: {
      marginBottom: 8,
      flexDirection: "row",
    },
    userContainer: {
      justifyContent: "flex-end",
    },
    messageBubble: {
      maxWidth: "80%",
      padding: 12,
      borderRadius: 8,
      marginBottom: 4,
    },
    userBubble: {
      borderTopRightRadius: 2,
      backgroundColor: "#075E54",
    },
    adminBubble: {
      borderTopLeftRadius: 2,
      backgroundColor: "white",
    },
    messageText: {
      fontSize: 16,
      marginBottom: 4,
    },
    userText: {
      color: "white",
    },
    adminText: {
      color: "black",
    },
    messageMeta: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    timeText: {
      fontSize: 12,
      marginRight: 4,
    },
    userTimeText: {
      color: "rgba(255, 255, 255, 0.7)",
    },
    adminTimeText: {
      color: "rgba(0, 0, 0, 0.5)",
    },
    statusIcon: {
      marginLeft: 2,
    },
    inputContainer: {
      padding: 12,
      backgroundColor: COLORS.background,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === "ios" ? 10 : 8,
      fontSize: 16,
      maxHeight: 100,
      marginRight: 10,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#075E54",
    },
  });
