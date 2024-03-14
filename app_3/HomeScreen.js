import React, { useState, useEffect } from "react";
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const Alphabet = "abcdefghijklmnopqrstuvwxyz";

const HomeScreen = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchAllCocktails = async () => {
      try {
        const allCocktails = [];
        for (let letter of Alphabet) {
          const response = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
          );
          const drinks = response.data.drinks || [];
          allCocktails.push(...drinks);
        }
        setCocktails(allCocktails);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchAllCocktails();
  }, []);

  const handleCocktailPress = (cocktail) => {
    navigation.navigate("Details", { cocktailId: cocktail.idDrink });
  };

  const addToFavorites = async (cocktail) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];
      favoritesArray.push(cocktail);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? ( // Show loading indicator if loading is true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={cocktails}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.cocktailItem} onPress={() => handleCocktailPress(item)}>
              <Image
                style={styles.cocktailImage}
                source={{ uri: item.strDrinkThumb }}
              />
              <Text style={styles.cocktailName}>{item.strDrink}</Text>
              <TouchableOpacity style={styles.favoriteButton} onPress={() => addToFavorites(item)}>
                <Text style={styles.favoriteButtonText}>Ajouter aux favoris</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cocktailItem: {
    alignItems: "center",
    margin: 10,
  },
  cocktailImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cocktailName: {
    marginTop: 5,
    textAlign: "center",
  },
  favoriteButton: {
    marginTop: 5,
    backgroundColor: "orange",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  favoriteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
