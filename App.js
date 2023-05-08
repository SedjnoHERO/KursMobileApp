import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainStack from './navigate';

const fonts = () => Font.loadAsync({
  'mt-bold': require('./assets/fonts/Oswald-VariableFont_wght.ttf'),
  'mt-light': require('./assets/fonts/Montserrat-VariableFont_wght.ttf')
});
//npm start
export default function App() {

  const [font, setFont] = useState(false);

  if(font){
    return (
      <MainStack />
    );
  } else {
    return (
      <AppLoading startAsync={fonts} 
      onFinish={() => setFont(true)} 
      onError={() => console.warn}
      />
    );
  }

}
 
const styles = StyleSheet.create({

}); 
