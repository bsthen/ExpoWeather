import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Location from "expo-location";

import WeatherInfo from "./components/WeatherInfo";

const WEATHER_API_KEY = "dc6d1531cc7cdbdb3b150ad21ee9a25a";

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currectWeather, setCurrectWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }
      const localtion = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = localtion.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrectWeather(result);
      } else {
        setErrorMessage(result.message);
      }

      //  console.log(result)

      //  alert(`Latitude : ${latitude}, Longitude : ${longitude}`)
    } catch (error) {
      // alert("Error connect localtion")
      setErrorMessage(error.message);
    }
  }

  if (currectWeather) {
    const {
      main: { temp },
    } = currectWeather;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <WeatherInfo currectWeather={currectWeather} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
    color: "#F4F4FB",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
