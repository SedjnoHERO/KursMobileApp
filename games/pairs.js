import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { gStyle, isDarkMode } from "../styles/style";
import { Title, BackArrow, increaseProgress, StartButton, CustomAlert, gamesStat } from "../styles/CONST";

const pairs = ["👺", "🍕", "🐼", "🐒", "🐙", "🍔", "🐳", "❤️"];

const PairsGame = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isShowingCards, setIsShowingCards] = useState(true);
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const allCards = [...pairs, ...pairs];
    const shuffledCards = shuffle(allCards);
    setCards(
      shuffledCards.map((card) => ({
        value: card,
        isFlipped: false,
      }))
    );
    setSelectedCards([]);
    setMatchedCards([]);

    setIsShowingCards(true);
    setTimeout(() => {
      setIsShowingCards(false);
    }, 1000);
  };

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleCardPress = (index) => {
    if (matchedCards.includes(index)) {
      return;
    }

    let newSelectedCards = [...selectedCards];

    if (newSelectedCards.length === 2) {
      return;
    }

    if (newSelectedCards.length === 1 && newSelectedCards[0] === index) {
      return;
    }

    newSelectedCards.push(index);
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const firstCardIndex = newSelectedCards[0];
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[index];

      if (firstCard.value === secondCard.value) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, firstCardIndex, index]);
        setSelectedCards([]);

        if (matchedCards.length === pairs.length * 2 - 2) {
          setShowAlert(true);
          increaseProgress(1);
          gamesStat('Найди пару');
        }
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 500);
      }
    }
  };

  const isCardSelected = (index) => {
    return selectedCards.includes(index);
  };

  const isCardMatched = (index) => {
    return matchedCards.includes(index);
  };

  const isCardFlipped = (index) => {
    return isCardSelected(index) || isCardMatched(index);
  };

  return (
    <View style={[gStyle.page]}>
      <BackArrow navigation={navigation} />
      <Title text="Найди пару" />
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              isCardFlipped(index) && styles.flippedCard,
              isCardMatched(index) && styles.matchedCard,
            ]}
            onPress={() => handleCardPress(index)}
            disabled={isCardMatched(index)}
          >
            <Text style={[styles.cardText, isCardFlipped(index) && styles.visibleCardText]}>
              {isCardFlipped(index) ? card.value : isShowingCards ? card.value : " "}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showAlert && (
        <CustomAlert
          text={`Поздравляем\nВы выиграли!`}
          onClose={() => setShowAlert(false)}
        />
      )}
      <StartButton onPress={initializeGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  card: {
    width: 90,
    height: 90,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: isDarkMode() ? "white" : "black",
  },
  flippedCard: {
    backgroundColor: isDarkMode() ? "e0e0e0" : "#efefef",
  },
  matchedCard: {
    borderColor: isDarkMode() ? "#FFCA1D" : "#66CDAA",
    borderWidth: 3,
  },
  cardText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  visibleCardText: {
    opacity: 1,
  },
});

export default PairsGame;