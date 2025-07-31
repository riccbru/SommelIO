import { useTheme } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

export default function Title() {

  const theme = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      marginBottom: 32,
      fontWeight: "600",
      color: theme.colors.text,
      textAlign: "center"
    }
  });

  return <Text style={styles.title}>Login SommelIO🍷</Text>;
}

