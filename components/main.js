import React from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { gStyle, isDarkMode } from "../styles/style";
import { GameTile, Title } from "../styles/CONST";
import Tabs from "../TabNavigator";

export default function Main({ navigation }) {
  return (
    <View style={gStyle.page}>
      <StatusBar color={isDarkMode() ? "white" : "black"} />
      <Title text='Главная страница' />
      <View style={{ flexDirection: "row" }}>
        <GameTile
          source={require("../assets/gametiles/5naski.png")}
          onPress={() => { navigation.navigate("PuzzleGame") }}
        />
        <GameTile
          source={require("../assets/gametiles/pairs.png")}
          onPress={() => { navigation.navigate("PairsGame") }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <GameTile
          source={require("../assets/gametiles/XO.png")}
          onPress={() => { navigation.navigate("XO") }}
        />
        <GameTile
          source={require("../assets/gametiles/find.png")}
          onPress={() => { navigation.navigate("HangmanGame") }}
        />
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
        <Text style={gStyle.specText}>Начать</Text>
      </TouchableOpacity>
    </View>
  );
}