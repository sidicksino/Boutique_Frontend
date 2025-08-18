// src/components/SearchResults.js
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

const SearchResults = ({ results, onItemPress }) => {
  const { COLORS } = useContext(ThemeContext);

  if (results.length === 0) {
    return (
      <Text style={{ 
        color: COLORS.textLight, 
        textAlign: "center", 
        marginTop: 20 
      }}>
        Aucun résultat trouvé
      </Text>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.product_id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: COLORS.card,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
            borderRadius: 8,
            marginBottom: 10,
          }}
          onPress={() => onItemPress(item)}
        >
          <Text style={{ color: COLORS.text, fontWeight: "bold" }}>
            {item.name}
          </Text>
          <Text style={{ color: COLORS.textLight }}>
          {item.price ? Number(item.price) : "0.00"} FCFA
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default SearchResults;