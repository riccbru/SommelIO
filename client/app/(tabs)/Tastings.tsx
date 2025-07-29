import { StyleSheet, Text, View } from "react-native";

export default function Tastings() {
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000000",
    },
    text: {
      fontSize: 30,
      fontWeight: 300,
      color: "#ffffff",
      fontFamily: "Epilogue",
    }
  });

  return (
      <View style={styles.container}>
          <Text style={styles.text}>degustazioni</Text>
      </View>
  );
}