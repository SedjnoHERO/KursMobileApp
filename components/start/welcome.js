import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { gStyle } from "../../styles/style";

export default function Welcome({ navigation }) {
  const loadScene = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'auth' }],
    });
  };
  //Интеллектус
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
