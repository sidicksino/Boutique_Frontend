import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary,
    },
    button1: {
        backgroundColor: COLORS.primary,
        padding: 15,
        width: '50%',
        alignItems: 'center',
    },
    button2: {
        padding: 15,
        width: '50%',
        alignItems: 'center',
    },
    buttonText1: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText2: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    addContainer: {
        padding: 20,
    },
    addButton: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    addIcon: {
        color: COLORS.white,
    },
    addButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    containers: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    backButton: {
        position: "relative",
        top: 10,
        left: 10,
        padding: 10,
    },
    containent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 15,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        color: COLORS.primary,
        fontSize: 20,
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        padding: 6,
    },
    illustration: {
        height: 70,
        width: 80,
        resizeMode: "contain",
    },
    totalContenair: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    totalProduct: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.income,
        borderRadius: 12,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    totalText: {
        fontSize: 16,
        color: COLORS.textLight,
        marginBottom: 8,
    },
    infoText1: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 20,
    },
    infoText2: {
        fontSize: 18,
        color: COLORS.primary,
        marginTop: 5,
        textAlign: 'justify',
    },
    balanceStatItem: {
        flex: 1,
        alignItems: "center",
      },
      dashboard:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      },
      dashboardText:{
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.primary,
        top: 10,
      }
});
