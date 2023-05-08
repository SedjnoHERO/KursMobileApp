import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { gStyle } from '../styles/style'
// import Contacts from './contacts';


export default function Main( {navigation}) {
  // const loadScene = () =>  {
  //   navigation.navigate('Contact');
  // }
 
  const [news, setNews] = useState([
    {name: 'google', anons: 'Google!!!', full: 'Google is cool!', key: '1', img: 'https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1'},
    {name: 'Apple', anons: 'Apple!!!', full: 'Apple is cool!', key: '2', img: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.jpg'},
    {name: 'FaceBook', anons: 'FaceBook!!!', full: 'FaceBook is cool!', key: '3', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'}
  ]);

  return (
      <View style={gStyle.main}>
        <Text style={[gStyle.title , styles.header]}>Главная страница</Text>
        <FlatList data={news} renderItem={({item})=>(
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FullInfo', item ) }>
          <Image source={{
          width: 200,
          height:200,
          uri: item.img
        }} style={{ alignSelf: 'center', justifyContent: 'center' }} />

            <Text style={styles.title}>{ item.name }</Text>
            <Text style={styles.anons}>{ item.anons }</Text>
          </TouchableOpacity>
        )} />
      </View>
    );

}
 
const styles = StyleSheet.create({

  header: {
    marginBottom: 30,
  },
  item: {
    width: "100%",
    marginBottom: 30,
  },
  title: {
    fontFamily: 'mt-bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    color: 'black'
  },
  anons: {
    fontFamily: 'mt-light',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: 'black'
  },

});