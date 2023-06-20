import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { gStyle, isDarkMode } from "../styles/style";
import { Title, BackArrow, increaseProgress, StartButton, CustomAlert, gamesStat } from "../styles/CONST";

const PuzzleGame = ({ navigation }) => {
  const [board, setBoard] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null],
  ]);

  const [moves, setMoves] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    checkGameCompletion();
  }, [board]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handlePress = (row, col) => {
    const newBoard = [...board];
    if (isValidMove(row, col)) {
      const emptyCell = findEmptyCell();
      const temp = newBoard[row][col];
      newBoard[row][col] = null;
      newBoard[emptyCell.row][emptyCell.col] = temp;
      setBoard(newBoard);
      setMoves(moves + 1);

      if (!isTimerRunning && moves === 0) {
        setIsTimerRunning(true);
      }
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

    if (isCompleted && moves > 0) {
      setShowAlert(true);
      increaseProgress(7);
      gamesStat('Puzzle');
      setIsTimerRunning(false);
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
    setTimer(0);
    setIsTimerRunning(false);
  };

  return (
    <View style={gStyle.page}>
      <BackArrow navigation={navigation} />
      <Title text="Пятнашки" />
      <View style={styles.uppertext}>
        <Text style={gStyle.text}>Ходы: {moves}</Text>
        <Text style={gStyle.text}>Время: {timer} секунд</Text>
      </View>
      <View style={{ marginBottom: 25, marginTop: 20 }}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity key={colIndex} style={styles.cell} onPress={() => handlePress(rowIndex, colIndex)}>
                <Text style={gStyle.specText}>{cell}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      {showAlert && (
        <CustomAlert
          text={`Поздравляем\nВы выиграли!\n \nШаги: ${moves} Время: ${timer}`}
          isModalVisible={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )}
      <StartButton onPress={shuffleBoard} />
    </View>
  );
};

const styles = StyleSheet.create({
  uppertext: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    borderColor: isDarkMode() ? "white" : "black",
  },
});

export default PuzzleGame;
