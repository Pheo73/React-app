import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.hour}>{item.dt_txt.slice(11, 16)}</Text>
    <Image
      source={{
        uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      }}
      style={styles.iconList}
    />
    <Text style={styles.tempList}>{item.main.temp}°C</Text>
  </View>
);

export default Item;