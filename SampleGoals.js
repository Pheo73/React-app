import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SampleGoals = () => {
    return (  
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Faire les courses'},
            {key: 'Aller à la salle de sport 3 fois par semaine'},
            {key: 'Monter à plus de 5000m d altitude'},
            {key: 'Acheter mon premier appartement'},
            {key: 'Perdre 5 kgs'},
            {key: 'Gagner en productivité'},
            {key: 'Apprendre un nouveau langage'},
            {key: 'Faire une mission en freelance'},
            {key: 'Organiser un meetup autour de la tech'},
            {key: 'Faire un triathlon'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  };

  export default SampleGoals;