// import React, { useEffect, useState } from "react";
// import {View,Text,Alert,SafeAreaView,StyleSheet,ActivityIndicator,ScrollView,RefreshControl,Image,Dimensions,FlatList,
// } from "react-native";
// import * as Location from "expo-location";

// const openWeatherKey = "be6c4811e399f949c45ee73b725eb2a6";

// const currentUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${openWeatherKey}`;
// const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${openWeatherKey}`;

// export default function Weather() {
//     const [forecast, setForecast] = useState<any>(null);
//     const [refreshing, setRefreshing] = useState(false);

//     const loadForecast = async () => {
//         setRefreshing(true);
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//             Alert.alert("Permission denied");
//             setRefreshing(false);
//             return;
//         }

//         try {
//             let location = await Location.getCurrentPositionAsync({});
//             const currentResponse = await fetch(
//                 `${currentUrl}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
//             );
//             const forecastResponse = await fetch(
//                 `${forecastUrl}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
//             );

//             if (!currentResponse.ok || !forecastResponse.ok) {
//                 throw new Error("Weather API error");
//             }

//             const currentData = await currentResponse.json();
//             const forecastData = await forecastResponse.json();

//             setForecast({
//                 current: currentData,
//                 hourly: forecastData.list,
//             });
//         } catch (err: any) {
//             Alert.alert("Error", err.message);
//         }
//         setRefreshing(false);
//     };

//     useEffect(() => {
//         loadForecast();
//     }, []);

//     if (!forecast) {
//         return (
//             <SafeAreaView style={styles.loading}>
//                 <ActivityIndicator size="large" color="#007AFF" />
//             </SafeAreaView>
//         );
//     }

//     const current = forecast.current.weather[0];
//     const temperature = forecast.current.main.temp;

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* Top Section */}
//             <View style={styles.topSection}>
//                 <ScrollView
//                     refreshControl={
//                         <RefreshControl refreshing={refreshing} onRefresh={loadForecast} />
//                     }
//                 >
//                     <Text style={styles.title}>Current Weather</Text>
//                     <Text style={styles.location}>
//                         {forecast.current.name}, {forecast.current.sys.country}
//                     </Text>

//                     <View style={styles.current}>
//                         <Image
//                             source={{
//                                 uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
//                             }}
//                             style={styles.largeIcon}
//                         />
//                         <Text style={styles.temperature}>{Math.round(temperature)}°C</Text>
//                     </View>

//                     <Text style={styles.currentDescription}>{current.description}</Text>

//                     {/* Info Cards */}
//                     <View style={styles.extraInfo}>
//                         <View style={styles.infoCard}>
//                             <Image
//                                 source={require("../../assets/Temp.png")}
//                                 style={styles.icon}
//                             />
//                             <Text style={styles.infoText}>
//                                 {forecast.current.main.feels_like}°C
//                             </Text>
//                             <Text style={styles.infoLabel}>Feels Like</Text>
//                         </View>

//                         <View style={styles.infoCard}>
//                             <Image
//                                 source={require("../../assets/humidity.png")}
//                                 style={styles.icon}
//                             />
//                             <Text style={styles.infoText}>
//                                 {forecast.current.main.humidity}%
//                             </Text>
//                             <Text style={styles.infoLabel}>Humidity</Text>
//                         </View>
//                     </View>

//                     <Text style={styles.subTitle}>Next 24 Hours</Text>

//                     {/* Forecast */}
//                     <FlatList
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         data={forecast.hourly.slice(0, 8)}
//                         keyExtractor={(item) => item.dt.toString()}
//                         renderItem={({ item }) => {
//                             const weather = item.weather[0];
//                             const dt = new Date(item.dt * 1000);
//                             return (
//                                 <View style={styles.hourCard}>
//                                     <Text style={styles.hourTemp}>
//                                         {Math.round(item.main.temp)}°C
//                                     </Text>
//                                     <Image
//                                         source={{
//                                             uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
//                                         }}
//                                         style={styles.smallIcon}
//                                     />
//                                     <Text style={styles.hourDesc}>{weather.description}</Text>
//                                     <Text style={styles.hourTime}>{dt.getHours()}:00</Text>
//                                 </View>
//                             );
//                         }}
//                     />
//                 </ScrollView>
//             </View>

//             {/* Bottom Section - Reserved for action buttons */}
//             <View style={styles.bottomSection}></View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#F2F8FF" },
//     loading: { flex: 1, justifyContent: "center", alignItems: "center" },

