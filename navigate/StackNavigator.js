import React from "react";
import Welcome from "../components/welcome";
import FullInfo from "../components/FullInfo";
import Main from "../components/main";
import isDarkMode from "../styles/style";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerStyle: {
              backgroundColor: isDarkMode ? "#2F4F4F" : "white",
              height: 0,
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "Главная",
            headerStyle: {
              backgroundColor: isDarkMode ? "#2F4F4F" : "white",
              height: Platform.OS === "ios" ? 100 : 90,
            },
            HeaderTitle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="FullInfo"
          component={FullInfo}
          options={{ title: "Статья" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
