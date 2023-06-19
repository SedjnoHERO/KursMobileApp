import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
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

    const [randomAvatar, setRandomAvatar] = useState(null);

    const [email, setEmail] = useState('');
    const handleEmailChange = (text) => {
        setEmail(text);
    };

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

                <TouchableOpacity>
                    <View style={gStyle.Shadow}>
                        {randomAvatar && <Image source={randomAvatar} style={styles.avatarImage} />}
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
                    style={{ marginBottom: 15, backgroundColor: '#E6E6FA', height: 40 }}
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder="Введите почту"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={[gStyle.title, { fontSize: 20, textAlign: 'left', marginBottom: 5 }]}>Номер телефона</Text>
                <Text style={[gStyle.text, { fontSize: 16, textAlign: 'left', marginBottom: 15 }]}>
                    {`{имя}`}
                </Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    badgeShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        padding: 10
    },
    avatarImage: {
        width: 233,
        height: 233,
        borderRadius: 110,
    }
});
