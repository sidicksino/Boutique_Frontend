import { COLORS } from "@/constants/colors";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProductDetails() {
  const { product } = useLocalSearchParams();
  const item = JSON.parse(decodeURIComponent(product));

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>
        Ceci est une belle description de produit avec le thème forêt 🍃.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: COLORS.textLight,
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textLight,
  },
});
