import { TouchableOpacity, Modal, View, Text, Image, Pressable } from "react-native";
import { gStyle, isDarkMode } from "./style";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadScene = (navigation) => {
  navigation.navigate("Main");
};

export const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ position: "absolute", top: 80, left: 45 }} onPress={() => loadScene(navigation)}>
      <Ionicons name="arrow-back" size={30} color={isDarkMode() ? "white" : "black"} />
    </TouchableOpacity>
  );
};

export const Title = ({ text }) => {
  return (
    <Text style={[gStyle.title, { position: 'absolute', top: 80 }]}>
      {text}
    </Text>
  );
}

export const GameTile = ({ source, onPress }) => {
  return (
    <TouchableOpacity style={{ width: 159, height: 249, borderRadius: 23, margin: 11, marginBottom: 23, justifyContent: "flex-end", alignItems: "center", overflow: "hidden", }} onPress={onPress}>
      <Image source={source} style={{ width: "100%", height: "100%", zIndex: 1 }} />
    </TouchableOpacity>
  );
};
// общий прогресс
export const increaseProgress = async (value) => {
  try {
    const storedProgress = await AsyncStorage.getItem('Progress');
    let progress = 0;
    if (storedProgress) {
      progress = JSON.parse(storedProgress);
    }
    progress += value;
    await AsyncStorage.setItem('Progress', JSON.stringify(progress));
  } catch (error) {
    console.error(error);
  }
};
// количество игр
export const gamesStat = async (gameName) => {
  try {
    const storedProgress = await AsyncStorage.getItem(gameName);
    let progress = 0;
    if (storedProgress) {
      progress = JSON.parse(storedProgress);
    }
    progress += 1;
    await AsyncStorage.setItem(gameName, JSON.stringify(progress));
    console.log(`Updated played games in ${gameName}: ${progress}`);
  } catch (error) {
    console.error(error);
  }
};


export const StartButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[gStyle.funcText, { fontSize: 22 }]}>Новая игра</Text>
    </TouchableOpacity>
  );
};

export const CustomAlert = ({ text, isModalVisible, onClose }) => {
  const [modalVisible, setModalVisible] = useState(isModalVisible);

  return (
    <View style={{ position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: isDarkMode() ? '#483D8B' : 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '50%' }}>
            <Text style={{ marginBottom: 15, textAlign: 'center', fontSize: 18 }}>{text}</Text>
            <Pressable
              style={{ backgroundColor: isDarkMode() ? '#FFCA1D' : '#66CDAA', borderRadius: 20, padding: 15, elevation: 2 }}
              onPress={() => {
                setModalVisible(false);
                onClose(false);
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Спасибо!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
