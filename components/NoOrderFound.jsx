import { styles } from "@/assets/style/noFound.style";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const NoOrderFound = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="receipt-outline" size={180} style={styles.noFoundIcon} />
      <Text style={styles.title}>Aucune commande pour le moment</Text>
      <Text style={styles.subtitle}>
        Vous n’avez encore passé aucune commande.{" "}
        Commencez à explorer nos produits et trouvez ce qui vous plaît sur{" "}
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Text style={styles.subtitleName}>Boutique Sino</Text>
        </TouchableOpacity>
        ✨
      </Text>
    </View>
  );
};

export default NoOrderFound;
