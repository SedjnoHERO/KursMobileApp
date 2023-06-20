import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { gStyle } from '../styles/style';
import { Title, BackArrow, increaseProgress, StartButton, CustomAlert, gamesStat } from '../styles/CONST';
import wordsData from './words.json';

const HangmanGame = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const categories = Object.keys(wordsData);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setCategory(randomCategory);

    const categoryWords = wordsData[randomCategory];
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    setWord(randomWord.toLowerCase());

    const initialDisplayWord = randomWord.replace(/\S/g, '_ ');
    setDisplayWord(initialDisplayWord);

    setAttempts(6);
    setIsGameStarted(true);
  };

  const handleLetterPress = (letter) => {
    const updatedDisplayWord = displayWord
      .split(' ')
      .map((char, index) => {
        if (word[index] === letter) {
          return letter;
        }
        return char;
      })
      .join(' ');

    if (updatedDisplayWord === displayWord) {
      setAttempts(attempts - 1);
      if (attempts === 1) {
        setShowAlert(true);
      }
    } else {
      setDisplayWord(updatedDisplayWord);
      if (updatedDisplayWord.replace(/ /g, '') === word) {
        setShowAlert(true);
        increaseProgress(2);
        gamesStat('Hangman');
      }
    }
  };

  return (
    <View style={gStyle.page}>
      <BackArrow navigation={navigation} />
      <Title text="Угадай слово" />
      <Text style={[gStyle.specText, { marginBottom: 10 }]}>Категория: {category}</Text>
      <Text style={[gStyle.specText, { marginBottom: 10 }]}>Слово: {displayWord}</Text>
      <Text style={[gStyle.specText, { marginBottom: 10 }]}>Попытки: {attempts}</Text>
      {isGameStarted && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '90%',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          {Array.from(Array(32), (_, index) => String.fromCharCode(1072 + index)).map((letter) => (
            <TouchableOpacity
              key={letter}
              onPress={() => handleLetterPress(letter)}
              style={{
                padding: 4,
                backgroundColor: 'lightgray',
                margin: 7,
                flexGrow: 0,
                flexBasis: '10%',
                borderRadius: 3,
                color: 'black',
              }}
              disabled={!word || displayWord === word || attempts === 0}
            >
              <Text style={[gStyle.specText, { fontSize: 30, color: 'black' }]}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <StartButton onPress={startGame} />
      {showAlert && (
        <CustomAlert
          text={attempts === 0 ? `Вы проиграли \n Загаданное слово: ${word}` : 'Поздравляем!\nВы завершили игру!'}
          onClose={() => setShowAlert(false)}
        />
      )}

    </View>
  );
};

export default HangmanGame;
