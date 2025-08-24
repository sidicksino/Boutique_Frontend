import SafeScreen from "@/components/SafeScreen";
import { ThemeContext } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useNavigation } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatMonitor() {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const conversations = [
    {
      id: "1",
      name: "Sidick Abdoulaye",
      lastMessage: "À demain pour la réunion !",
      time: "18:30",
      unread: 2,
      image: require("../../assets/images/avatar.jpeg"), // Remplacez par vos images
    },
    {
      id: "2",
      name: "Papa",
      lastMessage: "Comment ça va mon fils ?",
      time: "16:45",
      unread: 0,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "3",
      name: "Groupe Famille",
      lastMessage: "Maman: Voici les photos du weekend",
      time: "14:20",
      unread: 105,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "4",
      name: "Hamid Ahmat",
      lastMessage: "Merci pour ton aide",
      time: "12:15",
      unread: 0,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "5",
      name: "Work Team",
      lastMessage: "Jean: J'ai terminé le rapport",
      time: "11:30",
      unread: 10,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "6",
      name: "Nariman Ousman",
      lastMessage: "On se voit où ?",
      time: "Hier",
      unread: 0,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "7",
      name: "Client Pro",
      lastMessage: "Je vous envoie les documents",
      time: "Hier",
      unread: 1,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "8",
      name: "Sidick Abdoulaye",
      lastMessage: "À demain pour la réunion !",
      time: "18:30",
      unread: 2,
      image: require("../../assets/images/avatar.jpeg"), // Remplacez par vos images
    },
    {
      id: "9",
      name: "Papa",
      lastMessage: "Comment ça va mon fils ?",
      time: "16:45",
      unread: 0,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "10",
      name: "Groupe Famille",
      lastMessage: "Maman: Voici les photos du weekend",
      time: "14:20",
      unread: 105,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "11",
      name: "Hamid Ahmat",
      lastMessage: "Merci pour ton aide",
      time: "12:15",
      unread: 0,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "12",
      name: "Work Team",
      lastMessage: "Jean: J'ai terminé le rapport",
      time: "11:30",
      unread: 10,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "13",
      name: "Nariman Ousman",
      lastMessage: "On se voit où ?",
      time: "Hier",
      unread: 0,
      image: require("../../assets/images/avatar.jpeg"),
    },
    {
      id: "14",
      name: "Client Pro",
      lastMessage: "Je vous envoie les documents",
      time: "Hier",
      unread: 1,
      image: require("../../assets/images/avatar.jpeg"),
    },
  ];

  const openChatRoom = (item) => {
    router.push({ pathname: "/chat/ChatPage", params: item });
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.conversationItem} onPress={() => openChatRoom(item)}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.conversationDetails}>
        <View style={styles.conversationHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </SafeAreaView>
    );
  }

  return (
    <SafeScreen>
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCentre}>
          <Text style={styles.headerTitle}>Admin</Text>
        </View>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  );
}

const getStyles = (COLORS) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.primary,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    headerLeft: {
      width: 40,
      alignItems: "flex-start",
    },
    headerCenter: {
      flex: 1,
      alignItems: "center",
    },
    headerRight: {
      width: 40,
      alignItems: "flex-end",
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: COLORS.primary,
    },

    conversationItem: {
      flexDirection: "row",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    conversationDetails: {
      flex: 1,
      justifyContent: "center",
    },
    conversationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
    },
    time: {
      fontSize: 12,
      color: "#888",
    },
    conversationFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    lastMessage: {
      fontSize: 14,
      color: "#888",
      flex: 1,
      marginRight: 8,
    },
    unreadBadge: {
      backgroundColor: "#25D366",
      borderRadius: 15,
      minWidth: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    unreadText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
      paddingHorizontal: 6,
    },
  });
