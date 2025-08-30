import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from './src/Splash';
import { HomeScreen } from './src/screens/Home';
import { ProfileScreen } from './src/screens/Profile';
import { LoginScreen } from './src/screens/Login';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { SignUpScreen } from './src/screens/SignUp';
import SavedWeather from './src/screens/SavedWeather';

export type RootParamList = {
  //no arguments
  Splash: undefined;
  Home: { username: string };
  Login: undefined;
  SignUp: undefined;
  SavedWeather: { searchResults?: any[] };  
  //argument
  Profile: { userId: number, name: string };
}

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Splash" component={SplashScreen}  options={{headerShown:false}} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{
            title: "Hi,"
          }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{title:"Create New Account"}} />
          <Stack.Screen name="SavedWeather" component={SavedWeather} options={{title:"Search Results"}} />
          <Stack.Screen name="Profile" component={ProfileScreen}
            options={{
              headerRight: () => (
                <Button title="Button" onPress={() => {
                  Alert.alert("Ok");
                }} />
              )
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>

  );
}



