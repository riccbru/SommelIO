import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SignupFooter() {

    const theme = useTheme();
    const router = useRouter();
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
                <Text style={styles.text}>Already have an account</Text>
                <TouchableOpacity onPress={() => router.replace("/login")}>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}