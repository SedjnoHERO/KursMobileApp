import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from "react-native";
import { gStyle, isDarkMode } from "../styles/style";
// import Contacts from './contacts';

export default function Main({ navigation }) {
  // const loadScene = () =>  {
  //   navigation.navigate('Contact');
  // }

  // const [news, setNews] = useState([
  //   {name: 'google', anons: 'Google!!!', full: 'Google is cool!', key: '1', img: 'https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1'},
  //   {name: 'Apple', anons: 'Apple!!!', full: 'Apple is cool!', key: '2', img: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.jpg'},
  //   {name: 'FaceBook', anons: 'FaceBook!!!', full: 'FaceBook is cool!', key: '3', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'}
  // ]);

  const firstGame = () => {
    navigation.navigate("PuzzleGame");
  };

  return (
    <View style={[gStyle.page, { justifyContent: "center", alignItems: "center" }]}>
      <StatusBar color={isDarkMode() ? "white" : "black"} />
      <Text style={gStyle.header}>Главная страница</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.gamesTitle} onPress={() => firstGame()}>
            <Image source={require("../assets/5nashki.png")} style={{ width: "100%", height: "100%", zIndex: 1 }} />
            <View style={styles.overlay}>
              <Text style={[gStyle.specText, { zIndex: 3, fontSize: 20, color: "white" }]}>пятнашки</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gamesTitle}>
            <Image source={require("../assets/5nashki.png")} style={{ width: "100%", height: "100%", zIndex: 1 }} />
            <View style={styles.overlay}>
              <Text style={[gStyle.specText, { zIndex: 3, fontSize: 20, color: "white" }]}>найди пару</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.gamesTitle}>
            <Image source={require("../assets/5nashki.png")} style={{ width: "100%", height: "100%", zIndex: 1 }} />
            <View style={styles.overlay}>
              <Text style={[gStyle.specText, { zIndex: 3, fontSize: 20, color: "white" }]}>тетрис</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gamesTitle}>
            <Image source={require("../assets/5nashki.png")} style={{ width: "100%", height: "100%", zIndex: 1 }} />
            <View style={styles.overlay}>
              <Text style={[gStyle.specText, { zIndex: 3, fontSize: 20, color: "white" }]}>2048</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.gamesTitle}>
            <Image source={require("../assets/5nashki.png")} style={{ width: "100%", height: "100%", zIndex: 1 }} />
            <View style={styles.overlay}>
              <Text style={[gStyle.specText, { zIndex: 3, fontSize: 20, color: "white" }]}>поиск слова</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gamesTitle}>
            <Image source={require("../assets/5nashki.png")} style={{ width: "100%", height: "100%", zIndex: 1 }} />
            <View style={styles.overlay}>
              <Text style={[gStyle.specText, { zIndex: 3, fontSize: 20, color: "white" }]}>четыре в ряд</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  gamesTitle: {
    width: 149,
    height: 199,
    borderRadius: 23,
    margin: 11,
    marginBottom: 23,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    height: "25%",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

//   return (
//       <View style={gStyle.main}>
//         <FlatList data={news} renderItem={({item})=>(
//           <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FullInfo', item ) }>
//           <Image source={{
//           width: 200,
//           height:200,
//           uri: item.img
//         }} style={{ alignSelf: 'center', justifyContent: 'center' }} />

//             <Text style={styles.title}>{ item.name }</Text>
//             <Text style={styles.anons}>{ item.anons }</Text>
//           </TouchableOpacity>
//         )} />
//       </View>
//     );

// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//   },
//   games: {
//     width: 149,
//     height: 199,
//   },
// item: {
//   width: "100%",
//   marginBottom: 30,
// },
// title: {
//   fontFamily: 'mt-bold',
//   fontSize: 22,
//   textAlign: 'center',
//   marginTop: 20,
//   color: 'black'
// },
// anons: {
//   fontFamily: 'mt-light',
//   fontSize: 16,
//   textAlign: 'center',
//   marginTop: 5,
//   color: 'black'
// },
