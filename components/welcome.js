import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Button } from 'react-native';
import {  gStyle, isDarkMode } from '../styles/style';

export default function Welcome({ navigation }) {
  const loadScene = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={[styles.container, gStyle.main]}>
      <View style={styles.logoback}><Image source={require('../assets/logo.png')} style={styles.logo} /></View>
      <Text style={gStyle.title}>Добро пожаловать!</Text>
      <Text style={[styles.text, gStyle.text]}>Мы рады видеть вас в приложении "Тренажёр для развития памяти и когнитивных функций".</Text>
      
      <View>
      {Platform.OS === 'ios' ? (<Button title="Начать" onPress={() => loadScene()} color="green" />) : (
        <TouchableOpacity onPress={() => loadScene()} style={{borderRadius: 100 }}>
          <View style={{ backgroundColor: 'green', padding: 7, borderRadius: 20 }}>
            <Text style={[{ color: 'white' }, {fontSize: 18}]}>Начать</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
        <Text style={styles.under}>Типикин Ярослав Андреевич ПО-22</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  under: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 25,
    color: isDarkMode ? 'white' : 'black',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoback:{
    marginTop:-70,
    marginBottom: 10,
    borderRadius: 100,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  text: {
    marginTop:7,
    marginBottom: 15,  
    marginLeft:'5%',
    marginRight:'5%',
  },
});