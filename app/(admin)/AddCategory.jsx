import getStyles from "@/assets/style/addCategory.style";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React, { useContext, useState } from "react";
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
import { ThemeContext } from "../../context/ThemeContext";

const AddCategory = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // URI
  const [imageBase64, setImageBase64] = useState(null); // base64
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
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
    if (!name || !imageBase64) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    try {
      setLoading(true);
  
      // Récupérer l'extension de fichier
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
  
      // Construire l'image en base64 pour Cloudinary
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;
  
      const response = await fetch(`https://boutique-backend-47jo.onrender.com/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // si protégé par JWT
        },
        body: JSON.stringify({
          name,
          image_url: imageDataUrl,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
  
      Alert.alert("Success", "Category has been added!");
      setName("");
      setImage(null);
      setImageBase64(null);
    } catch (error) {
      console.error("Error creating category:", error);
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Add New Category Here</Text>
              <Text style={styles.subtitle}>
                Share your favorite category with others
              </Text>
            </View>

            <View style={styles.form}>
              {/* Category Name */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Category Name</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="pricetag-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter category name"
                    placeholderTextColor={COLORS.text}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* IMAGE */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Category Image</Text>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.previewImage} />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Ionicons name="image-outline" size={40} color={COLORS.primary} />
                      <Text style={styles.placeholderText}>
                        Tap to select image
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
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
                    <Text style={styles.buttonText}>Add Category</Text>
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

export default AddCategory;
