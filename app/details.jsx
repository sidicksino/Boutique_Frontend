import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/style/datail.style";

const DetailsScreen = () => {
  const { product } = useLocalSearchParams();
  const navigation = useNavigation();

  const parsedProduct =
    typeof product === "string" ? JSON.parse(product) : product;

  return (
    <SafeScreen>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.productContainer}>
          <Image
            source={{ uri: parsedProduct.image_url }}
            style={styles.image}
          />

          <Text style={styles.name}>{parsedProduct.name}</Text>
          <Text style={styles.price}>${parsedProduct.price}</Text>
          <Text style={styles.description}>
            {parsedProduct.description || "No description available."}
          </Text>
          <TouchableOpacity
            style={styles.addBottom}
            onPress={() => alert("Added to cart!")}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
};

export default DetailsScreen;
