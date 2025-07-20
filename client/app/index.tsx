import { Linking, StyleSheet, Pressable, Text, View } from "react-native";

export default function Index() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ff00ff",
    },
    text: {
      fontSize: 20,
      color: "#fefefe",
    },
    link: {
      fontSize: 20,
      color: "#0000ff",
      textDecorationLine: "underline",

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
        <Text style={styles.link}>https://aisitalia.it/</Text>
      </Pressable>
    </View>
  );
}

