import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton, Swipeable } from "react-native-gesture-handler";

export default function SavedWeather() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    loadSavedLocations();
  }, []);

  const loadSavedLocations = async () => {
    const data = await AsyncStorage.getItem("savedWeather");
    if (data) setLocations(JSON.parse(data));
  };

  const deleteLocation = async (index: number) => {
    const updated = locations.filter((_, i) => i !== index);
    setLocations(updated);
    await AsyncStorage.setItem("savedWeather", JSON.stringify(updated));
  };

  const renderItem = ({ item, index }: any) => (
    <Swipeable
      renderRightActions={() => (
        <RectButton
          style={styles.deleteBtn}
          onPress={() => deleteLocation(index)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </RectButton>
      )}
    >
      <View style={styles.item}>
        <Text style={styles.city}>{item.city}</Text>
        <Text>
          {item.temperature}°C - {item.condition}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 16,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 8,
  },
  city: { fontWeight: "bold", fontSize: 18 },
  deleteBtn: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  deleteText: { color: "white", fontWeight: "bold" },
});
