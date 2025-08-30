import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { RootParamList } from "../../App";
import Weather from "./Weather";
import React, { useEffect } from "react";

type HomeNavigationProps = NativeStackNavigationProp<RootParamList, "Home">;
type HomeRouteProps = RouteProp<RootParamList, "Home">;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProps>();
  const route = useRoute<HomeRouteProps>();

  const { username } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: `Hi, ${username}`,
    });
  }, [navigation, username]);

  return (
    <View style={styles.container}>
      {/* Weather no longer needs props */}
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

