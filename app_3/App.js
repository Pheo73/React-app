import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cocktail API' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Détails du Cocktail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;