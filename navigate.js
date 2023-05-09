import React from "react";
import Welcome from './components/welcome';
import FullInfo from './components/FullInfo';
import Main from './components/main';
import isDarkMode from "./styles/style";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={
                    {
                    headerStyle: { backgroundColor: isDarkMode ? '#2F4F4F' : 'white',  height: 0 },
                }
                }
            />
            <Stack.Screen
                name='Main'
                component={Main}
                options={
                    {
                    title: 'Главная', 
                    headerStyle: { backgroundColor: '#DCDCDC', height: 90}
                }
            }
            />
            <Stack.Screen
                name='FullInfo'
                component={FullInfo}
                options={{title: 'Статья'}}
            />
           
        </Stack.Navigator>
    </NavigationContainer>;
}