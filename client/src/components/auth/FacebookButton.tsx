import { useTheme } from "react-native-paper";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"; 

export function FacebookButton() {

    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            alignItems: "center",
        },
        text: {
            marginTop: 3,
            fontSize: 15,
            fontWeight: "500",
            color: "#ffffff",
        },
        button: {
            borderWidth: 1,
            borderColor: theme.dark ? "#ffffff" : theme.colors.gray,
            borderRadius: 30,
            backgroundColor: theme.colors.facebook
        },
        image: {
            width: 32,
            height: 32
        },
        buttonContainer: {
            gap: 10,
            width: 231,
            height: 45,
            marginBottom: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        }
    });

    const handlePress = async () => {
        console.log("Facebook signin");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <View style={styles.buttonContainer}>
                    <Image style={styles.image} source={require('@/assets/images/facebook/logo.png')} />
                    <Text style={styles.text}>Continue with Facebook</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}