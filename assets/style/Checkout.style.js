import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const getStyles = (COLORS) => StyleSheet.create({
    containers: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: "32%",
    },
    backButtonTop:{
        
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: COLORS.primary,
        justifyContent: "center",
        textAlign: "center"
    },
    checkoutTitle: {
        justifyContent: "center",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "600",
        color: COLORS.primary,
        marginBottom: 0,
        paddingVertical: 20,
    },
    stepper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    stepperItem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
    },
    stepperCircle: {
        width: 42,
        height: 42,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4,
    },
    stepperActive: {
        backgroundColor: COLORS.primary,
    },
    stepperCompleted: {
        backgroundColor: COLORS.primary,
    },
    stepperInactive: {
        backgroundColor: COLORS.background,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    stepperText: {
        color: COLORS.textLight,
        fontWeight: "600",
    },
    stepperLine: {
        width: 40,
        height: 2,
        backgroundColor: COLORS.border,
    },
    content: {
        flex: 1,
        padding: 0,
    },
    stepContainer: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: COLORS.primary,
        marginBottom: 0,
        paddingVertical: 5,
    },
    inputGroup: {
        marginBottom: 16,
    },
    imageGroupe:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 40
    },
    illustration:{
        height: 80,
        width: 120,
        resizeMode: "contain",  
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.primary,
        marginBottom: 2,
        paddingVertical: 10,
        marginTop: 10,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: COLORS.card,
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: COLORS.text,
    },
    locationBtn: {
        marginTop: 10,
        color: COLORS.income,
        fontSize: 16,
    },
    paymentOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: COLORS.card,
    },
    paymentSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.border,
    },
    paymentLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
    },
    paymentDesc: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    summarySection: {
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 12,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    summaryText: {
        fontSize: 14,
        color: "#374151",
    },
    summaryLabel: {
        fontSize: 14,
        color: "#6B7280",
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        marginTop: 16,
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: "700",
        color: "#10B981",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.primary,
    },
    backButton: {
        flexDirection:"row",
        flex: 1,
        marginRight: 8,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        alignContent:"center"
    },
    backButtonText: {
        color: COLORS.primary,
        fontWeight: "600",
    },
    arrowBack:{
        color: COLORS.primary,
    },
    nextButton: {
        flexDirection:"row",
        flex: 1,
        marginLeft: 8,
        padding: 14,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        alignContent:"center"
    },
    nextButtonText: {
        color: COLORS.card,
        fontWeight: "600",
    },
    confirmButton: {
        flex: 1,
        marginLeft: 8,
        padding: 14,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        alignItems: "center",
    },
    confirmButtonText: {
        color: COLORS.card,
        fontWeight: "600",
    },

    cardForm: {
        marginTop: 16,
        padding: 16,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },

    row: {
        flexDirection: "row",
        marginBottom: 16,
    },
    paymentMethodsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
    },
    activeStep: {
        backgroundColor: "transparent",
        top: 0,
    },
    paymentMethodCard: {
        flex: 1,
        minWidth: (width - 80) / 4,
        aspectRatio: 1,
        backgroundColor: COLORS.background,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },

    paymentMethodSelected: {
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}10`,
    },

    paymentMethodTitle: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 8,
        textAlign: "center",
        lineHeight: 16,
    },

    checkBadge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
});
