import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';

const {width : SCREEN_SIZE} = Dimensions.get("window");
const API_KEY = 'openweather api key';

export default function App() {
  const [city, setCity] = useState<string|null>();
  const [ok, setOk] = useState<boolean>();
  const [days, setDays] = useState<[]>([]);


  const getWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setOk(false);
    }

    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setCity(location[0].city);
    const responses = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,current,minutely,hourly&appid=${API_KEY}&units=metric`
      );
    const json = await responses.json();
    setDays(json.daily);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style ={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}> {city}</Text>
      </View>
      <ScrollView pagingEnabled contentContainerStyle={styles.weather} horizontal>
        {
            days?.length === 0 ? (
              <View style={styles.day}>
                <ActivityIndicator size="large" color="white" style={{marginTop: 10}} />
              </View>
            ) : (
          days?.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.date}>{(new Date(parseInt(day?.dt)*1000)).toLocaleDateString('ko-KR')}</Text>
              <Text style={styles.temp}>{parseFloat(day?.temp.day).toFixed(1)}</Text>
              <Text style={styles.description}>{day?.weather[0].main}</Text>
            </View>
          ))
        )}
      </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:"tomato"
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize:68,
    fontWeight: "bold"
  },
  weather: {
  },
  day: {
    width: SCREEN_SIZE,
    alignItems: "center",
  },
  date: {
    marginTop:20,
    marginBottom: -80,
    fontSize : 60,
    
  },

  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize : 60
  }
});
