import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gStyle, isDarkMode } from '../styles/style';
import { BackArrow, Title } from '../styles/CONST';

const levelImages = [
  require("../assets/levels/level0.png"),
  require("../assets/levels/level1.png"),
  require("../assets/levels/level2.png"),
  require("../assets/levels/level3.png"),
  require("../assets/levels/level4.png"),
  require("../assets/levels/level5.png"),
];

export default function Progress({ navigation }) {
  const [progress, setProgress] = useState(0);
  const animatedValue = new Animated.Value(0);
  const [level, setLevel] = useState(0);
  const [progressLimit, setProgressLimit] = useState(5);

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
    } else if (currentProgress >= 25 && currentProgress < 50) {
      setLevel(2);
      setProgressLimit(50);
    } else if (currentProgress >= 50 && currentProgress < 100) {
      setLevel(3);
      setProgressLimit(100);
    } else if (currentProgress >= 100 && currentProgress < 200) {
      setLevel(4);
      setProgressLimit(200);
    } else if (currentProgress >= 200 && currentProgress < 500) {
      setLevel(5);
      setProgressLimit(500);
    } else if (currentProgress >= 0 && currentProgress < 5) {
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
      <Title text="Активность"/>

      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Image source={levelImages[level - 1]} style={styles.smallBadges}/>
        <View style={styles.badgeShadow}>
          <Image source={levelImages[level]} style={{width:190,height:190, margin: 25}} />
        </View>
        <Image source={levelImages[level + 1]} style={styles.smallBadges} />
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
          {level + 1}
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
    backgroundColor: isDarkMode() ? "#FFCA1D" : '#66CDAA',
    borderRadius: 12,
  },
  smallBadges: {
    width:120,
    height:120,  
    margin: 15    
  },
  badgeShadow: { 
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 5}, 
    shadowOpacity: 0.3, 
    shadowRadius: 6
  }
});
