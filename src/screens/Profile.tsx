import { CommonActions, RouteProp, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, ImageBackground, Text, TextInput, Pressable, KeyboardAvoidingView, Image, ScrollView, Alert } from "react-native";
import { RootParamList } from "../../App";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RefreshControl } from "react-native-gesture-handler";


type ProfileNavigationProps = RouteProp<RootParamList, "Profile">;
type SplashNavigationProps = NativeStackNavigationProp<
    RootParamList,
    "Splash"
>;
const PUBLIC_URL = "https://4a9076771255.ngrok-free.app";

type Props = {
    route: ProfileNavigationProps;
};

export function ProfileScreen({ route }: Props) {
    //const navigation = useNavigation<SplashNavigationProps>();
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

    const [image, setImage] = React.useState<string | null>(null);
    const [getCities, setCities] = React.useState<{ id: number; name: string }[]>([]);
    const [selectedCity, setSelectedCity] = React.useState("");
    const [getFullName, setFullName] = React.useState("");
    const [getUserName, setUserName] = React.useState("");
    const [getEmail, setEmail] = React.useState("");
    const [getPassword, setPassword] = React.useState("");
    const [getConfirmPassword, setConfirmPassword] = React.useState("");

    // load cities
    useEffect(() => {
        const loadCities = async () => {
            try {
                const response = await fetch(PUBLIC_URL + "/SkySnap/Cities");
                if (response.ok) {
                    const json = await response.json();
                    setCities(json);
                }
            } catch (e) {
                console.error("City load failed", e);
            }
        };
        loadCities();
    }, []);

    //load Deatils

    useEffect(() => {
        const loadUser = async () => {
            try {
                let username = route?.params?.name;
                if (!username) return;

                const response = await fetch(PUBLIC_URL + "/SkySnap/LoadUsers?username=" + username);
                if (response.ok) {
                    const json = await response.json();
                    // console.log(json);
                    if (json.status) {
                        setFullName(json.fullName);
                        setUserName(json.userName);
                        setEmail(json.email);
                        setPassword(json.password);
                        setConfirmPassword("");
                        setSelectedCity(json.city_id);
                        setImage(json.profile_image);
                        //   console.log(json.profile_image);
                    } else {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: "Warning",
                            textBody: json.message,
                        });
                        return;
                    }
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: "Server Error",
                    });
                    return;
                }
            } catch (e) {
                console.error("User load failed", e);
            }
        };
        loadUser();
    }, [route?.params?.name]);


    // pick image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // update request
    const handleUpdate = async () => {
        if (!getFullName || !getUserName || !getEmail || !getPassword || !getConfirmPassword || !selectedCity) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: "Please fill all required fields",
            });
            return;
        }
        if (getPassword !== getConfirmPassword) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: "Passwords do not match!",
            });
            return;
        }

        let formData = new FormData();
        formData.append("fullName", getFullName);
        formData.append("userName", getUserName);
        formData.append("email", getEmail);
        formData.append("password", getPassword);
        formData.append("confirmPassword", getConfirmPassword);
        formData.append("city", selectedCity);
        if (image) {
            formData.append("profileImage", {
                uri: image,
                name: "profile.jpg",
                type: "image/jpg",
            } as any);
        }

        const response = await fetch(PUBLIC_URL + "/SkySnap/UpdateAccount", {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "Account Updated Successfully!",
                });

                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                }, 1500);
            } else {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: json.message,
                });
            }
        }

        if (!response.ok) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Error",
                textBody: "Server Error!",
            });
        }

    };

    return (
        <AlertNotificationRoot>
            <ImageBackground
                source={{ uri: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1350&q=80" }}
                style={styles.background}
                blurRadius={3}
            >
                <KeyboardAvoidingView
                    behavior={"padding"}
                    keyboardVerticalOffset={40}
                    style={styles.overlay}
                >
                    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}
                    >
                        <View style={styles.card}>
                            <Text style={styles.title}>User Profile</Text>

                            {/* Profile Image Picker */}
                            <Pressable onPress={pickImage} style={styles.imageUploader}>
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.profileImage} />
                                ) : (
                                    <Text style={{ fontSize: 32, color: "#888" }}>+</Text>
                                )}
                            </Pressable>

                            <TextInput placeholder="Full Name" placeholderTextColor="#888" style={styles.input}
                                value={getFullName} onChangeText={setFullName} />
                            <TextInput placeholder="Username" placeholderTextColor="#888" style={styles.input}
                                value={getUserName} onChangeText={setUserName} />
                            <TextInput placeholder="Email" placeholderTextColor="#888" style={styles.input}
                                keyboardType="email-address" value={getEmail} onChangeText={setEmail} readOnly />
                            <TextInput placeholder="Password" placeholderTextColor="#888" style={styles.input}
                                secureTextEntry value={getPassword} onChangeText={setPassword} />
                            <TextInput placeholder="Confirm Password" placeholderTextColor="#888" style={styles.input}
                                secureTextEntry value={getConfirmPassword} onChangeText={setConfirmPassword} />

                            {/* City Picker */}
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedCity}
                                    style={styles.picker}
                                    onValueChange={(val) => setSelectedCity(val)}
                                >
                                    <Picker.Item label="Select Your City" value="" />
                                    {getCities.map((city) => (
                                        <Picker.Item key={city.id} label={city.name} value={city.id} />
                                    ))}
                                </Picker>
                            </View>

                            <Pressable style={styles.loginButton} onPress={handleUpdate}>
                                <Text style={styles.loginButtonText}>Update Account</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </AlertNotificationRoot>
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
        marginVertical: 10,
        padding: 15,
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
    // added styles for profile image
    imageUploader: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#3498db",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 20,
        backgroundColor: "#f0f0f0",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    picker: {
        height: 50,
    },
});

