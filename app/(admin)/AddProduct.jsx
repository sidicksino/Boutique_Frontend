import styles from "@/assets/style/addProduct.style";
import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddProduct = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null); // base64
  const [loading, setLoading] = useState(false);
  // State
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch des catégories
  useEffect(() => {
    fetch("https://boutique-backend-47jo.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.warn("Format inattendu des catégories:", data);
          setCategories([]); // éviter erreur
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "We need camera roll permissions to upload an image"
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImage(asset.uri);

        if (asset.base64) {
          setImageBase64(asset.base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !price || !imageBase64 || !categoryId) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType
        ? `image/${fileType.toLowerCase()}`
        : "image/jpeg";
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      const response = await fetch(
        `https://boutique-backend-47jo.onrender.com/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            price,
            discount_percentage: parseFloat(discountPercentage),
            image_url: imageDataUrl,
            in_stock: inStock,
            is_favorite: isFavorite,
            category_id: parseInt(categoryId),
          }),
        }
      );

      const text = await response.text(); 
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.warn("Response is not JSON, probably HTML error page");
        throw new Error(`Server returned non-JSON: ${text}`);
      }

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      Alert.alert("Success", "Product has been added!");
      setName("");
      setDescription("");
      setPrice("");
      setDiscountPercentage(0);
      setCategoryId(0);
      setInStock(false);
      setIsFavorite(false);
      setImage(null);
      setImageBase64(null);
    } catch (error) {
      console.error("Error creating product:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.scrollViewStyle}
        >
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Add New Product Here</Text>
              <Text style={styles.subtitle}>
                Share your products with others
              </Text>
            </View>

            <View style={styles.form}>
              {/* Product Name */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Product Name</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="albums-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Product name"
                    placeholderTextColor={COLORS.text}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Product Description */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Product Description</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      { height: 80, textAlignVertical: "top" },
                    ]}
                    placeholder="Enter product description"
                    placeholderTextColor={COLORS.text}
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
              </View>

              {/* Product Price */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Price</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="cash-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter price"
                    placeholderTextColor={COLORS.text}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Discount Percentage */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Discount %</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="pricetag-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter discount percentage"
                    placeholderTextColor={COLORS.text}
                    value={discountPercentage.toString()}
                    onChangeText={(val) => setDiscountPercentage(Number(val))}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Product Category */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoriesContainer}>
                  {categories.length === 0 ? (
                    <Text style={{ color: COLORS.text }}>
                      Loading categories...
                    </Text>
                  ) : (
                    categories.map((category) => {
                      const isSelected =
                        selectedCategory === category.category_id;
                      return (
                        <TouchableOpacity
                          key={category.category_id}
                          style={[
                            styles.categoryButton,
                            isSelected && styles.categoryButtonActive,
                          ]}
                          onPress={() => {
                            setSelectedCategory(category.category_id);
                            setCategoryId(category.category_id);
                          }}
                        >
                          <Text
                            style={[
                              styles.categoryButtonText,
                              isSelected && styles.categoryButtonTextActive,
                            ]}
                          >
                            {category.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  )}
                </View>
              </View>

              {/* In Stock */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>In Stock</Text>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    {
                      backgroundColor: inStock
                        ? COLORS.primary
                        : COLORS.background,
                    },
                  ]}
                  onPress={() => setInStock(!inStock)}
                >
                  <Ionicons
                    name={inStock ? "checkmark-circle" : "close-circle"}
                    size={24}
                    color={inStock ? COLORS.background : COLORS.primary}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      { color: inStock ? COLORS.background : COLORS.primary },
                    ]}
                  >
                    {inStock ? "Available" : "Not Available"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Is Favorite */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Favorite</Text>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    {
                      backgroundColor: isFavorite
                        ? COLORS.primary
                        : COLORS.background,
                    },
                  ]}
                  onPress={() => setIsFavorite(!isFavorite)}
                >
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavorite ? COLORS.background : COLORS.primary}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      {
                        color: isFavorite ? COLORS.background : COLORS.primary,
                      },
                    ]}
                  >
                    {isFavorite ? "Favorite" : "Not Favorite"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Product Image */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Product Image</Text>
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={pickImage}
                >
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Ionicons
                        name="image-outline"
                        size={40}
                        color={COLORS.primary}
                      />
                      <Text style={styles.placeholderText}>
                        Tap to select image
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={20}
                      color={COLORS.white}
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Add Product</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

export default AddProduct;
