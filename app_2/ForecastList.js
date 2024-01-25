import React from "react";
import { View, Text, FlatList } from "react-native";
import ForecastItem from "./ForecastItem";
import styles from "./styles";

const ForecastList = ({ forecastData, groupForecastByDay, formatDate }) => {
  return (
    <View style={styles.flatList}>
      {groupForecastByDay().map((dayForecast, index) => (
        <View key={index.toString()} style={styles.itemInFlatlist}>
          <Text style={styles.date}>{formatDate(dayForecast[0].dt_txt.slice(0, 10))}</Text>
          <FlatList
            data={dayForecast}
            keyExtractor={(item) => item.dt.toString()}
            horizontal
            renderItem={({ item }) => <ForecastItem item={item} />}
          />
        </View>
      ))}
    </View>
  );
};

export default ForecastList;