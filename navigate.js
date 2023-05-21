import React from "react";
import Welcome from "./components/start/welcome";
import auth from "./components/start/auth";
import FullInfo from "./components/FullInfo";
import Main from "./components/main";
import PuzzleGame from "./games/5nashki";

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
        <Stack.Screen name="FullInfo" component={FullInfo} options={{ title: "Статья" }} />
        <Stack.Screen
          name="PuzzleGame"
          component={PuzzleGame}
          options={{
            title: "Пятнашки",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
