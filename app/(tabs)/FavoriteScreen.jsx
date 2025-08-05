import { styles } from "@/assets/style/home.style";
import FavoriteCard from "@/components/FavoriteCard";
import Header from "@/components/Header";
import NoFavoriteFound from "@/components/NoFavoriteFound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";


export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.warn(" Aucun token trouvé");
        setFavorites([]);
        return;
      }

      const res = await fetch("https://boutique-backend-47jo.onrender.com/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error("Erreur chargement favoris:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  return (
    
    <View style={styles.container}>
      <Header />
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.product_id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <FavoriteCard product={item} onToggle={fetchFavorites} />
          )}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<NoFavoriteFound />}
        />
    </View>
  );
}
