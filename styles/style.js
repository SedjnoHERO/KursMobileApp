import { StyleSheet, Appearance } from "react-native";

export function isDarkMode() {
  const colorScheme = Appearance.getColorScheme();
  console.log("colorScheme:", colorScheme);
  return colorScheme === "dark";
}

export const gStyle = StyleSheet.create({
  page: {
    backgroundColor: isDarkMode() ? "#483D8B" : "#F5F5F5",
    flex: 1,
  },

  title: {
    fontSize: 25,
    lineHeight: 24,
    fontFamily: "mt-bold",
    textAlign: "center",
    color: isDarkMode() ? "white" : "black",
  },

  text: {
    color: isDarkMode() ? "white" : "black",
    fontSize: 18,
    fontFamily: "mt-light",
    height: 66,
    width: "100%",
    textAlign: "center",
  },

  funcText: {
    color: isDarkMode() ? "#FFCA1D" : "#66CDAA",
    fontFamily: "mt-light",
    fontSize: 18,
  },

  header: {
    height: 39,
    marginTop: 61,
    textAlign: "center",
    fontFamily: "mt-light",
    fontWeight: 800,
    fontSize: 32,
    lineHeight: 39,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
