import { useTheme } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export function LoginFooter() {

    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            marginTop: 25,
            alignItems: "center"
        },
        text: {
            color: theme.colors.text
        },
        linkText: {
            marginLeft: 5,
            color: theme.colors.gray,
            textDecorationLine: "underline"
        }
    })
    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Don't have an account? </Text>
                <Link href="/">
                    <Text style={styles.linkText}>Signup</Text>
                </Link>
            </View>
        </View>
    );
}