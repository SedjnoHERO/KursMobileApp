import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, TextInput, Modal, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { gStyle, isDarkMode } from '../styles/style';
import { Title } from '../styles/CONST';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatars = [
    require('../assets/avatars/dog.png'),
    require('../assets/avatars/fox.png'),
    require('../assets/avatars/jiraf.png'),
    require('../assets/avatars/monkey.png'),
    require('../assets/avatars/owl.png'),
];

export default function Settings({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');

    useEffect(() => {
        getStoredUserData();
        selectRandomAvatar();
    }, []);

    const EditModal = ({ modalVisible, fieldToEdit, isEmailValid, username, email, phone, setUsername, setEmail, setPhone, handleConfirm }) => {
        return (
            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        {fieldToEdit === 'username' && 'Изменение имени'}
                        {fieldToEdit === 'email' && 'Изменение почты'}
                        {fieldToEdit === 'phone' && 'Изменение номера телефона'}
                    </Text>
                    <TextInput style={[styles.textInput, fieldToEdit === 'email' && !isEmailValid && styles.invalidTextInput,]}
                        value={
                            fieldToEdit === 'username'
                                ? username
                                : fieldToEdit === 'email'
                                    ? email
                                    : phone
                        }
                        onChangeText={(text) => {
                            if (fieldToEdit === 'username') setUsername(text);
                            else if (fieldToEdit === 'email') setEmail(text);
                            else if (fieldToEdit === 'phone') setPhone(text);
                        }}
                    />
                    <TouchableOpacity onPress={handleConfirm} style={styles.button}>
                        <Text style={styles.buttonText}>Подтвердить</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    };

    const getStoredUserData = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('UserName');
            const storedEmail = await AsyncStorage.getItem('UserEmail');
            const storedPhone = await AsyncStorage.getItem('UserPhone');
            setUsername(storedUsername);
            setEmail(storedEmail);
            setPhone(storedPhone);
        } catch (error) {
            console.log(error);
        }
    };

    const saveUserData = async () => {
        try {
            await AsyncStorage.multiSet([
                ['UserName', username],
                ['UserEmail', email],
                ['UserPhone', phone]
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleConfirm = () => {
        Promise.all([saveUserData(), setModalVisible(false)]);
    };

    const handleEdit = (field) => {
        setFieldToEdit(field);
        setModalVisible(true);
    };

    const [randomAvatar, setRandomAvatar] = useState(null);

    const selectRandomAvatar = () => {
        const randomAvatarIndex = Math.floor(Math.random() * avatars.length);
        const selectedAvatar = avatars[randomAvatarIndex];
        setRandomAvatar(selectedAvatar);
    };

    return (
        <View style={[gStyle.page, { justifyContent: 'flex-start' }]}>
            <Title text="Параметры" />
            <View style={{ marginTop: 138, alignItems: 'center' }}>
                <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 16, }} >
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
                    <View style={{ borderRadius: 6, height: 30, paddingHorizontal: 10, backgroundColor: isDarkMode() ? '#FFCA1D' : '#66CDAA', }}>
                        <Text style={[gStyle.specText, { color: isDarkMode() ? '#6757CB' : 'white', fontFamily: 'mt-bold', marginLeft: 10, marginRight: 10, },]}>{username}</Text>
                    </View>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', marginTop: 30, width: '70%', }}>
                <Text style={[gStyle.title, { fontSize: 20, textAlign: 'left', marginBottom: 5 }]}>Имя</Text>
                <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => handleEdit('username')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[gStyle.funcText, { fontSize: 18, textAlign: 'left', width: 'auto' }]} >{username}</Text>
                        <Feather name="edit" size={14} style={{ marginLeft: 6, color: 'rgba(0,0,0,.7)' }} />
                    </View>
                </TouchableOpacity>
                <Text style={[gStyle.title, { fontSize: 20, textAlign: 'left', marginBottom: 5 }]}>Почта</Text>
                <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => handleEdit('email')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[gStyle.funcText, { fontSize: 18, color: isDarkMode() ? 'rgba(255, 202, 29, 0.7)' : 'rgba(102, 205, 170, 0.7)', },]}>
                            {email ? email : 'Введите адрес почты'}
                        </Text>
                        <Feather name="edit" size={14} style={{ marginLeft: 6, color: 'rgba(0,0,0,.7)' }} />
                    </View>
                </TouchableOpacity>
                <Text style={[gStyle.title, { fontSize: 20, textAlign: 'left', marginBottom: 5 }]}>Номер телефона</Text>
                <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => handleEdit('phone')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[gStyle.funcText, { fontSize: 18, color: isDarkMode() ? 'rgba(255, 202, 29, 0.7)' : 'rgba(102, 205, 170, 0.7)', },]}>
                            {phone ? phone : 'Введите номер телефона'}
                        </Text>
                        <Feather name="edit" size={14} style={{ marginLeft: 6, color: 'rgba(0,0,0,.7)' }} />
                    </View>
                </TouchableOpacity>
            </View>
            <EditModal style={{ justifyContent: 'center', alignItems: 'center' }}
                modalVisible={modalVisible}
                fieldToEdit={fieldToEdit}
                isEmailValid={isEmailValid}
                username={username}
                email={email}
                phone={phone}
                setUsername={setUsername}
                setEmail={setEmail}
                setPhone={setPhone}
                handleConfirm={handleConfirm}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: isDarkMode() ? '#483D8B' : 'white',
        borderRadius: 20,
        padding: 35,
        width: '60%',
        alignSelf: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: isDarkMode() ? 'white' : 'black',
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
    button: {
        backgroundColor: '#6757CB',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
    },
    avatarContainer: {
        width: 243,
        height: 243,
        borderRadius: 110,
        overflow: 'hidden',
    },
    avatarImage: {
        flex: 1,
    }
});
