import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { gStyle, isDarkMode } from "../../styles/style";

export default function Welcome({ navigation }) {
  const loadScene = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "auth" }],
    });
  };

  return (
    <View style={[styles.container, gStyle.page]}>
      <View style={styles.logoback}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
      <Text style={gStyle.title}>Добро пожаловать!</Text>
      <Text style={[styles.text, gStyle.text]}>
        Мы рады видеть вас в приложении "Тренажёр для развития памяти и когнитивных функций"
      </Text>
      <View>
        <TouchableOpacity onPress={() => loadScene()}>
          <View>
            <Text style={gStyle.funcText}>Начать</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.under}>Типикин Ярослав ПО-22</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  under: {
    position: "absolute",
    fontFamily: "mt-light",
    bottom: 0,
    fontSize: 18,
    marginBottom: Platform.OS === "ios" ? 46 : 15,
    color: isDarkMode() ? "white" : "black",
  },
  logo: {
    width: 161,
    height: 162,
  },
  logoback: {
    marginTop: -70,
    marginBottom: 38,
    borderRadius: 100,
    backgroundColor: "#D3D3D3",
    padding: 15,
  },
  text: {
    marginTop: 19,
    marginBottom: 31,
  },
});
