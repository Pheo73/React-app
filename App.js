import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import List from './component/List';


export default function App() {
  const image = {uri: 'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGJhY2tncm91bmR8ZW58MHwxfDB8fHww'};


  return (
    <ImageBackground source={image}  style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>To Do List !</Text>
      <List></List>
      <StatusBar style="auto" />
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize:24,
    marginBottom:25,
    textAlign:'center',
    textDecorationLine:'underline',
  },
  background: {
    flex: 1,
  },

});
