import { getStyles } from "@/assets/style/Checkout.style";
import CardSlider from "@/components/Cardbank";
import SafeScreen from "@/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

  const [mobileInfo, setMobileInfo] = useState({
    phoneNumber: "",
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
  const scrollViewRef = React.useRef < KeyboardAwareScrollView > null;

  const scrollToTop = () => {
    scrollViewRef.current?.scrollToPosition(0, true);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!userData.fullName.trim() || !userData.phone.trim()) {
        Alert.alert("Erreur", "Le nom et le téléphone sont obligatoires.");
        return;
      }
      setStep(2);
      setTimeout(scrollToTop, 100);
    } else if (step === 2) {
      if (!paymentMethod) {
        Alert.alert("Erreur", "Veuillez choisir une méthode de paiement.");
        return;
      }

      if (paymentMethod === "card") {
        const { number, expiry, cvv, name } = cardInfo;
        if (!number || !expiry || !cvv || !name) {
          Alert.alert(
            "Erreur",
            "Veuillez remplir toutes les informations de la carte."
          );
          return;
        }
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

      if (
        paymentMethod === "mobile" &&
        (!mobileInfo.phoneNumber || mobileInfo.phoneNumber.length < 10)
      ) {
        Alert.alert("Erreur", "Numéro de mobile money invalide.");
        return;
      }

      setStep(3);
      setTimeout(scrollToTop, 100);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, "").slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
    return formatted;
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
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
    <SafeScreen>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButtonTop}
          >
            <AntDesign name="left" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>
        <Stepper />
        {/* Scrollable Content */}
        <KeyboardAwareScrollView
          style={styles.content}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="handled" // Important pour les boutons dans le scroll
        >
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
                    placeholder="Enter your full name"
                    placeholderTextColor="#6B7280"
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
                    placeholder="Enter your phone number"
                    placeholderTextColor="#6B7280"
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
                    placeholder="Your email"
                    keyboardType="email-address"
                    placeholderTextColor="#6B7280"
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
                    placeholder="Kigali, Kacyuru, Rue 19"
                    placeholderTextColor="#6B7280"
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
              {paymentMethod === "" && <Text style={styles.checkoutTitle}>Choose a payment method</Text>}
              {/* Méthodes de paiement en flex-row */}
              <View style={styles.paymentMethodsRow}>
                {[
                  {
                    id: "card",
                    icon: "card-outline",
                    title: "Card",
                  },
                  {
                    id: "mobile",
                    icon: "phone-portrait-outline",
                    title: "Mobile Money",
                  },
                  {
                    id: "cash",
                    icon: "cash-outline",
                    title: "Cash on Delivery",
                  },
                ].map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentMethodCard,
                      paymentMethod === method.id &&
                        styles.paymentMethodSelected,
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
                      if (method.id !== "mobile") {
                        setMobileInfo({ phoneNumber: "" });
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
                <KeyboardAwareScrollView
                  style={styles.containers}
                  contentContainerStyle={{ flexGrow: 1 }}
                  enableOnAndroid={true}
                  enableAutomaticScroll={true}
                >
                  <CardSlider />
                  <View style={styles.cardForm}>
                    <Text style={styles.label}>Numéro de carte *</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="card-outline"
                        size={20}
                        color={COLORS.primary}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="4242 4242 4242 4242"
                        value={cardInfo.number}
                        onChangeText={(text) =>
                          setCardInfo({
                            ...cardInfo,
                            number: formatCardNumber(text),
                          })
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
                              setCardInfo({
                                ...cardInfo,
                                expiry: formatExpiry(text),
                              })
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
                            placeholder="000"
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
                          placeholder="Name"
                          value={cardInfo.name}
                          onChangeText={(text) =>
                            setCardInfo({
                              ...cardInfo,
                              name: text.toUpperCase(),
                            })
                          }
                          autoCapitalize="characters"
                        />
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              )}

              {/* Formulaire de carte mobile  */}
              {paymentMethod === "mobile" && (
                <View style={styles.inputGroup}>
                  <View style={styles.imageGroupe}>
                    <Image
                      source={require("../../assets/images/MTN.webp")}
                      style={styles.illustration}
                      contentFit="cover"
                    />
                    <Image
                      source={require("../../assets/images/airtel.webp")}
                      style={styles.illustration}
                      contentFit="cover"
                    />
                    <Image
                      source={require("../../assets/images/tigo.png")}
                      style={styles.illustration}
                      contentFit="cover"
                    />
                  </View>
                  <Text style={styles.label}>Numéro Mobile Money *</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="phone-portrait-outline"
                      size={20}
                      color={COLORS.primary}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your number to confirm"
                      value={mobileInfo.phoneNumber}
                      onChangeText={(text) =>
                        setMobileInfo({ ...mobileInfo, phoneNumber: text })
                      }
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                </View>
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
        </KeyboardAwareScrollView>

        {/* Boutons en bas */}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons
                name="arrow-undo-circle-outline"
                size={16}
                color={COLORS.primary}
                style={styles.arrowBack}
              />
              <Text style={styles.backButtonText}> Retour</Text>
            </TouchableOpacity>
          )}

          {step < 3 ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Continuer</Text>
              <Ionicons
                name="arrow-forward-circle-outline"
                size={16}
                color={COLORS.primary}
                style={styles.arrowBack}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmOrder}
            >
              <Text style={styles.confirmButtonText}>Confirmer</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </SafeScreen>
  );
}
