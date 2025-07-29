import { useAuth } from "@/hooks/useAuth";
import { Linking, StyleSheet, Pressable, Text, View } from "react-native";

export default function Index() {

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
    },
    link: {
      fontSize: 20,
      // color: "#9e9eff",
      color: "#b58638",
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
        <Text style={styles.link}>https://aisitalia.it</Text>
      </Pressable>
    </View>
  );
}

