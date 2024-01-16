import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Modal, Text } from 'react-native';
import { useItemStore } from '../store/Store';
import Icon from 'react-native-vector-icons/FontAwesome';

function EditItem() {
  const { EditItem, editItemModalIsVisible, toggleEditItemModal, selectedItem } = useItemStore();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setInputValue(selectedItem.key || '');
    }
  }, [selectedItem]);

  const handleEditItem = () => {
    if (inputValue.trim() !== '') {
      EditItem(selectedItem, inputValue); 
      setInputValue('');
      toggleEditItemModal(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editItemModalIsVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          toggleEditItemModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="close"
              size={15}
              color="black"
              onPress={() => toggleEditItemModal(false)}
              style={styles.icon}
            />
            <Text style={styles.modalText}>Saisissez ce que vous voulez rajouter à la liste !</Text>
            <View style={styles.inputInModal}>
              <TextInput
                style={styles.input}
                placeholder={selectedItem ? `Modifier : ${selectedItem.key}` : "Modifier l'élément"}
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />
              <Button
                title='Update'
                style={styles.button}
                onPress={handleEditItem}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EditItem;

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
  icon: {
    marginRight: 'auto',

  }
});