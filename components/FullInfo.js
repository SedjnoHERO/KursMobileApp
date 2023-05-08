import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { gStyle } from '../styles/style'


export default function FullInfo({ route }) {
  // const loadScene = () =>  {
  //   navigation.goBack();
  // }
  return (
      <View style={gStyle.main}>
            <Image source={{
              width: '100%',
              height:200,
              uri: route.params.img
            }} />
        <Text style={gStyle.title}>{route.params.name}</Text>
        <Text style={styles.full}>{route.params.full}</Text>

        {/* <Button title='Открыть страницу' onPress={loadScene}/> */}
      </View>
    );

}
 
const styles = StyleSheet.create({
  full: {
    fontFamily: 'mt-bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    color: 'red'
  }
});