import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const CurrentWeather = ({ data, temp, icon }) => {
  const roundTemp = Math.round(temp);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.temp}>{roundTemp}°C</Text>
      <View style={styles.weathercontainer}>
        <Text style={styles.weather}>{data.weather[0].description}</Text>
        {icon && icon.uri && <Image source={icon} style={styles.icon} />}
      </View>
    </View>
  );
};

export default CurrentWeather;