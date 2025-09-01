import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, Modal, StyleSheet, Alert } from "react-native";
import { SplashScreen } from './src/Splash';
import { HomeScreen } from './src/screens/Home';
import { ProfileScreen } from './src/screens/Profile';
import { LoginScreen } from './src/screens/Login';
import { AlertNotificationRoot} from 'react-native-alert-notification';
import { SignUpScreen } from './src/screens/SignUp';

export type RootParamList = {
  Splash: undefined;
  Home: { username: string };
  Login: undefined;
  SignUp: undefined;
  Profile: { name: string };
}

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Create New Account" }} />
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>

  );
}



