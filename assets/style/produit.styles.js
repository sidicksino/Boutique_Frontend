import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const getStyles = (COLORS) => StyleSheet.create({
    cardContenair:{
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 10,
        paddingBottom: 10,
    },
    // products
    card: {
        width: width / 2 - 20,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        margin: 0,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: 130,
        resizeMode: "cover",
    },

    content: {
        padding: 12,
        gap: 8,
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
    },

    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.primary,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    heartFavori:{
        position: "absolute",
        padding: 8,
        borderRadius: 50,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        left: width / 2 - 70,
        bottom: 150,
    },
    /// produits categories 
    cardCategorie: {
        width: 120,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        margin: 5,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: "hidden",
    },
    imageCategorie: {
        width: "100%",
        height: 120,
        resizeMode: "cover",
    },
});