//     title: {
//         textAlign: "center",
//         fontSize: 32,
//         fontWeight: "700",
//         color: "#007AFF",
//         marginBottom: 5,
//     },
//     location: {
//         textAlign: "center",
//         fontSize: 18,
//         fontWeight: "500",
//         color: "#333",
//         marginBottom: 10,
//     },

//     // Current Weather
//     current: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         marginVertical: 10,
//     },
//     largeIcon: {
//         width: 150,
//         height: 150,
//         backgroundColor: "rgba(0,0,255,0.1)", 
//         borderRadius: 75, 
//         padding: 10
//     },
//     temperature: { fontSize: 42, fontWeight: "bold", marginLeft: 20, color: "#007AFF" },
//     currentDescription: {
//         width: "100%",
//         textAlign: "center",
//         fontSize: 20,
//         fontWeight: "500",
//         color: "#555",
//         marginBottom: 20,
//     },

//     // Info Cards
//     extraInfo: {
//         flexDirection: "row",
//         justifyContent: "space-around",
//         marginVertical: 10,
//     },
//     infoCard: {
//         width: Dimensions.get("window").width / 2.5,
//         backgroundColor: "#fff",
//         padding: 15,
//         marginHorizontal: 5,
//         borderRadius: 15,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     icon: { width: 40, height: 40, borderRadius: 20, marginBottom: 5 },
//     infoText: { fontSize: 20, fontWeight: "600", color: "#007AFF" },
//     infoLabel: { fontSize: 14, color: "#666", marginTop: 2 },

//     // Forecast
//     subTitle: {
//         fontSize: 22,
//         marginVertical: 12,
//         alignSelf: "center",
//         color: "#005BBB",
//         fontWeight: "700",
//     },
//     hourCard: {
//         padding: 10,
//         width: 150,
//         height: 150,
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         alignItems: "center",
//         marginHorizontal: 8,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     hourTemp: { fontWeight: "700", fontSize: 16, color: "#007AFF" },
//     hourDesc: { fontSize: 12, color: "#444", marginVertical: 4, textAlign: "center" },
//     hourTime: { fontSize: 14, fontWeight: "500", color: "#007AFF" },
//     smallIcon: { width: 60, height: 60 },

//     // Sections
//     topSection: { flex: 3 },
//     bottomSection: {
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F2F8FF",
//     },
// });


//3rd demo

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Alert,
//   SafeAreaView,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   RefreshControl,
//   Image,
//   Dimensions,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import * as Location from "expo-location";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const openWeatherKey = "be6c4811e399f949c45ee73b725eb2a6";
// const currentUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${openWeatherKey}`;
// const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${openWeatherKey}`;

// export default function Weather() {
//   const [forecast, setForecast] = useState<any>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search, setSearch] = useState("");
//   const [savedList, setSavedList] = useState<any[]>([]);
//   const [lastPress, setLastPress] = useState<number>(0);


//   useEffect(() => {
//     loadForecast();
//     loadSaved();
//   }, []);

//   const loadSaved = async () => {
//     const data = await AsyncStorage.getItem("savedWeather");
//     if (data) setSavedList(JSON.parse(data));
//   };

//   const saveToStorage = async (item: any) => {
//     const updated = [...savedList, item];
//     setSavedList(updated);
//     await AsyncStorage.setItem("savedWeather", JSON.stringify(updated));
//   };

//   const deleteItem = async (itemId: string) => {
//     const updated = savedList.filter((item) => item.id !== itemId);
//     setSavedList(updated);
//     await AsyncStorage.setItem("savedWeather", JSON.stringify(updated));
//   };

//   const handleDoublePress = (itemId: string) => {
//     const time = new Date().getTime();
//     const delta = time - lastPress;
//     const DOUBLE_PRESS_DELAY = 300; // ms
//     if (delta < DOUBLE_PRESS_DELAY) {
//       deleteItem(itemId);
//     }
//     setLastPress(time);
//   };


//   const loadForecast = async () => {
//     setRefreshing(true);
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission denied");
//       setRefreshing(false);
//       return;
//     }

//     try {
//       let location = await Location.getCurrentPositionAsync({});
//       await loadByCoords(location.coords.latitude, location.coords.longitude);
//     } catch (err: any) {
//       Alert.alert("Error", err.message);
//     }
//     setRefreshing(false);
//   };


//   const loadByCoords = async (lat: number, lon: number) => {
//     const currentResponse = await fetch(`${currentUrl}&lat=${lat}&lon=${lon}`);
//     const forecastResponse = await fetch(`${forecastUrl}&lat=${lat}&lon=${lon}`);
//     if (!currentResponse.ok || !forecastResponse.ok) throw new Error("API error");

