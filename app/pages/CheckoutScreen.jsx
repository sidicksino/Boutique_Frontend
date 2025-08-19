import CardSlider from "@/components/Cardbank";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function CheckoutScreen() {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  // Étapes
  const [step, setStep] = useState(1);

  // Données utilisateur
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
  });

  // À côté de tes autres useState
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  // Méthode de paiement
  const [paymentMethod, setPaymentMethod] = useState("");

  // Exemple de panier
  const cartItems = [
    { id: 1, name: "Pizza Margherita", qty: 1, price: 5000 },
    { id: 2, name: "Coca-Cola", qty: 2, price: 600 },
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Gestion du passage à l'étape suivante
  const handleNext = () => {
    if (step === 1) {
      if (!userData.fullName.trim() || !userData.phone.trim()) {
        Alert.alert("Erreur", "Le nom et le téléphone sont obligatoires.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!paymentMethod) {
        Alert.alert("Erreur", "Veuillez choisir une méthode de paiement.");
        return;
      }

      // Si c'est la carte, valide les champs
      if (paymentMethod === "card") {
        const { number, expiry, cvv, name } = cardInfo;
        if (!number || !expiry || !cvv || !name) {
          Alert.alert(
            "Erreur",
            "Veuillez remplir toutes les informations de la carte."
          );
          return;
        }
        // Validation simple du format
        if (number.replace(/\s/g, "").length < 16) {
          Alert.alert("Erreur", "Numéro de carte invalide.");
          return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
          Alert.alert("Erreur", "Format de date invalide (MM/AA).");
          return;
        }
        if (cvv.length < 3) {
          Alert.alert("Erreur", "CVV invalide.");
          return;
        }
      }

      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const confirmOrder = () => {
    Alert.alert(
      "Commande confirmée !",
      `Merci ${userData.fullName}, votre commande de ${totalAmount} FCFA sera traitée.`,
      [{ text: "OK", onPress: () => console.log("Commande envoyée") }]
    );
  };

  // Stepper Component
  const Stepper = () => (
    <View style={styles.stepper}>
      {[1, 2, 3].map((s) => (
        <View key={s} style={styles.stepperItem}>
          <View
            style={[
              styles.stepperCircle,
              s === step
                ? styles.stepperActive
                : s < step
                ? styles.stepperCompleted
                : styles.stepperInactive,
            ]}
          >
            {s < step ? (
              <Ionicons name="checkmark" size={16} color={COLORS.card} />
            ) : (
              <Text style={styles.stepperText}>{s}</Text>
            )}
          </View>
          {s < 3 && <View style={styles.stepperLine} />}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
        <Stepper />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        {/* Étape 1 */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom complet *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="Jean Dupont"
                  value={userData.fullName}
                  onChangeText={(text) =>
                    setUserData({ ...userData, fullName: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Téléphone *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="+225 07 00 00 00 00"
                  keyboardType="phone-pad"
                  value={userData.phone}
                  onChangeText={(text) =>
                    setUserData({ ...userData, phone: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: "#9CA3AF" }]}>
                Email (facultatif)
              </Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="jean.dupont@email.com"
                  keyboardType="email-address"
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse ou localisation</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="Abidjan, Cocody, Rue des Palmiers"
                  value={userData.location}
                  onChangeText={(text) =>
                    setUserData({ ...userData, location: text })
                  }
                />
              </View>
              <TouchableOpacity>
                <Text style={styles.locationBtn}>
                  📍 Utiliser ma position actuelle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Étape 2 */}
        {step === 2 && (
          <View style={[styles.stepContainer, styles.activeStep]}>
            <Text style={styles.sectionTitle}></Text>

            {/* Méthodes de paiement en flex-row */}
            <View style={styles.paymentMethodsRow}>
              {[
                {
                  id: "card",
                  icon: "card-outline",
                  title: "Carte",
                },
                {
                  id: "mobile",
                  icon: "phone-portrait-outline",
                  title: "Mobile Money",
                },
                {
                  id: "cash",
                  icon: "cash-outline",
                  title: "À la livraison",
                },
              ].map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethodCard,
                    paymentMethod === method.id && styles.paymentMethodSelected,
                  ]}
                  onPress={() => {
                    setPaymentMethod(method.id);
                    if (method.id !== "card") {
                      setCardInfo({
                        number: "",
                        expiry: "",
                        cvv: "",
                        name: "",
                      });
                    }
                  }}
                >
                  <Ionicons
                    name={method.icon}
                    size={28}
                    color={
                      paymentMethod === method.id
                        ? COLORS.primary
                        : COLORS.textLight
                    }
                  />
                  <Text
                    style={[
                      styles.paymentMethodTitle,
                      paymentMethod === method.id
                        ? { color: COLORS.primary }
                        : { color: COLORS.textLight },
                    ]}
                  >
                    {method.title}
                  </Text>
                  {/* Badge de check (seulement si sélectionné) */}
                  {paymentMethod === method.id && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={14} color="white" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Formulaire de carte bancaire (uniquement si sélectionnée) */}
            {paymentMethod === "card" && (
              <>
                <CardSlider />
                <View style={styles.cardForm}>
                  <Text style={styles.label}>Numéro de carte *</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="card-outline" size={20} color={COLORS.primary} />
                    <TextInput
                      style={styles.input}
                      placeholder="4242 4242 4242 4242"
                      value={cardInfo.number}
                      onChangeText={(text) =>
                        setCardInfo({ ...cardInfo, number: text })
                      }
                      keyboardType="number-pad"
                      maxLength={19}
                    />
                  </View>

                  <View style={styles.row}>
                    <View
                      style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}
                    >
                      <Text style={styles.label}>Date d'expiration *</Text>
                      <View style={styles.inputWrapper}>
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color={COLORS.primary}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="MM/AA"
                          value={cardInfo.expiry}
                          onChangeText={(text) =>
                            setCardInfo({ ...cardInfo, expiry: text })
                          }
                          maxLength={5}
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>

                    <View
                      style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}
                    >
                      <Text style={styles.label}>CVV *</Text>
                      <View style={styles.inputWrapper}>
                        <Ionicons
                          name="lock-closed-outline"
                          size={20}
                          color={COLORS.primary}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChangeText={(text) =>
                            setCardInfo({ ...cardInfo, cvv: text })
                          }
                          keyboardType="number-pad"
                          secureTextEntry
                          maxLength={4}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nom sur la carte *</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color={COLORS.primary}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="JEAN DUPONT"
                        value={cardInfo.name}
                        onChangeText={(text) =>
                          setCardInfo({ ...cardInfo, name: text.toUpperCase() })
                        }
                        autoCapitalize="characters"
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        )}

        {/* Étape 3 */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.sectionTitle}>
              Récapitulatif de la commande
            </Text>

            {/* Panier */}
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>📦 Produits</Text>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.summaryRow}>
                  <Text style={styles.summaryText}>
                    {item.name} x{item.qty}
                  </Text>
                  <Text style={styles.summaryText}>
                    {item.price * item.qty} FCFA
                  </Text>
                </View>
              ))}
            </View>

            {/* Informations */}
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>👤 Informations</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Nom</Text>
                <Text style={styles.summaryValue}>{userData.fullName}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Téléphone</Text>
                <Text style={styles.summaryValue}>{userData.phone}</Text>
              </View>
              {userData.email ? (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Email</Text>
                  <Text style={styles.summaryValue}>{userData.email}</Text>
                </View>
              ) : null}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Adresse</Text>
                <Text style={styles.summaryValue}>
                  {userData.location || "Non renseignée"}
                </Text>
              </View>
            </View>

            {/* Paiement */}
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>💳 Paiement</Text>
              <Text style={styles.summaryValue}>
                {paymentMethod === "cash" && "Paiement à la livraison"}
                {paymentMethod === "mobile" && "Mobile Money"}
                {paymentMethod === "card" && "Carte bancaire"}
              </Text>
            </View>

            {/* Total */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total à payer</Text>
              <Text style={styles.totalAmount}>{totalAmount} FCFA</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Boutons en bas */}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Retour</Text>
          </TouchableOpacity>
        )}

        {step < 3 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Continuer →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
            <Text style={styles.confirmButtonText}>Confirmer</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

// Styles
const getStyles = (COLORS) => ({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 3,
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
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
    marginBottom: 2,
    paddingVertical: 10,
    marginTop:10,
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
    flex: 1,
    marginRight: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
    padding: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
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
    top: -30,
  },
  paymentMethodCard: {
    flex: 1,
    minWidth: (width - 80) / 4,
    aspectRatio: 1,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: `${COLORS.border}10`,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
