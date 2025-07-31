import { StyleSheet, Text, View } from "react-native";

export default function Friends() {
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
        <Text style={styles.text}>colleghi</Text>
    </View>
  );
}