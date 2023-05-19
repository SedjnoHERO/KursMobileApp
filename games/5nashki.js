import { getStateFromPath } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const PuzzleGame = () => {
  const [board, setBoard] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null],
  ]);

  const [moves, setMoves] = useState(0);

  useEffect(() => {
    checkGameCompletion();
  }, [board]);

  const handlePress = (row, col) => {
    const newBoard = [...board];
    if (isValidMove(row, col)) {
      const emptyCell = findEmptyCell();
      const temp = newBoard[row][col];
      newBoard[row][col] = null;
      newBoard[emptyCell.row][emptyCell.col] = temp;
      setBoard(newBoard);
      setMoves(moves + 1);
    }
  };

  const isValidMove = (row, col) => {
    const emptyCell = findEmptyCell();
    if (
      (row === emptyCell.row && Math.abs(col - emptyCell.col) === 1) ||
      (col === emptyCell.col && Math.abs(row - emptyCell.row) === 1)
    ) {
      return true;
    }
    return false;
  };

  const findEmptyCell = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === null) {
          return { row: i, col: j };
        }
      }
    }
  };

  const checkGameCompletion = () => {
    const flatBoard = board.flat();
    const isCompleted = flatBoard.every((cell, index) => (cell === null ? index === 15 : cell === index + 1));

    if (isCompleted) {
      Alert.alert("Поздравляем!", "Вы завершили игру!");
      setMoves(0);
    }
  };

  const shuffleBoard = () => {
    const newBoard = [...board];
    for (let i = newBoard.length - 1; i > 0; i--) {
      for (let j = newBoard[i].length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (i + 1));
        const l = Math.floor(Math.random() * (j + 1));
        const temp = newBoard[i][j];
        newBoard[i][j] = newBoard[k][l];
        newBoard[k][l] = temp;
      }
    }
    setBoard(newBoard);
    setMoves(0);
  };

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity key={colIndex} style={styles.cell} onPress={() => handlePress(rowIndex, colIndex)}>
              <Text style={styles.cellText}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <Text style={styles.movesText}>Ходы {moves}</Text>
      <TouchableOpacity style={styles.button} onPress={shuffleBoard}>
        <Text style={styles.buttonText}>Начать новую игру</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movesText: {
    marginTop: 10,
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 80,
    height: 80,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PuzzleGame;
