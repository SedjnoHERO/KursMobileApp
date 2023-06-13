import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainStack from "./navigate";

const fonts = () =>
  Font.loadAsync({
    "mt-bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "mt-med": require("./assets/fonts/Montserrat-Medium.ttf"),
    "mt-light": require("./assets/fonts/Montserrat-Light.ttf"),
  });

//npm start
export default function App() {
  const [font, setFont] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await fonts();
      setFont(true);
      await SplashScreen.preventAutoHideAsync();
    }
    loadFonts();
  }, []);

  if (font) {
    return <MainStack />;
  } else {
    return null;
  }
}
