import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Modal, Text, TouchableNativeFeedback } from 'react-native';
import { useItemStore } from '../store/Store';
import Icon from 'react-native-vector-icons/FontAwesome';




function AddItem() {
  const { addItem } = useItemStore();
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      addItem(inputValue);
      setInputValue('');
    }
  };

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View style={styles.inputContainer}>
<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fa0000', false)}><Button style={styles.button} title="Add" onPress={() => {
        setModalVisible(true);
      }} /></TouchableNativeFeedback>      


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="close"
              size={15}
              color="black"
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.icon}
            />
          
            <Text style={styles.modalText}>Saisissez ce que vous voulez rajouter à la liste !</Text>
            <View style={styles.inputInModal}>
              <TextInput
                style={styles.input}
                placeholder="Ajouter un objectif"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />
              <Button title='ADD'
                style={styles.button}
                onPress={() => {
                  handleAddItem();
                  setModalVisible(!modalVisible);
                }}>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default AddItem;

const styles = StyleSheet.create({

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
  inputInModal: { flexDirection: 'row', },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
 icon:{
  marginRight:'auto',

}
});