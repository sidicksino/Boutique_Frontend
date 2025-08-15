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
});
