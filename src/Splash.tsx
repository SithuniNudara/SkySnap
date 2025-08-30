import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,TouchableOpacity,ImageBackground,Dimensions,Animated,Easing,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../App";

type SplashNavigationProps = NativeStackNavigationProp<
  RootParamList,
  "Splash"
>;

const { width, height } = Dimensions.get("window");

export function SplashScreen() {
  const navigation = useNavigation<SplashNavigationProps>();
  const [buttonScale] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleWelcome = () => {
    // Navigate to Home or Login (your choice)
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      }}
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>SkySnap</Text>
          <Text style={styles.subtitle}>Your Personal Weather Companion</Text>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.welcomeButton}
            onPress={handleWelcome}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Text style={styles.welcomeButtonText}>Welcome</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Discover weather patterns around you
          </Text>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  header: {
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  welcomeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  welcomeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
