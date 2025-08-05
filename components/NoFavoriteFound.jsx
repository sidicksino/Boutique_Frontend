import { styles } from "@/assets/style/noFound.style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const NoFavoriteFound = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons
        name="heart-dislike-outline"
        size={200}
        style={styles.noFoundIcon}
      />
      <Text style={styles.title}>Aucun favori pour le moment</Text>
      <Text style={styles.subtitle}>
        Ajoutez vos articles préférés à votre liste de souhaits pour les
        retrouver facilement plus tard sur
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Text style={styles.subtitleName}>Boutique Sino.</Text>
        </TouchableOpacity>
        ✨
      </Text>
    </View>
  );
};

export default NoFavoriteFound;
