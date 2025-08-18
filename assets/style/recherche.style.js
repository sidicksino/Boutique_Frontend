import { StyleSheet } from "react-native";

export const getStyles = (COLORS) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      padding: 16,
    },
    searchInput: {
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 10,
      padding: 10,
      color: COLORS.text,
      marginBottom: 16,
    },
    resultItem: {
      padding: 15,
      backgroundColor: COLORS.card,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
      borderRadius: 8,
      marginBottom: 10,
    },
  });
