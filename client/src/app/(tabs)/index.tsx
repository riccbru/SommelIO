import { useAuth } from "@/src/hooks/useAuth";
import { Linking, StyleSheet, Pressable, Text, View } from "react-native";

export default function Index() {

  const { accessToken, refreshToken } = useAuth();

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
    },
    tokenText: {
      fontSize: 15,
      fontWeight: 300,
      color: "#ffffff",
      fontFamily: "Epilogue",
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
      <Text style={styles.text}>Access Token (15m):</Text>
      <Text style={styles.tokenText}>{accessToken}</Text>
      <Text style={styles.text}>Refresh Token (7d):</Text>
      <Text style={styles.tokenText}>{refreshToken}</Text>
    </View>
  );
}

