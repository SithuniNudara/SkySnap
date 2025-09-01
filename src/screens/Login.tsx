import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import {View,StyleSheet,ImageBackground,Text,TextInput,Pressable,KeyboardAvoidingView,} from "react-native";
import { RootParamList } from "../../App";
import React from "react";

type LoginNavigationProps = NativeStackNavigationProp<RootParamList, "Login">;

const PUBLIC_URL = "https://bc0efc3f1a98.ngrok-free.app";

export function LoginScreen() {
    const navigation = useNavigation<LoginNavigationProps>();

    const handleWelcome = (username: string) => {
        navigation.replace("Home", { username });
    };

    const [getEmail, setEmail] = React.useState("");
    const [getPassword, setPassword] = React.useState("");

    const handleLogin = async () => {
        const loginDetails = {
            email: getEmail,
            password: getPassword,
        };

        try {
            const response = await fetch(PUBLIC_URL + "/SkySnap/SignIn", {
                method: "POST",
                body: JSON.stringify(loginDetails),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "Success",
                        textBody: "Welcome!",
                    });
                    setEmail("");
                    setPassword("");
                    handleWelcome(json.loggedUser.username);
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "Somthing Went Wrong!",
                    });
                }
            } else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Error",
                    textBody: "Server Side Error!",
                });
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: "Network Error!",
            });
        }
    };

    //handleSignUp
     const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    return (

        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1350&q=80",
            }}
            style={styles.background}
            blurRadius={3}
        >

            <KeyboardAvoidingView
                behavior={"padding"}
                keyboardVerticalOffset={40}
                style={styles.overlay}
            >
                <View style={styles.card}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Login to continue</Text>

                    <TextInput
                        placeholder="Email Address"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={getEmail}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        onChangeText={setPassword}
                        value={getPassword}
                        style={styles.input}
                    />

                    <Pressable style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>

                    <Pressable style={styles.createAccountButton} onPress={handleSignUp}>
                        <Text style={styles.createAccountButtonText}>Create Account</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>


        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 25,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#3498db",
        textAlign: "center",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        marginBottom: 15,
        borderColor: "#ddd",
        backgroundColor: "#f9f9f9",
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "#3498db",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    createAccountButton: {
        borderWidth: 1,
        borderColor: "#3498db",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    createAccountButtonText: {
        color: "#3498db",
        fontSize: 16,
        fontWeight: "600",
    },
});
