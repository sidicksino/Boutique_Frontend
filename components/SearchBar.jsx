import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = ({ value, onChangeText, placeholder, onBackPress }) => {
  const { COLORS } = React.useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.card, borderColor: COLORS.border }]}>
      
      {/* Bouton back */}
      <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      {/* Input */}
      <TextInput
        style={[styles.input, { color: COLORS.text }]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        autoFocus
      />

      {/* Bouton close */}
      {value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.iconButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 5,
  },
});

export default SearchBar;
