import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MainStack from './navigate';

const fonts = () => Font.loadAsync({
  'mt-bold': require('./assets/fonts/Oswald-VariableFont_wght.ttf'),
  'mt-light': require('./assets/fonts/Montserrat-VariableFont_wght.ttf')
});
//npm start

export default function App() {
  const [font, setFont] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await fonts();
      setFont(true);
      await SplashScreen.preventAutoHideAsync(); // добавлено
    }
    loadFonts();
  }, []);

  if(font){
    return (
      <MainStack />
    );
  } else {
    return null;
  }
}

 
const styles = StyleSheet.create({

}); 
