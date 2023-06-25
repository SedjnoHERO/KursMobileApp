import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, } from "react-native";
import { Feather } from "@expo/vector-icons";
import { gStyle, isDarkMode } from "../styles/style";
import { Title } from "../styles/CONST";
import AsyncStorage from "@react-native-async-storage/async-storage";

const avatars = [
    require("../assets/avatars/dog.png"),
    require("../assets/avatars/fox.png"),
    require("../assets/avatars/jiraf.png"),
    require("../assets/avatars/monkey.png"),
    require("../assets/avatars/owl.png"),
];

export default function Settings({ navigation }) {

    const [username, setUsername] = useState("");

    useEffect(() => {
        getStoredUsername();
    }, []);

    const getStoredUsername = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem("UserName");
            setUsername(storedUsername);
        } catch (error) {
            console.log(error);
        }
    };

    const [email, setEmail] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [phone, setPhone] = useState("");

    const handleEmailChange = (text) => {
        if (/^[a-zA-Z0-9\s\.,!@#$%^&*()-_=+[\]{}|\\;:'"<>/`~]+$/.test(text)) {
            setEmail(text);
        }
    };

    const validateEmail = (email) => {
        const regex = /@(mail.ru|gmail.com)$/;
        return regex.test(email);
    };

    const isEmailValid = validateEmail(email);

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePhoneChange = (text) => {
        const cleanedNumber = text.replace(/[^\d\s+]/g, '');
        const numberWithoutSpaces = cleanedNumber.replace(/\s/g, '');

        if (numberWithoutSpaces.startsWith('+375')) {
            let formattedNumber = '+375';
            if (numberWithoutSpaces.length > 4) {
                const operatorCodeLength = Math.min(2, numberWithoutSpaces.length - 4);
                formattedNumber += ' ' + numberWithoutSpaces.slice(4, 4 + operatorCodeLength);
                const remainingDigits = numberWithoutSpaces.slice(4 + operatorCodeLength);
                if (remainingDigits.length > 0) {
                    const chunks = remainingDigits.match(/(\d{2,3})(\d+)/);
                    if (chunks) {
                        formattedNumber += ' ' + chunks[1] + ' ' + chunks[2].replace(/(\d{2})(?=\d{2}(\d{2})*$)/g, '$1 ');
                    } else {
                        formattedNumber += ' ' + remainingDigits;
                    }
                }
            }
            setPhone(formattedNumber);
            setIsPhoneValid(true)
        } else {
            setPhone(numberWithoutSpaces);
            setIsPhoneValid(false)
        }
    };

    const [randomAvatar, setRandomAvatar] = useState(null);
    useEffect(() => {
        getStoredUsername();
        selectRandomAvatar();
    }, []);
    const selectRandomAvatar = () => {
        const randomAvatarIndex = Math.floor(Math.random() * avatars.length);
        const selectedAvatar = avatars[randomAvatarIndex];
        setRandomAvatar(selectedAvatar);
    };
    return (
        <KeyboardAvoidingView
            behavior={"padding"}
            style={[gStyle.page, { justifyContent: "flex-start" }]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <Title text="Параметры" />
                    <ScrollView
                        bounces={false}
                        contentContainerStyle={{ alignItems: "center" }}
                        style={{
                            flex: 1,
                            paddingHorizontal: 50,
                            paddingTop: 16,
                        }}
                    >
                        <View style={{ marginTop: 138, alignItems: "center" }}>
                            <View style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 16, }}>
                                <TouchableOpacity onLongPress={selectRandomAvatar}>
                                    <View style={styles.avatarContainer}>
                                        {randomAvatar && (
                                            <ImageBackground
                                                source={randomAvatar}
                                                style={styles.avatarImage}
                                                resizeMode="cover"
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 23 }}>
                                <View style={{ borderRadius: 6, height: 30, paddingHorizontal: 10, backgroundColor: isDarkMode() ? "#FFCA1D" : "#66CDAA", }}>
                                    <Text style={[gStyle.specText, { color: isDarkMode() ? "#6757CB" : "white", fontFamily: "mt-bold", marginLeft: 10, marginRight: 10, },]}>{username}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", left: -20, marginTop: 30, }}>
                            <Text style={[gStyle.title, { fontSize: 20, textAlign: "left", marginBottom: 5 },]}>Имя</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput style={[styles.textInput, gStyle.funcText]}
                                    value={username}
                                    onChangeText={handleUsernameChange}
                                    placeholder="Введите имя"
                                />
                                <Feather name='edit' size={14} />
                            </View>
                            <Text style={[gStyle.title, { fontSize: 20, textAlign: "left", marginBottom: 5 },]}>Почта</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <TextInput style={[styles.textInput, gStyle.funcText, !isEmailValid && styles.invalidTextInput,]}
                                    value={email}
                                    onChangeText={handleEmailChange}
                                    placeholder="example@gmail.com"
                                    maxLength={30}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <Feather name='edit' size={14} />
                            </View>
                            <Text style={[gStyle.title, { fontSize: 20, textAlign: "left", marginBottom: 5 },]}>Номер телефона</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <TextInput style={[styles.textInput, gStyle.funcText, !isPhoneValid && styles.invalidTextInput,]}
                                    value={phone}
                                    onChangeText={handlePhoneChange}
                                    maxLength={16}
                                    placeholder="+375 XX XXX XX XX"
                                    keyboardType="phone-pad"
                                    autoCapitalize="none"
                                />
                                <Feather name='edit' size={14} />
                            </View>
                        </View>

                    </ScrollView>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    );
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        marginBottom: 15,
        height: 40,
        borderRadius: 6,
        fontSize: 16,
        borderBottomWidth: 1,
        width: 250,
    },
    invalidTextInput: {
        borderColor: "red",
        borderBottomWidth: 1,
    },
    avatarContainer: {
        width: 243,
        height: 243,
        borderRadius: 110,
        overflow: "hidden",
    },
    avatarImage: {
        flex: 1,
    },
});
