import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, Touchable, Button } from "react-native";
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
      headerRight: () => (
         <Button
          title={"Profile"}
          color="#44bd32"
          onPress={() => {
            navigation.navigate("Profile", {name: username });
          }}
        />
      ),
    });
  }, [navigation, username]);

  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

