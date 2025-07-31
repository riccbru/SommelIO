import { useTheme } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

export default function New() {

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background
    },
    text: {
      fontSize: 30,
      fontWeight: 300,
      fontFamily: "Epilogue",
      color: theme.colors.text
    }
  });

  return (
    <View style={styles.container}>
        <Text style={styles.text}>aggiungi</Text>
    </View>
  );
}