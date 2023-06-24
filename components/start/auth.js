import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gStyle, isDarkMode } from "../../styles/style";

const Auth = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isButtonDisabled = username === "" || password === "";
  const [error, setError] = useState("");

  const handleUsernameChange = (text) => {
    const regex = /^[a-zA-Zа-яА-Я\s]*$/;
    if (regex.test(text)) {
      setUsername(text);
    }
  };

  const handleLogin = async () => {
    try {
      if (username.length === 0 || password.length === 0) {
        setError("Пожалуйста, введите ваше имя и пароль.");
        return;
      }
      await AsyncStorage.setItem("UserName", username);
      await AsyncStorage.setItem("Password", password);
      await AsyncStorage.removeItem("UserEmail");
      await AsyncStorage.removeItem("UserPhone");
      await AsyncStorage.setItem("Progress", JSON.stringify(0));
      navigation.replace("Main");
    } catch (error) {
      console.log(error);
      setError("Произошла ошибка при авторизации.");
    }
  };


  return (
    <View style={gStyle.page}>
      <Text style={[gStyle.specText, { fontFamily: 'mt-light', marginBottom: 20 }]}>Авторизация</Text>
      <TextInput
        style={[styles.input, styles.placeholder, { marginBottom: 28 }]}
        placeholder="Введите имя"
        value={username}
        maxLength={16}
        onChangeText={handleUsernameChange}
        color={isDarkMode() ? "white" : "black"}
      />
      <TextInput
        style={[styles.input, styles.placeholder, { marginBottom: 40 }]}
        placeholder="Введите пароль"
        value={password}
        maxLength={16}
        onChangeText={(text) => setPassword(text)}
        color={isDarkMode() ? "white" : "black"}
      />
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={handleLogin} disabled={isButtonDisabled}>
        <View style={[styles.button, isButtonDisabled]}>
          <Text style={[gStyle.funcText, { fontSize: 20 }, isButtonDisabled && styles.disabledButtonText]}>
            Войти
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  disabledButtonText: {
    color: isDarkMode() ? "rgba(255, 202, 29, 0.3)" : "rgba(102, 205, 170, 0.3)",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});

export default Auth;
