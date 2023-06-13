import React from "react";
import Welcome from "./components/start/welcome";
import auth from "./components/start/auth";
import Main from "./components/main";
import PuzzleGame from "./games/5nashki";
import PairsGame from "./games/pairs";
import HangmanGame from "./games/HangmanGame";
import XO from './games/XO';
import Progress from "./components/progress";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth"
          component={auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "Главная",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PuzzleGame"
          component={PuzzleGame}
          options={{
            title: "Пятнашки",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PairsGame"
          component={PairsGame}
          options={{
            title: "Найди пару",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HangmanGame"
          component={HangmanGame}
          options={{
            title: "HangmanGame",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="XO"
          component={XO}
          options={{
            title: "XO",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="progress"
          component={Progress}
          options={{
            title: "progress",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}