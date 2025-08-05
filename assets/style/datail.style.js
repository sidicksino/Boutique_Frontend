// styles/auth.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    productContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        marginBottom: 100,
    },
    backButton: {
        position: "absolute",
        marginBottom: 0,
        top: 10,
        left: 20,
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    categoryImage: {
        width: "100%",
        height: 250,
        borderRadius: 0,
        top: 0,
    },

    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        color: "#2ecc71",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#666",
    },
    addBottom: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    addButtonText: {
        color: COLORS.white,
        fontWeight: "600",
        marginLeft: 4,
    },
    categoryTitle:{
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        paddingHorizontal: 16,
        color: COLORS.primary,
    },
});