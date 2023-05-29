import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { gStyle } from "../styles/style";
import { Ionicons } from "react-native-vector-icons";
import { isDarkMode } from "../styles/style";
import words from "./words.json";

const HangmanGame = ({ navigation }) => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  const loadScene = () => {
    navigation.navigate("Main");
  };

  const handleStartGame = () => {
    const randomIndex = Math.floor(Math.random() * words.word.length);
    const selectedWord = words.word[randomIndex];
    setWord(selectedWord.toLowerCase()); // Приводим выбранное слово к нижнему регистру
    setGuessedLetters([]);
    setMistakes(0);
  };

  const handleGuessLetter = (letter) => {
    const updatedGuessedLetters = [...guessedLetters, letter.toLowerCase()]; // Приводим угаданную букву к нижнему регистру
    setGuessedLetters(updatedGuessedLetters);

    if (!word.includes(letter.toLowerCase())) {
      setMistakes(mistakes + 1);
    }
  };

  const renderWord = () => {
    let displayedWord = "";

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      if (guessedLetters.includes(letter.toLowerCase())) {
        displayedWord += letter + " ";
      } else {
        displayedWord += "_ ";
      }
    }

    return displayedWord.trim();
  };

  const renderHangmanImage = () => {
    const hangmanStages = ["😊", "🤔", "😕", "😟", "😨", "😖", "😵"];

    return <Text>{hangmanStages[mistakes]}</Text>;
  };

  return (
    <View style={[styles.container, gStyle.page]}>
      <TouchableOpacity style={{ position: "absolute", top: 80, left: 45 }} onPress={loadScene}>
        <Ionicons name="arrow-back" size={30} color={isDarkMode() ? "white" : "black"} />
      </TouchableOpacity>
      <Text style={[gStyle.title, { position: "absolute", top: 80 }]}>Найди пару</Text>
      {word ? (
        <View>
          <Text style={styles.word}>{renderWord()}</Text>
          {mistakes < 10 ? (
            <View>
              <TextInput onChangeText={(letter) => handleGuessLetter(letter)} maxLength={1} style={styles.input} />
              <Text>Mistakes: {mistakes}</Text>
              {renderHangmanImage()}
            </View>
          ) : (
            <View>
              <Text style={styles.message}>You lost!</Text>
              <Button title="New Game" onPress={handleStartGame} />
            </View>
          )}
        </View>
      ) : (
        <Button title="Start Game" onPress={handleStartGame} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  word: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
    width: 50,
    textAlign: "center",
  },
  message: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default HangmanGame;
