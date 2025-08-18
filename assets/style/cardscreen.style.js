import { StyleSheet } from "react-native";

export const getStyles = (COLORS) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
      },
    //   emptyText: {
    //     textAlign: "center",
    //     marginTop: 30,
    //     fontSize: 16,
    //     color: "#555",
    //   },
      list: {
        paddingHorizontal: 15,
        paddingBottom: 190,

      },
      item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
      },
      image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 15,
      },
      details: {
        flex: 1,
      },
      name: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 5,
      },
      info: {
        fontSize: 14,
        color: COLORS.text,
      },
      footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        padding: 15,
        borderTopWidth: 1,
        borderColor: COLORS.primary,
        paddingBottom: "25%"
      },
      totalText: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
      },
      actions: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
      },
      clearButton: {
        backgroundColor: "#ccc",
      },
      checkoutButton: {
        backgroundColor: COLORS.income,
      },
      buttonText: {
        color: COLORS.card,
        fontWeight: "600",
      },
});