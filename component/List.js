import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useItemStore } from '../store/Store';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddItem from './AddItem';
import EditItem from './EditItem';

function List() {
  const { data, removeItem, toggleEditItemModal, setSelectedItem } = useItemStore();

  const handleEditItem = (item) => {
    setSelectedItem(item);
    toggleEditItemModal(true);
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.key}</Text>
            <View style={styles.iconContainer}>
              <Icon
                name="close"
                size={15}
                color="black"
                onPress={() => removeItem(item)}
              />
              <Icon
                name="edit"
                size={15}
                color="black"
                onPress={() => handleEditItem(item)}
              />
            </View>
          </View>
        )}
      />
      <AddItem />
      <EditItem />
    </View>
  );
}

export default List;


const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    marginRight: 10,
    fontSize: 15,
    marginBottom: 7,
  },
  iconContainer: {
    flexDirection: 'row',
    width: 40,
    justifyContent: 'space-between'
  }
});