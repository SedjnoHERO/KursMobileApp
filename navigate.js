import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

// Импортируйте ваши компоненты экранов
import Welcome from "./components/start/welcome";
import Auth from "./components/start/auth";
import Main from "./components/main";
import HangmanGame from "./games/HangmanGame";
import XO from './games/XO';
import PairsGame from "./games/pairs";
import PuzzleGame from "./games/5nashki";
import Progress from "./components/progress";
import Settings from "./components/settings";
import { isDarkMode } from "./styles/style";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Навигатор вкладок
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 32,
          right: 32,
          height: 66,
          backgroundColor: isDarkMode() ? '#7B68EE' : '#E6E6FA',
          borderRadius: 85,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name='Progress'
        component={Progress}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='bar-chart-outline'
              size={45}
              position='absolute'
              bottom={-20}
              color={isDarkMode() ? (focused ? '#FFCA1D' : 'white') : (focused ? '#66CDAA' : 'black')}
            />
          ),
        }} />
      <Tab.Screen
        name='Main'
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='home-outline'
              size={45}
              position='absolute'
              bottom={-20}
              color={isDarkMode() ? (focused ? '#FFCA1D' : 'white') : (focused ? '#66CDAA' : 'black')}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='settings-outline'
              size={45}
              position='absolute'
              bottom={-20}
              color={isDarkMode() ? (focused ? '#FFCA1D' : 'white') : (focused ? '#66CDAA' : 'black')}
            />
          ),
        }} />
    </Tab.Navigator>
  );
}

// Навигатор приложения
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="HangmanGame" component={HangmanGame} options={{ headerShown: false }} />
        <Stack.Screen name="XO" component={XO} options={{ headerShown: false }} />
        <Stack.Screen name="PairsGame" component={PairsGame} options={{ headerShown: false }} />
        <Stack.Screen name="PuzzleGame" component={PuzzleGame} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
