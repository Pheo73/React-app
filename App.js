import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import SampleGoals from './SampleGoals';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>Objectives List !</Text>
      <SampleGoals></SampleGoals>
      <View style={[
        {
          flexDirection: 'row',
        },
      ]}> 
        <TextInput style={styles.input} placeholder='Ajouter un objectif'></TextInput>
        <Button title='Add' ></Button>
      </View>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
  },
  input:{
    borderWidth: 1, 
    borderRadius:10,
    padding:5,
    marginRight:25,
  }
});
