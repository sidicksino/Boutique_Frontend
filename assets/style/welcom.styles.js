// styles/auth.styles.js
import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  illustrationLogo: {
    height: 350,
    width: 350,
    resizeMode: "contain",
    alignItems: "center",
    alignSelf: "center",
  },
  illustration: {
    height: 310,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: 15,
    textAlign: "center",
  },
  footerText: {
    color: COLORS.text,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    top: 20,
  },
  logoSocial: {
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  social: {
    color: COLORS.primary,

  },
  titleContainer: {
    marginTop: -30,
    alignItems: "stretch",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  titleWelcom: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: 0,
    textAlign: "center",
    marginBottom: 12,
  },
  subheading: {
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
    marginVertical: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "justify",
  },
  buttonWelcom: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 50,
  },
  button: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignContent: "center",
    gap: 30,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },

  //  FGVHBJNKML

  containerWel: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainerWel: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 10,
  },
  logoWel: {
    width: "100%",
    height: "100%",
  },
  titleWel: {
    fontSize: 24,
    color: "#333",
    fontWeight: "400",
  },
  brandWel: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitleWel: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonGroupWel: {
    flexDirection: "row",
    gap: 20,
  },
  buttonWel: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
  },
  buttonTextWel: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  outlineButtonWel: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
  },
  outlineButtonTextWel: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 16,
  },
});

