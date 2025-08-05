import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  noFoundIcon: {
    color: COLORS.primary,
    opacity: 0.3,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 28,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "justify",
    paddingHorizontal: 25,
    letterSpacing: 2,
  },
  subtitleName:{
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "justify",
    letterSpacing: 2,
    top: 6,
  },
});
