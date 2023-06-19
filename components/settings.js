import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, Modal, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
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

    const edit = () => {
        <View><Feather name='edit' size={14} color={isDarkMode() ? 'white' : 'black'} /></View>
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectAvatar = (avatar) => {
        setSelectedAvatar(avatar);
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <Pressable onPress={() => handleSelectAvatar(item)} style={styles.avatarContainer}>
            <Image source={item} style={styles.avatarImage} />
        </Pressable>
    );

    return (
        <View style={[gStyle.page, { justifyContent: 'flex-start' }]}>
            <Title text='Параметры' />
            <View style={{ marginTop: 138, alignItems: 'center' }}>

                <TouchableOpacity onLongPress={handleOpenModal}>
                    <View style={gStyle.Shadow}>
                        <Image source={selectedAvatar} style={styles.avatarImage} />
                    </View>
                </TouchableOpacity>

                <View style={{ marginTop: 23 }}>
                    <View style={{
                        borderRadius: 6,
                        height: 26,
                        paddingHorizontal: 10,
                        backgroundColor: isDarkMode() ? '#FFCA1D' : '#66CDAA',
                    }}>
                        <Text style={[gStyle.specText, { color: isDarkMode() ? '#6757CB' : 'white', fontFamily: 'mt-bold', marginLeft: 10, marginRight: 10 }]}>{username}</Text>
                    </View>
                </View>
            </View>
            <View>

                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Text style={gStyle.text}>Имя</Text>
                    <TextInput><Text style={gStyle.text}>{username}</Text></TextInput><Feather name='edit' size={14} color={isDarkMode() ? 'white' : 'black'} />
                </View>

            </View>

            <Modal visible={modalVisible} animationType="slide" onRequestClose={handleCloseModal}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={avatars}
                        renderItem={renderItem}
                        keyExtractor={(_, index) => index.toString()}
                        numColumns={3}
                    />
                </View>
            </Modal>
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
