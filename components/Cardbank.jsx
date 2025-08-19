import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 0.63;
const SPACING = 16;
const MARGIN_HORIZONTAL = (width - CARD_WIDTH) / 2;

const cards = [
  {
    id: "orabank",
    name: "Orabank",
    color1: "#FF9800",
    color2: "#FF5722",
    accentColor: "#FF8F00",
    number: "7641",
    fullNumber: "5567 8901 2345 7641",
    expiry: "12/26",
    holder: "M. SINO",
    type: "MasterCard",
    cvv: "456"
  },
  {
    id: "econbank",
    name: "Econbank",
    color1: "#00C853", 
    color2: "#009688",
    accentColor: "#4CAF50",
    number: "4832",
    fullNumber: "4567 8901 2345 4832",
    expiry: "09/25",
    holder: "M. SINO",
    type: "Econbank",
    cvv: "123"
  },
  {
    id: "uba",
    name: "UBA",
    color1: "#D50000",
    color2: "#B71C1C",
    accentColor: "#D32F2F",
    number: "3098",
    fullNumber: "6567 8901 2345 3098",
    expiry: "03/24",
    holder: "M. SINO",
    type: "UBA",
    cvv: "789"
  },
];

export default function RealisticCardSlider() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // Calculer l'index initial pour commencer au milieu
  const initialScrollIndex = 1; // Index de la carte du milieu

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={cards}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + SPACING}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        initialScrollIndex={initialScrollIndex}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + SPACING,
          offset: (CARD_WIDTH + SPACING) * index,
          index,
        })}
        renderItem={({ item: card, index }) => (
          <View style={[styles.cardWrapper, { marginLeft: index === 0 ? MARGIN_HORIZONTAL : 0 }]}>
            <LinearGradient
              colors={[card.color1, card.color2]}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Bande holographique avec effet de dégradé */}
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.4)']}
                style={styles.holographicStrip}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
              
              {/* Logo de la banque */}
              <View style={styles.bankLogoContainer}>
                <View style={[styles.bankLogo, { backgroundColor: card.accentColor }]}>
                  <Text style={styles.bankLogoText}>{card.name.substring(0, 2)}</Text>
                </View>
              </View>
              
              {/* Puce de carte */}
              <View style={styles.chipContainer}>
                <View style={styles.chip}>
                  <View style={styles.chipLines}>
                    <View style={styles.chipLineRow}>
                      <View style={[styles.chipLine, styles.chipLineShort]} />
                      <View style={styles.chipLine} />
                      <View style={[styles.chipLine, styles.chipLineShort]} />
                    </View>
                    <View style={styles.chipLineRow}>
                      <View style={styles.chipLine} />
                      <View style={[styles.chipLine, styles.chipLineShort]} />
                      <View style={styles.chipLine} />
                    </View>
                    <View style={styles.chipLineRow}>
                      <View style={[styles.chipLine, styles.chipLineShort]} />
                      <View style={styles.chipLine} />
                      <View style={[styles.chipLine, styles.chipLineShort]} />
                    </View>
                  </View>
                </View>
              </View>
              
              {/* Type de carte (VISA/MasterCard) */}
              <View style={styles.cardTypeContainer}>
                <Text style={styles.cardType}>{card.type}</Text>
              </View>
              
              {/* Numéro de carte */}
              <View style={styles.cardNumberContainer}>
                <Text style={styles.cardNumber}>{card.fullNumber}</Text>
              </View>
              
              {/* Date d'expiration et nom du titulaire */}
              <View style={styles.cardDetails}>
                <View style={styles.expiryContainer}>
                  <Text style={styles.detailLabel}>VALID THRU</Text>
                  <Text style={styles.expiryText}>{card.expiry}</Text>
                </View>
                <View style={styles.holderContainer}>
                  <Text style={styles.detailLabel}>CARD HOLDER</Text>
                  <Text style={styles.holderText}>{card.holder}</Text>
                </View>
              </View>
              
              {/* Logo du réseau de carte (VISA/MasterCard) */}
              <View style={styles.networkLogo}>
                {card.type === "VISA" ? (
                  <View style={styles.visaLogo}>
                    <Text style={styles.visaText}>VISA</Text>
                  </View>
                ) : (
                  <View style={styles.mastercardLogo}>
                    <View style={styles.mastercardCircle} />
                    <View style={[styles.mastercardCircle, styles.mastercardCircleRight]} />
                  </View>
                )}
              </View>
            </LinearGradient>
          </View>
        )}
      />

      {/* Indicateurs de pagination */}
      <View style={styles.pagination}>
        {cards.map((_, index) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.5, 0.8],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingRight: MARGIN_HORIZONTAL,
  },
  cardWrapper: {
    width: CARD_WIDTH - 10,
    height: CARD_HEIGHT,
    marginRight: SPACING,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  bankLogoContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bankLogoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chipContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  chip: {
    width: 50,
    height: 40,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  chipLines: {
    width: 40,
    height: 30,
    justifyContent: 'space-between',
  },
  chipLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipLine: {
    width: 12,
    height: 4,
    backgroundColor: '#C0C0C0',
    borderRadius: 2,
  },
  chipLineShort: {
    width: 6,
  },
  cardTypeContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cardType: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardNumberContainer: {
    position: 'absolute',
    top: 80,
    left: 80,
    right: 20,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryContainer: {
    alignItems: 'flex-start',
  },
  holderContainer: {
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 20,
  },
  detailLabel: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    marginBottom: 4,
  },
  expiryText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
  },
  holderText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
  },
  networkLogo: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  visaLogo: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  visaText: {
    color: '#1A1F71',
    fontWeight: 'bold',
    fontSize: 12,
  },
  mastercardLogo: {
    width: 40,
    height: 25,
    flexDirection: 'row',
  },
  mastercardCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#FF5F00',
    position: 'absolute',
  },
  mastercardCircleRight: {
    backgroundColor: '#EB001B',
    right: 0,
  },
  holographicStrip: {
    position: 'absolute',
    top: 20,
    right: -40,
    width: 80,
    height: 40,
    transform: [{ rotate: '45deg' }],
    opacity: 0.6,
  },
  embossedDot1: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: -20,
    left: -20,
  },
  embossedDot2: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    bottom: -10,
    right: '30%',
  },
  embossedDot3: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: '40%',
    right: -15,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  paginationDot: {
    width: 10,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#5e17eb',
    marginHorizontal: 6,
  },
});