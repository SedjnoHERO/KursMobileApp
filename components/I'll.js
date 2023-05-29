import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import wordsData from "./words.json";

const SearchWordGame = () => {
  const [grid, setGrid] = useState([]); // Сетка букв
  const [selectedWords, setSelectedWords] = useState([]); // Выбранные слова
  const [score, setScore] = useState(0); // Очки

  // Функция для генерации случайной буквы
  const getRandomLetter = () => {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

  // Функция для генерации сетки из случайных букв
  const generateGrid = () => {
    const gridSize = 4; // Размер сетки
    const newGrid = [];

    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(getRandomLetter());
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  // Функция для обработки выбора слова
  const selectWord = (word) => {
    if (selectedWords.includes(word)) {
      return; // Слово уже выбрано
    }

    setSelectedWords([...selectedWords, word]); // Добавить слово в выбранные
    setScore(score + word.length); // Увеличить очки
  };

  // Функция для проверки вводимого слова
  const checkWord = (word) => {
    const flattenedGrid = grid.flat().join(""); // Преобразовать сетку в строку

    if (flattenedGrid.includes(word)) {
      selectWord(word); // Слово найдено, выбрать его
    }
  };

  // Генерировать сетку и начать игру при монтировании компонента
  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {/* Отобразить сетку букв */}
        {grid.map((row, rowIndex) => (
          <View key={rowIndex}>
            {row.map((letter, colIndex) => (
              <Text key={`${rowIndex}-${colIndex}`}>{letter}</Text>
            ))}
          </View>
        ))}
      </View>
      <View>
        {/* Отобразить выбранные слова */}
        {selectedWords.map((word) => (
          <Text key={word}>{word}</Text>
        ))}
      </View>
      <View>
        <Text>Счет: {score}</Text>
      </View>
      <View>
        {/* Кнопка для проверки вводимого слова */}
        <TouchableOpacity onPress={() => checkWord("ваше_слово")}>
          <Text>Проверить слово</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchWordGame;
