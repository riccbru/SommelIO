import { useTheme } from "@/src/hooks/useTheme";
import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProviderSSO() {
    const theme = useTheme();
    const isDark = theme.dark;

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
        },
        icon: {
            width: 48,
            height: 48,
        },
    });

    const iconSource = {
        google:
            Platform.OS === "ios"
                ? isDark
                    ? require("@/assets/images/google/ios/light/logo.png")
                    : require("@/assets/images/google/ios/dark/logo.png")
                : isDark
                    ? require("@/assets/images/google/android/light/logo.png")
                    : require("@/assets/images/google/android/dark/logo.png"),
        apple: isDark
            ? require("@/assets/images/apple/light/logo.png")
            : require("@/assets/images/apple/dark/logo.png"),
        facebook: require("@/assets/images/facebook/logo.png")
    };

    const providers = [
        { key: "apple", src: iconSource.apple },
        { key: "facebook", src: iconSource.facebook },
        { key: "google", src: iconSource.google },
    ];

    return (
        <View style={styles.container}>
            {providers.map((el, index) => (
                <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => console.log(`${el.key} SSO`)}>
                    <Image source={el.src} style={styles.icon} resizeMode="contain" />
                </TouchableOpacity>
            ))}
        </View>
    );
}
