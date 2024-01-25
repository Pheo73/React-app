import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, ScrollView, View, Text } from "react-native";
import CurrentWeather from "./CurrentWeather";
import List from "./List";
import * as Location from "expo-location";
import styles from "./styles";

const image = {
  uri: "https://i.pinimg.com/564x/ab/4c/66/ab4c6630fc6504ad45228a84cedf393a.jpg",
};

export default function App() {
  const weatherKey = "691b212f3458a40a390e8bf11d7a32ac";
  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState({ uri: null });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        setLat(coords.latitude);
        setLon(coords.longitude);
      } catch (error) {
        console.error(error);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (lat && lon) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&APPID=${weatherKey}&units=metric`
          );
          const data = await response.json();
          setData(data);
          setTemp(data.main.temp);
          const newIcon = {
            uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          };
          setIcon(newIcon);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        if (lat && lon) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&APPID=${weatherKey}&units=metric`
          );
          const data = await response.json();
          setForecastData(data.list);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchForecast();
  }, [lat,data]);

  const groupForecastByDay = () => {
    const groupedForecast = [];
    let currentDayForecast = [];

    for (const forecastItem of forecastData) {
      if (
        !currentDayForecast.length ||
        currentDayForecast[0].dt_txt.slice(0, 10) ===
          forecastItem.dt_txt.slice(0, 10)
      ) {
        currentDayForecast.push(forecastItem);
      } else {
        groupedForecast.push([...currentDayForecast]);
        currentDayForecast = [forecastItem];
      }
    }

    if (currentDayForecast.length) {
      groupedForecast.push([...currentDayForecast]);
    }

    return groupedForecast;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };

    return date.toLocaleDateString("fr-FR", options);
  };
  

  return (
    <ImageBackground source={image} style={styles.background}>
      {loading && data === null && forecastData === null ? (
        <ScrollView contentContainerStyle={styles.loaderContainer}>
          <Text style={styles.loaderText}>Loading...</Text>
        </ScrollView>
      ) : (
        data &&
        forecastData && (
          <ScrollView contentContainerStyle={styles.container}>
            <CurrentWeather data={data} temp={temp} icon={icon} />
            <Text style={styles.today}>{forecastData.length > 0 && forecastData[0].dt_txt.slice(0, 11)}</Text>
            <List
              forecastData={forecastData}
              groupForecastByDay={groupForecastByDay}
              formatDate={formatDate}
            />
            <StatusBar style="auto" />
          </ScrollView>
        )
      )}
    </ImageBackground>
  );
}
