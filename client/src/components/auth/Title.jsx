import { Text, StyleSheet } from "react-native";

export default function Title() {
  return <Text style={styles.title}>Login SommelIO🍷</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 32,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center"
  }
});
