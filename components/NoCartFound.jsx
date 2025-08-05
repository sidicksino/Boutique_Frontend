import { styles } from "@/assets/style/noFound.style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const NoCartFound = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons
        name="cart-outline"
        size={200}
        style={styles.noFoundIcon}
      />
      <Text style={styles.title}>Oops... panier vide !</Text>

      <Text style={styles.subtitle}>
        Il semble que vous n’ayez rien ajouté pour le moment. Explorez nos
        sélections et faites-vous plaisir sur{"  "}
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Text style={styles.subtitleName}>Boutique Sino</Text>
        </TouchableOpacity>
        ✨
      </Text>
    </View>
  );
};

export default NoCartFound;
