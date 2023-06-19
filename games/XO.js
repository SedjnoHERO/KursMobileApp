import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { isDarkMode, gStyle } from '../styles/style';
import { Title, BackArrow, increaseProgress, StartButton, CustomAlert } from '../styles/CONST';

const XO = ({ navigation }) => {
  const initialBoard = Array(9).fill('');
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    checkWinner();
    if (currentPlayer === 'O' && currentPlayer !== 'X' && !winner) {
      makeBotMove();
    }
  }, [board, currentPlayer]);

  useEffect(() => {
    if (winner === 'X') {
      setShowAlert(true);
      increaseProgress(1);
    } else if (winner === 'O') {
      Alert.alert('Вы проиграли!', 'Выиграл бот');
    }
  }, [winner]);

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!winner && !board.includes('')) {
      setWinner('Draw');
    }
  };

  const makeMove = (index) => {
    if (board[index] === '' && !winner) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const makeBotMove = () => {
    const availableMoves = board.reduce((acc, cell, index) => {
      if (cell === '') {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    makeMove(availableMoves[randomIndex]);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner('');
  };

  return (
    <View style={gStyle.page}>
      <BackArrow navigation={navigation} />
      <Title text="Крестики-нолики" />
      <View style={[styles.board, { marginBottom: 25, marginTop: 25 }]}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => makeMove(index)} >
            <Text style={[gStyle.specText, { fontSize: 45 }]}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <StartButton onPress={resetGame} />
      </View>
      {showAlert && (
        <CustomAlert
          text={`Поздравляем\nВы выиграли!`}
          isModalVisible={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginBottom: 20,
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: isDarkMode() ? 'white' : 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default XO;
