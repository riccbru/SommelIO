import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function LineSeparator() {

    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            marginVertical: 24,
            flexDirection: "row",
            alignItems: "center"
        },
        lines: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.gray,
        },
        lineText: {
            marginHorizontal: 10,
            color: theme.colors.gray
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.lines} />
            <Text style={styles.lineText}>OR</Text>
            <View style={styles.lines} />
        </View>
    );
}