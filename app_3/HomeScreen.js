import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

function HomeScreen({ navigation }) {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
      const fetchAllCocktails = async () => {
        try {
          const alphabet = 'abcdefghijklmnopqrstuvwxyz';
          const cocktails = [];
    
          for (const letter of alphabet) {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
            const drinks = response.data.drinks || [];
            cocktails.push(...drinks);
          }
    
          setCocktails(cocktails);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchAllCocktails();
    }, []);

  const renderCocktailItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { cocktailId: item.idDrink })}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image source={{ uri: `${item.strDrinkThumb}/preview` }} style={{ width: 150, height: 150 }} />
        <Text>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderCocktailItem}
        numColumns={1}
      />
    </View>
  );
}

export default HomeScreen;