//     const currentData = await currentResponse.json();
//     const forecastData = await forecastResponse.json();

//     setForecast({ current: currentData, hourly: forecastData.list });
//   };


//   const searchWeather = async () => {
//     if (!search.trim()) return;
//     try {
//       const res = await fetch(`${currentUrl}&q=${search}`);
//       if (!res.ok) throw new Error("City not found");
//       const data = await res.json();

//       saveToStorage({
//         id: data.id.toString(),
//         name: data.name,
//         country: data.sys.country,
//         lat: data.coord.lat,
//         lon: data.coord.lon,
//       });
//       setSearch("");
//     } catch (err: any) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   if (!forecast) {
//     return (
//       <SafeAreaView style={styles.loading}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </SafeAreaView>
//     );
//   }

//   const current = forecast.current.weather[0];
//   const temperature = forecast.current.main.temp;

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* 🔍 Search */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Enter city name..."
//           value={search}
//           onChangeText={setSearch}
//         />
//         <TouchableOpacity style={styles.searchBtn} onPress={searchWeather}>
//           <Text style={{ color: "#fff", fontWeight: "600" }}>Search</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 🌤 Scrollable content */}
//       <ScrollView
//         style={{ flex: 1 }}
//         contentContainerStyle={{ paddingBottom: 150 }} // leave space for bottom
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={loadForecast} />
//         }
//       >
//         {/* Current Weather */}
//         <Text style={styles.title}>Current Weather</Text>
//         <Text style={styles.location}>
//           {forecast.current.name}, {forecast.current.sys.country}
//         </Text>

//         <View style={styles.current}>
//           <Image
//             source={{
//               uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
//             }}
//             style={styles.largeIcon}
//           />
//           <Text style={styles.temperature}>{Math.round(temperature)}°C</Text>
//         </View>
//         <Text style={styles.currentDescription}>{current.description}</Text>

//         {/* Feels Like & Humidity */}
//         <View style={styles.extraInfo}>
//           <View style={styles.infoCard}>
//             <Image
//               source={require("../../assets/Temp.png")}
//               style={styles.icon}
//             />
//             <Text style={styles.infoText}>
//               {forecast.current.main.feels_like}°C
//             </Text>
//             <Text style={styles.infoLabel}>Feels Like</Text>
//           </View>
//           <View style={styles.infoCard}>
//             <Image
//               source={require("../../assets/humidity.png")}
//               style={styles.icon}
//             />
//             <Text style={styles.infoText}>
//               {forecast.current.main.humidity}%
//             </Text>
//             <Text style={styles.infoLabel}>Humidity</Text>
//           </View>
//         </View>

//         {/* Next 24 Hours */}
//         <Text style={styles.subTitle}>Next 24 Hours</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {forecast.hourly.slice(0, 8).map((item: any) => {
//             const weather = item.weather[0];
//             const dt = new Date(item.dt * 1000);
//             return (
//               <View key={item.dt} style={styles.hourCard}>
//                 <Text style={styles.hourTemp}>
//                   {Math.round(item.main.temp)}°C
//                 </Text>
//                 <Image
//                   source={{
//                     uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
//                   }}
//                   style={styles.smallIcon}
//                 />
//                 <Text style={styles.hourDesc}>{weather.description}</Text>
//                 <Text style={styles.hourTime}>{dt.getHours()}:00</Text>
//               </View>
//             );
//           })}
//         </ScrollView>

//         {/* Saved Locations */}
//         <Text style={styles.subTitle}>Saved Locations</Text>
//         {savedList.map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             onPress={() => loadByCoords(item.lat, item.lon)}
//             onPressIn={() => handleDoublePress(item.id)}
//             style={styles.savedCard}
//           >
//             <Text style={{ fontSize: 16, fontWeight: "600" }}>
//               {item.name}, {item.country}
//             </Text>
//             <Text style={{ fontSize: 12, color: "#999" }}>
//               (Double tap to delete)
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F2F8FF" },
//   loading: { flex: 1, justifyContent: "center", alignItems: "center" },

//   // Search
//   searchContainer: { flexDirection: "row", padding: 10, backgroundColor: "#fff" },
//   searchInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     backgroundColor: "#f9f9f9",
//   },
//   searchBtn: {
//     marginLeft: 10,
//     backgroundColor: "#007AFF",
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     justifyContent: "center",
//   },

