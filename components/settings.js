import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { gStyle, isDarkMode } from '../styles/style';
import { Title } from '../styles/CONST';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatars = [
    require('../assets/avatars/dog.png'),
    require('../assets/avatars/fox.png'),
    require('../assets/avatars/jiraf.png'),
    require('../assets/avatars/monkey.png'),
    require('../assets/avatars/owl.png')
];

export default function Settings({ navigation }) {
    const [username, setUsername] = useState('');

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

    const [email, setEmail] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [phone, setPhone] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const validateEmail = (email) => {
        const regex = /@(mail\.ru|gmail\.com)$/;
        return regex.test(email);
    };

    const isEmailValid = validateEmail(email);

    const handlePhoneChange = (text) => {
        const cleanedText = text.replace(/[^0-9+]/g, '');
        setPhone(cleanedText);
        setIsPhoneValid(validatePhone(cleanedText));
    };


    const validatePhone = (phone) => {
        const phoneRegex = /^\d{12}$/;
        return phoneRegex.test(phone);
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
        <View style={[gStyle.page, { justifyContent: 'flex-start' }]}>
            <Title text='Параметры' />
            <View style={{ marginTop: 138, alignItems: 'center' }}>
                <TouchableOpacity onLongPress={selectRandomAvatar}>
                    <View style={[gStyle.Shadow, styles.avatarContainer]}>
                        {randomAvatar && (
                            <ImageBackground
                                source={randomAvatar}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        )}
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 23 }}>
                    <View style={{
                        borderRadius: 6,
                        height: 30,
                        paddingHorizontal: 10,
                        backgroundColor: isDarkMode() ? '#FFCA1D' : '#66CDAA',
                    }}>
                        <Text style={[gStyle.specText, { color: isDarkMode() ? '#6757CB' : 'white', fontFamily: 'mt-bold', marginLeft: 10, marginRight: 10 }]}>{username}</Text>
                    </View>
                </View>
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'column',
                left: -60,
                marginTop: 30
            }}>
                <Text style={[gStyle.title, { fontSize: 20, textAlign: 'left', marginBottom: 5 }]}>Имя</Text>
                <Text style={[gStyle.text, { fontSize: 18, textAlign: 'left', marginBottom: 15 }]}>
                    {username}
                </Text>
                <Text style={[gStyle.title, { fontSize: 20, textAlign: 'left', marginBottom: 5 }]}>Почта</Text>
                <TextInput
                    style={[styles.textInput, !isEmailValid && styles.invalidTextInput]}
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder="Введите почту"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={[gStyle.title, { fontSize: 20, textAlign: 'left', marginBottom: 5 }]}>Номер телефона</Text>
                <TextInput
                    style={[styles.textInput, !isPhoneValid && styles.invalidTextInput]}
                    value={phone}
                    onChangeText={handlePhoneChange}
                    placeholder="Введите номер телефона"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        marginBottom: 15,
        backgroundColor: '#E6E6FA',
        height: 40,
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    invalidTextInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
    avatarContainer: {
        width: 243,
        height: 243,
        borderRadius: 110,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    avatarImage: {
        flex: 1,
    },
});
