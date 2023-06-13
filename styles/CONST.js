import { TouchableOpacity, Text, Image } from "react-native";
import { gStyle, isDarkMode } from "./style";
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadScene = (navigation) => {
    navigation.navigate("Main");
};
  
export const BackArrow = ({navigation}) => {
    return (
      <TouchableOpacity style={{ position: "absolute", top: 80, left: 45 }} onPress={() => loadScene(navigation)}>
        <Ionicons name="arrow-back" size={30} color={isDarkMode() ? "white" : "black"}/>  
      </TouchableOpacity>  
    );
};

export const Title = ({text}) => {
  return (
    <Text style={[gStyle.title, { position: 'absolute', top: 80 }]}>
      {text}
    </Text>  
  );
}

export const GameTile = ({source, onPress}) => {
    return (  
      <TouchableOpacity style={{width: 159, height: 249, borderRadius: 23, margin: 11, marginBottom: 23, justifyContent: "flex-end", alignItems: "center", overflow: "hidden",}} onPress={onPress}>
        <Image source={source} style={{ width: "100%", height: "100%", zIndex: 1 }} />
      </TouchableOpacity>  
    ); 
};

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

export const StartButton = ({onPress}) => {
  return (  
    <TouchableOpacity onPress={onPress}>
    <Text style={[gStyle.funcText, { fontSize: 22 }]}>Новая игра</Text>
  </TouchableOpacity>
  ); 
};