//   // Weather
//   title: { textAlign: "center", fontSize: 28, fontWeight: "700", color: "#007AFF" },
//   location: { textAlign: "center", fontSize: 18, fontWeight: "500", marginBottom: 10 },
//   current: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
//    largeIcon: {
//         width: 150,
//         height: 150,
//         backgroundColor: "rgba(0,0,255,0.1)", 
//         borderRadius: 75,     
//     },
//   temperature: { fontSize: 40, fontWeight: "bold", marginLeft: 20, color: "#007AFF" },
//   currentDescription: { textAlign: "center", fontSize: 18, marginBottom: 20 },

//   extraInfo: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
//   infoCard: {
//     width: Dimensions.get("window").width / 2.5,
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//     elevation: 3,
//   },
//   icon: { width: 40, height: 40, marginBottom: 5 },
//   infoText: { fontSize: 20, fontWeight: "600", color: "#007AFF" },
//   infoLabel: { fontSize: 14, color: "#666", marginTop: 2 },

//   subTitle: { fontSize: 20, fontWeight: "700", marginVertical: 8, textAlign: "center" },
//   hourCard: {
//     padding: 10,
//     width: 120,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     alignItems: "center",
//     marginHorizontal: 8,
//     elevation: 3,
//   },
//   hourTemp: { fontWeight: "700", fontSize: 16, color: "#007AFF" },
//   hourDesc: { fontSize: 12, color: "#444", marginVertical: 4, textAlign: "center" },
//   hourTime: { fontSize: 14, fontWeight: "500", color: "#007AFF" },
//   smallIcon: { width: 50, height: 50 },

//   // Saved list
//   savedCard: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginVertical: 4,
//     borderRadius: 10,
//     marginHorizontal: 10,
//     elevation: 2,
//   },
// });




