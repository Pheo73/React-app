import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Alphabet = "abcdefghijklmnopqrstuvwxyz";
const itemWidth = 100;

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const favoritesData = await AsyncStorage.getItem("favorites");
          if (favoritesData) {
            setFavorites(JSON.parse(favoritesData));
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchFavorites();
    }, [])
  );

  const handleCocktailPress = (cocktail) => {
    navigation.navigate("Details", { cocktailId: cocktail.idDrink });
  };

  const removeFavorite = async (idDrink) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.idDrink !== idDrink);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };

  const renderFavoriteItem = ({ item }) => {
    return (
      <View style={styles.favoriteItem}>
        <TouchableOpacity onPress={() => handleCocktailPress(item)}>
          <Image
            style={styles.cocktailImage}
            source={{ uri: item.strDrinkThumb }}
          />
          <Text style={styles.cocktailName}>{item.strDrink}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFavorite(item.idDrink)}>
          <Text style={styles.removeButton}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.idDrink}
        numColumns={3}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  listContent: {
    alignItems: 'center',
  },
  favoriteItem: {
    width: itemWidth,
    alignItems: "center",
    margin: 10,
  },
  cocktailImage: {
    width: itemWidth - 20,
    height: itemWidth - 20,
    borderRadius: 10,
  },
  cocktailName: {
    marginTop: 5,
    textAlign: "center",
  },
  removeButton: {
    color: "red",
    marginTop: 5,
  },
});

export default FavoritesScreen;
