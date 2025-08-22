import { useTheme } from "@/src/hooks/useTheme";
import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProviderSSO() {
  const theme = useTheme();
  const isDark = theme.dark;

  const iconSource = {
    google:
      Platform.OS === "ios"
        ? isDark
          ? require("@/assets/images/google/ios/dark/logo@1x.png")
          : require("@/assets/images/google/ios/light/logo@1x.png")
        : isDark
        ? require("@/assets/images/google/android/dark/logo@1x.png")
        : require("@/assets/images/google/android/light/logo@1x.png"),
    apple: isDark
      ? require("@/assets/images/apple/dark/continue.png")
      : require("@/assets/images/apple/light/continue.png"),
    facebook: require("@/assets/images/facebook/logo.png"),
  };

  const providers = [
    { key: "google", src: iconSource.google },
    { key: "apple", src: iconSource.apple },
    { key: "facebook", src: iconSource.facebook },
  ];

  return (
    <View style={styles.container}>
      {providers.map(p => (
        <TouchableOpacity key={p.key} activeOpacity={0.6}>
          <Image source={p.src} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

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