//4th demo
import React, { useEffect, useState } from "react";
import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image, Dimensions, TextInput, TouchableOpacity, } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const openWeatherKey = "be6c4811e399f949c45ee73b725eb2a6";
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${openWeatherKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${openWeatherKey}`;

export default function Weather() {
  const [getForecast, setForecast] = useState<any>(null);
  const [getRefreshing, setRefreshing] = useState(false);
  const [getSearch, setSearch] = useState("");
  const [getSavedList, setSavedList] = useState<any[]>([]);
  const [getLastPress, setLastPress] = useState<number>(0);

  useEffect(() => {
    loadForecast();
    loadSaved();
  }, []);

  const loadSaved = async () => {
    const data = await AsyncStorage.getItem("savedWeather");
    if (data) setSavedList(JSON.parse(data));
  };

  const saveToStorage = async (item: any) => {
    // prevent duplicates by filtering
    const exists = getSavedList.find((i) => i.id === item.id);
    if (exists) return;

    const updated = [...getSavedList, item];
    setSavedList(updated);
    await AsyncStorage.setItem("savedWeather", JSON.stringify(updated));
  };

  const deleteItem = async (itemId: string) => {
    const updated = getSavedList.filter((item) => item.id !== itemId);
    setSavedList(updated);
    await AsyncStorage.setItem("savedWeather", JSON.stringify(updated));
  };

  const handleDoublePress = (itemId: string) => {
    const time = new Date().getTime();
    const delta = time - getLastPress;
    const DOUBLE_PRESS_DELAY = 300; // ms
    if (delta < DOUBLE_PRESS_DELAY) {
      deleteItem(itemId);
    }
    setLastPress(time);
  };

  // when refreshing, always load current location instead of saved
  const loadForecast = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied");
      setRefreshing(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      await loadByCoords(location.coords.latitude, location.coords.longitude);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
    setRefreshing(false);
  };


  const loadByCoords = async (lat: number, lon: number) => {
    const currentResponse = await fetch(`${currentUrl}&lat=${lat}&lon=${lon}`);
    const forecastResponse = await fetch(`${forecastUrl}&lat=${lat}&lon=${lon}`);
    if (!currentResponse.ok || !forecastResponse.ok) throw new Error("API error");

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    setForecast({ current: currentData, hourly: forecastData.list });
  };


  const searchWeather = async () => {
    if (!getSearch.trim()) return;
    try {
      const res = await fetch(`${currentUrl}&q=${getSearch}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();

      // update UI immediately with searched city
      await loadByCoords(data.coord.lat, data.coord.lon);

      // save only once to storage
      saveToStorage({
        id: data.id.toString(),
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
      });

      setSearch("");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  if (!getForecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  const current = getForecast.current.weather[0];
  const temperature = getForecast.current.main.temp;

  return (

    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/weather_bg.png")} 
        style={StyleSheet.absoluteFillObject}
        blurRadius={6} 
      />

      {/*Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name..."
          placeholderTextColor="#aaa"
          value={getSearch}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={searchWeather}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }} 
        refreshControl={
          <RefreshControl refreshing={getRefreshing} onRefresh={loadForecast} />
        }
      >
        {/* Current Weather */}
        <View style={styles.card}>
          <Text style={styles.title}>Current Weather</Text>
          <Text style={styles.location}>
            {getForecast.current.name}, {getForecast.current.sys.country}
          </Text>

          <View style={styles.current}>
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
              }}
              style={styles.largeIcon}
            />
            <Text style={styles.temperature}>{Math.round(temperature)}°C</Text>
          </View>
          <Text style={styles.currentDescription}>{current.description}</Text>

          {/* Feels Like & Humidity */}
          <View style={styles.extraInfo}>
            <View style={styles.infoCard}>
              <Image
                source={require("../../assets/Temp.png")}
                style={styles.icon}
              />
              <Text style={styles.infoText}>
                {getForecast.current.main.feels_like}°C
              </Text>
              <Text style={styles.infoLabel}>Feels Like</Text>
            </View>
            <View style={styles.infoCard}>
              <Image
                source={require("../../assets/humidity.png")}
                style={styles.icon}
              />
              <Text style={styles.infoText}>
                {getForecast.current.main.humidity}%
              </Text>
              <Text style={styles.infoLabel}>Humidity</Text>
            </View>
          </View>
        </View>

        {/* Next 24 Hours */}
        <View style={styles.card}>
          <Text style={styles.subTitle}>Next 24 Hours</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getForecast.hourly.slice(0, 8).map((item: any) => {
              const weather = item.weather[0];
              const dt = new Date(item.dt * 1000);
              return (
                <View key={item.dt} style={styles.hourCard}>
                  <Text style={styles.hourTemp}>
                    {Math.round(item.main.temp)}°C
                  </Text>
                  <Image
                    source={{
                      uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
                    }}
                    style={styles.smallIcon}
                  />
                  <Text style={styles.hourDesc}>{weather.description}</Text>
                  <Text style={styles.hourTime}>{dt.getHours()}:00</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Saved Locations */}
        <View style={styles.card}>
          <Text style={styles.subTitle}>Saved Locations</Text>
          {getSavedList.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#666", marginVertical: 10 }}>
              No saved locations yet
            </Text>
          ) : (
            getSavedList.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => loadByCoords(item.lat, item.lon)}
                onPressIn={() => handleDoublePress(item.id)}
                style={styles.savedCard}
              >
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#007AFF" }}>
                  {item.name}, {item.country}
                </Text>
                <Text style={{ fontSize: 12, color: "#999" }}>
                  (Double tap to delete)
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000"
  },
  loading: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.85)",
    margin: 10,
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  // Search
  searchContainer: { 
    flexDirection: "row", 
    padding: 10, 
    backgroundColor: "#fff"
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  searchBtn: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "center",
  },

  // Weather
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  location: { 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "500", 
    marginBottom: 10 
  },
  current: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  largeIcon: {
    width: 150,
    height: 150,
  },
  temperature: { 
    fontSize: 40, 
    fontWeight: "bold", 
    marginLeft: 20, 
    color: "#007AFF"
  },
  currentDescription: { 
    textAlign: "center", 
    fontSize: 18, 
    marginBottom: 20
  },

  extraInfo: { 
    flexDirection: "row", 
    justifyContent: "space-around",
    marginVertical: 10 
  },
  infoCard: {
    width: Dimensions.get("window").width / 2.5,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  icon: { 
    width: 40, 
    height: 40, 
    marginBottom: 5 
  },
  infoText: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#007AFF"
  },
  infoLabel: { 
    fontSize: 14, 
    color: "#666", 
    marginTop: 2
  },

 hourCard: {
  padding: 12,
  width: 110,
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: 16,
  alignItems: "center",
  marginHorizontal: 6,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 3,
},

hourTemp: { 
  fontWeight: "700", 
  fontSize: 18, 
  color: "#007AFF", 
  marginBottom: 4 
},

hourDesc: { 
  fontSize: 12, 
  color: "#444", 
  textAlign: "center", 
  marginBottom: 4 
},

hourTime: { 
  fontSize: 14, 
  fontWeight: "600", 
  color: "#333" 
},

smallIcon: { 
  width: 50, 
  height: 50, 
  marginBottom: 4 
},


  // Saved list
  savedCard: {
    backgroundColor: "#f1f6ff",
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dde7ff",
  },
});




