import React from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { gStyle, isDarkMode } from "../styles/style";
import { GameTile, Title } from "../styles/CONST";

export default function Main({ navigation }) {
  return (
    <View style={gStyle.page}>
      <StatusBar color={isDarkMode() ? "white" : "black"} />
      <Title text='Главная страница'/>
        <View style={{flexDirection: "row"}}>
          <GameTile  
            source={require("../assets/5naski.png")}   
            onPress={() => {navigation.navigate("PuzzleGame")}}
          />
          <GameTile  
            source={require("../assets/pairs.png")}   
            onPress={() => {navigation.navigate("PairsGame")}}
          />
        </View>
        <View style={{flexDirection: "row"}}>
          <GameTile  
            source={require("../assets/XO.png")}   
            onPress={() => {navigation.navigate("XO")}}  
          />
          <GameTile  
            source={require("../assets/find.png")}   
            onPress={() => {navigation.navigate("HangmanGame")}}  
          />
        </View> 
      <TouchableOpacity onPress={() => {navigation.navigate('progress')}}>
        <Text style={gStyle.specText}>Начать</Text>
      </TouchableOpacity>
    </View>
  );
}