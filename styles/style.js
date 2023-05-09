import { StyleSheet, Appearance  } from 'react-native';

export function isDarkMode() {
    const colorScheme = Appearance.getColorScheme();
    console.log('colorScheme:', colorScheme);
    return colorScheme === 'dark';
};
  
export const gStyle = StyleSheet.create({
    main: {
        backgroundColor: isDarkMode() ? '#2F4F4F' : 'white',
        flex:1,
        padding:20,
        paddingTop: 30,
    },
    
    title:{
        fontSize: 25,
        fontFamily: 'mt-bold',
        textAlign: 'center',
        color: isDarkMode() ?  'white' : 'black'
    },

    text: {
        color: isDarkMode() ? 'white' : 'black',
        fontSize: 18,
        textAlign: 'center',
    }

})