// app/pages/RechercheScreen.jsx
import SafeScreen from "@/components/SafeScreen";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { ThemeContext } from "@/context/ThemeContext";
import useApiSearch from "@/context/useApiSearch";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const RechercheScreen = ({ navigation }) => {

  const { COLORS } = useContext(ThemeContext);
  const { query, setQuery, results, loading, error } = useApiSearch();
  const router = useRouter();

  const handleItemPress = (item) => {
    router.push({
      pathname: "pages/details",
      params: { product: JSON.stringify(item) },
    });
  };

  return (
    <SafeScreen>
      <View
        style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}
      >
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Rechercher un produit..."
          onBackPress={() => router.back()}
        />

        {error && (
          <Text
            style={{ color: COLORS.danger, textAlign: "center", padding: 10 }}
          >
            {error}
          </Text>
        )}

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <SearchResults results={results} onItemPress={handleItemPress} />
        )}
      </View>
    </SafeScreen>
  );
};

export default RechercheScreen;
