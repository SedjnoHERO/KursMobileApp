import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { gStyle } from "../styles/style";
import { Ionicons } from "react-native-vector-icons";
import { isDarkMode } from "../styles/style";

const pairs = ["👺", "🍕", "🐼", "🐒", "🐙", "🍔", "🐳", "❤️"];

const PairsGame = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isShowingCards, setIsShowingCards] = useState(true);

  const loadScene = () => {
    navigation.navigate("Main");
  };

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
          Alert.alert("Поздравляем!", "Вы завершили игру!");
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
    <View style={[styles.container, gStyle.page]}>
      <TouchableOpacity style={{ position: "absolute", top: 80, left: 45 }} onPress={loadScene}>
        <Ionicons name="arrow-back" size={30} color={isDarkMode() ? "white" : "black"} />
      </TouchableOpacity>
      <Text style={[gStyle.title, { position: "absolute", top: 80 }]}>Найди пару</Text>
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
      <TouchableOpacity onPress={initializeGame}>
        <Text style={[gStyle.funcText, { fontSize: 22 }]}>Новая игра</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
    borderWidth: 3,
    borderColor: isDarkMode() ? "#FFCA1D" : "#66CDAA",
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
