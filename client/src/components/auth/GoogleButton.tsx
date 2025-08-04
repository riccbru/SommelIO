import { useTheme } from "react-native-paper";
import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native"; 

export function GoogleButton() {

    const theme = useTheme();

    const iconSource = Platform.select({
        ios:
            theme.dark ?
            require('@/assets/images/google/ios/dark/continue.png')
            : require('@/assets/images/google/ios/light/continue.png'),
        android:
            theme.dark ?
            require('@/assets/images/google/android/dark/continue.png')
            : require('@/assets/images/google/android/light/continue.png'),
    });

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        button: {
            borderWidth: 1,
            borderRadius: 30,
            borderColor: theme.dark ? "#ffffff" : theme.colors.gray,
        },
        image: {
            height: 51,
            width: 232
        }
    });

    const handlePress = async () => {
        console.log("Google signin");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Image style={styles.image} source={iconSource} />
             </TouchableOpacity>
        </View>
    );
}