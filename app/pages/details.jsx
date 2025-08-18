import { getStyles } from "@/assets/style/datail.style";
import SafeScreen from "@/components/SafeScreen";
import { ThemeContext } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useCart } from "../../context/CartContext";

const DetailsScreen = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const { product } = useLocalSearchParams();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const parsedProduct =
    typeof product === "string" ? JSON.parse(product) : product;

  const handleAddToCart = () => {
    addToCart(parsedProduct, quantity);

    Toast.show({
      type: "success",
      text1: "Product added",
      text2: `${quantity} item(s) added to cart`,
      position: "top",
      visibilityTime: 2000,
      topOffset: 50,
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10)); // Limite à 10
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1)); // Minimum 1
  };

  return (
    <SafeScreen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image en-tête avec bouton retour */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: parsedProduct.image_url }}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Contenu produit */}
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{parsedProduct.name}</Text>
            <Text style={styles.price}>${parsedProduct.price}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {parsedProduct.description || "No description available."}
          </Text>

          <View style={styles.divider} />

          {/* Informations supplémentaires */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Stock:</Text>
              <Text style={styles.infoValue}>
                {parsedProduct.stock || "In stock"}
              </Text>
            </View>
          </View>

          {/* Sélecteur de quantité */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <AntDesign
                  name="minus"
                  size={20}
                  color={quantity <= 1 ? COLORS.lightGray : COLORS.text}
                />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
                disabled={quantity >= 10}
              >
                <AntDesign
                  name="plus"
                  size={20}
                  color={quantity >= 10 ? COLORS.lightGray : COLORS.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
            <AntDesign name="shoppingcart" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default DetailsScreen;
