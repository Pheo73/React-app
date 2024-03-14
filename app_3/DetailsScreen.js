import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DetailsScreen = ({ route }) => {
  const { cocktailId } = route.params;
  const [cocktailDetails, setCocktailDetails] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
        setCocktailDetails(response.data.drinks[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCocktailDetails();
  }, [cocktailId]);

  if (!cocktailDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cocktailDetails.strDrink}</Text>
      <Text style={styles.instructions}>Instructions: {cocktailDetails.strInstructions}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      {renderIngredients(cocktailDetails)}
    </View>
  );
};

const renderIngredients = (cocktailDetails) => {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (cocktailDetails[ingredientKey]) {
      const ingredient = `${cocktailDetails[ingredientKey]} - ${cocktailDetails[measureKey]}`;
      ingredients.push(<Text key={i} style={styles.ingredient}>{ingredient}</Text>);
    }
  }

  return ingredients;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetailsScreen;
