import { useTheme } from "react-native-paper";
import { StyleSheet, Text } from "react-native";

export default function AuthTitle({ action }) {

  const theme = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      marginBottom: 32,
      fontWeight: "600",
      textAlign: "center",
      color: theme.colors.text
    }
  });

  return <Text style={styles.title}>{action} to SommelIO🍷</Text>;
}

