import React, { useEffect, useState } from 'react';
import { View, Text, Animated,StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gStyle, isDarkMode } from '../styles/style';
import { BackArrow, Title } from '../styles/CONST';

export default function Progress({ navigation }) {
  const [progress, setProgress] = useState(0);
  const animatedValue = new Animated.Value(0);
  const [level, setLevel] = useState(0);
  const [progressLimit, setProgressLimit] = useState(5);
  const [LvlImage, setLvlImage] = useState(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem('Progress');
        if (storedProgress) {
          const parsedProgress = JSON.parse(storedProgress);
          setProgress(parsedProgress);
          updateLevel(parsedProgress);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProgress();
  }, []);

  const updateLevel = (currentProgress) => {
    if (currentProgress >= 5 && currentProgress < 25) {
      setLevel(1);
      setProgressLimit(25);
      setLvlImage(require("../assets/firstlevel.png"));
    } else if (currentProgress >= 25 && currentProgress < 50) {
      setLevel(2);
      setProgressLimit(50);
      setLvlImage(require("../assets/secondlevel.png"));
    } else if (currentProgress >= 50) {
      setLevel(3);
      setProgressLimit(100);
      setLvlImage(require("../assets/thirdlevel.png"));
    }else if (currentProgress >= 50) {
      setLevel(4);
      setProgressLimit(200);
      setLvlImage(require("../assets/master.png"));
    } else if (currentProgress >= 50) {
      setLevel(5);
      setProgressLimit(500);
      setLvlImage(require("../assets/expert.png"));
    } else {
      setLevel(0);
      setProgressLimit(5);
      
    }
  };

  useEffect(() => {
    updateLevel(progress);

    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={gStyle.page}>
      <BackArrow navigation={navigation} />
      <Title text="Прогресс"/>

      <View>
        <View style={{ shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.9, shadowRadius: 7}}>
          {LvlImage-1 && <Image source={LvlImage-1} style={{width:120,height:120, margin: 31}} />}
        </View>
        <View style={{ shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.9, shadowRadius: 7}}>
          {LvlImage && <Image source={LvlImage} style={{width:175,height:175, margin: 31}} />}
        </View>
        <View style={{ shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.9, shadowRadius: 7}}>
          {LvlImage+1 && <Image source={LvlImage+1} style={{width:120,height:120, margin: 31}} />}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={gStyle.specText}>
          {level}
        </Text>
         <View style={styles.bar}>
            <Text style={[gStyle.specText, styles.overlayText]}>{`${progress}/${progressLimit}`}</Text>
            <Animated.View style={[styles.barInd,{width: `${(progress / progressLimit) * 100}%`}]}/>
        </View>
        <Text style={gStyle.specText}>
          {level+1}
        </Text>
      </View>  
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 311,
    height: 35,
    backgroundColor: isDarkMode() ? "#7B68EE" : '#e6e6fa',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bar: {
    width: 261,
    height: 31,
    backgroundColor: isDarkMode() ? "#7B68EE" : '#e6e6fa',
    borderRadius: 12,
    borderColor: isDarkMode() ? '#483D8B' : '#7d7e80',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  overlayText: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    zIndex: 2,
  },
  barInd: {
    display: 'flex',
    flexDirection: 'column',
    width: 205,
    height: 29,
    backgroundColor: isDarkMode() ? "#FFCA1D" : '#e6e6fa',
    borderRadius: 12,
  },
});