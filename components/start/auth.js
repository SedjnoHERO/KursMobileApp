import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { gStyle, isDarkMode } from "../../styles/style";

const Welcome = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z]/g, "").replace(/\s/g, "");
    setUsername(formattedText);
  };

  const handlePasswordChange = (text) => {
    const formattedText = text.replace(/[^a-zA-Z]/g, "").replace(/\s/g, "");
    setPassword(formattedText);
  };

  const handleLogin = () => {
    const userInfo = {
      username: username,
      password: password,
    };

    const jsonData = JSON.stringify(userInfo);
    console.log("Вход выполнен для пользователя:", jsonData);

    navigation.navigate("Main");
  };

  const isButtonDisabled = username === "" || password === "" || password.length < 6;

  return (
    <View style={[gStyle.page, { justifyContent: "center", alignItems: "center" }]}>
      <Text
        style={{
          color: isDarkMode() ? "white" : "black",
          fontFamily: "mt-light",
          fontSize: 24,
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        Авторизация
      </Text>
      <TextInput
        style={[styles.input, styles.placeholder, { marginBottom: 28 }]}
        placeholder="Введите имя"
        value={username}
        onChangeText={handleUsernameChange}
        color={isDarkMode() ? "white" : "black"}
      />
      <TextInput
        style={[styles.input, styles.placeholder, { marginBottom: 40 }]}
        placeholder="Введите пароль"
        value={password}
        onChangeText={handlePasswordChange}
        maxLength={16}
        color={isDarkMode() ? "white" : "black"}
      />
      <TouchableOpacity onPress={handleLogin} disabled={isButtonDisabled}>
        <View style={[styles.button, isButtonDisabled && styles.disabledButton]}>
          <Text style={[gStyle.funcText, isButtonDisabled && styles.disabledButton]}>Авторизоваться</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.under}>Типикин Ярослав ПО-22</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  under: {
    position: "absolute",
    fontFamily: "mt-light",
    bottom: 0,
    fontSize: 18,
    marginBottom: Platform.OS === "ios" ? 46 : 15,
    color: isDarkMode() ? "white" : "black",
  },
  placeholder: {
    fontFamily: "mt-light",
    fontSize: 24,
    lineHeight: 29,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.3)",
  },
  input: {
    width: "78%",
    height: 45,
    backgroundColor: "rgba(217, 217, 217, 0.36)",
    borderRadius: 8,
    marginBottom: 20,
  },
  disabledButton: {
    color: isDarkMode() ? "rgba(255, 202, 29, 0.3)" : "rgba(102, 205, 170, 0.3)",
  },
});

export default Welcome;
