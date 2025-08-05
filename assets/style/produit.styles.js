// styles/home.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    cardContenair:{
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        paddingBottom: 0,
    },
    // products
    card: {
        width: 180,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        margin: 0,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 6,
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
        elevation: 3,
        left: 130,
        bottom: 150,
    },
    /// produits categories 
    cardCategorie: {
        width: 170,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        margin: 10,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: "hidden",
    },
    imageCategorie: {
        width: "100%",
        height: 130,
    },


});