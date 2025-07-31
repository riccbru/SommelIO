import { useTheme } from "react-native-paper";
import { Linking, StyleSheet, Pressable, Text, View } from "react-native";

export default function Index() {
  
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    text: {
      fontSize: 30,
      fontWeight: 300,
      fontFamily: "Epilogue",
      color: theme.colors.text,
    },
    link: {
      fontSize: 20,
      color: theme.colors.amber,
      textDecorationLine: "underline",
    },
    tokenText: {
      fontSize: 15,
      fontWeight: 300,
      fontFamily: "Epilogue",
      color: theme.colors.text,
    }
  });

  const handlePress = () => {
    Linking.openURL("https://aisitalia.it/");
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Welcome to SommelIO 🍷</Text>
      <Pressable onPress={handlePress}>
        <Text style={styles.link}>https://aisitalia.it</Text>
      </Pressable>
    </View>
  );
}

