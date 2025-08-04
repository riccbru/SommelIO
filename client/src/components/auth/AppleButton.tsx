import { useTheme } from "react-native-paper";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export function AppleButton() {

    const theme = useTheme();
    const iconSource = theme.dark ?
        require('@/assets/images/apple/dark/continue.png')
        : require('@/assets/images/apple/light/continue.png');
    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            alignItems: "center",
        },
        button: {
            borderWidth: 1,
            borderRadius: 28,
            borderColor: theme.dark ? "#ffffff" : theme.colors.gray,
        },
        image: {
            width: 232,
            height: 51
        },
    });

    const handlePress = async () => {
        console.log("Apple signin");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Image style={styles.image} source={iconSource} />
            </TouchableOpacity>
        </View>
    );
}