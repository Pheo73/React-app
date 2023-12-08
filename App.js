import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([
    { key: 'Faire les courses' },
    { key: 'Aller à la salle de sport 3 fois par semaine' },
    { key: 'Monter à plus de 5000m d altitude' },
    { key: 'Acheter mon premier appartement' },
    { key: 'Perdre 5 kgs' },
    { key: 'Gagner en productivité' },
    { key: 'Apprendre un nouveau langage' },
    { key: 'Faire une mission en freelance' },
    { key: 'Organiser un meetup autour de la tech' },
    { key: 'Faire un triathlon' },
  ]);

  const addItem = () => {
    setData([...data, { key: inputValue }]);
    setInputValue('');
  };

  const removeItem = (itemToRemove) => {
    const updatedData = data.filter(item => item !== itemToRemove);
    setData(updatedData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Objectives List !</Text>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.key}</Text>
            <Icon
                name="close"
                size={15}
                color="black"
                onPress={() => removeItem(item)}
              />
          </View>
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un objectif"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    color: 'red',
    fontWeight: 'bold',
    fontSize:24,
    marginBottom:25,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  item:{
    marginRight:20,
    fontSize:15,
    marginBottom:7,
  }, 
  deleteButton: {
    alignItems:'right',
  }
});
