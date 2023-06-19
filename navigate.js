import React from "react";
import Welcome from "./components/start/welcome";
import Auth from "./components/start/auth";
import Main from "./components/main";
import PuzzleGame from "./games/5nashki";
import PairsGame from "./games/pairs";
import HangmanGame from "./games/HangmanGame";
import XO from './games/XO';
import Progress from "./components/progress";
import Settings from "./components/settings";

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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PuzzleGame"
          component={PuzzleGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PairsGame"
          component={PairsGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HangmanGame"
          component={HangmanGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="XO"
          component={XO}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="progress"
          component={Progress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}