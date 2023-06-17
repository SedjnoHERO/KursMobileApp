import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gStyle, isDarkMode } from "../../styles/style";

const Auth = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const isButtonDisabled = username === "" || password === ""

  const handleUsernameChange = (text) => {
    const regex = /^[a-zA-Zа-яА-Я]*$/;
    if (regex.test(text)) {
      setUsername(text);
    }
  };

  const checkExistingUser = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("UserName");
      const storedPassword = await AsyncStorage.getItem("Password");
      if (storedUsername && storedPassword) {
        setExistingUser(true);
      } else {
        setExistingUser(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    if (username.length === 0 || password.length < 1) {
      Alert.alert("Внимание!", "Пожалуйста введите ваши данные.");
      return;
    }

    try {
      if (existingUser) {
        const storedUsername = await AsyncStorage.getItem("UserName");
        const storedPassword = await AsyncStorage.getItem("Password");
        if (username === storedUsername && password === storedPassword) {
          // Пользователь существует, переход на экран "Main"
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        } else {
          Alert.alert("Ошибка!", "Неверный логин или пароль.");
        }
      } else {
        // Создаем нового пользователя
        await AsyncStorage.setItem("UserName", username);
        await AsyncStorage.setItem("Password", password);
        // Инициализируем прогресс для нового пользователя
        await AsyncStorage.setItem("Progress", JSON.stringify(0));

        // Обновляем значения storedUsername и storedPassword
        const storedUsername = username;
        const storedPassword = password;
        console.log("Stored username:", storedUsername);
        console.log("Stored password:", storedPassword);

        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[gStyle.page, { justifyContent: "center", alignItems: "center" }]}>
      <Text style={{ color: isDarkMode() ? "white" : "black", fontFamily: "mt-light", fontSize: 24, marginBottom: 20, fontWeight: "500" }}>
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
        maxLength={16}
        onChangeText={(text) => setPassword(text)}
        color={isDarkMode() ? "white" : "black"}
      />
      <View disabled={isButtonDisabled}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={[styles.button, isButtonDisabled]}>
            <Text style={[gStyle.funcText, isButtonDisabled && styles.disabledButtonText]}>Авторизоваться</Text>
          </View>
        </TouchableOpacity>
      </View>
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
});

export default Auth;
