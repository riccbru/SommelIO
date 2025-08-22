import { useMemo } from "react";
import { useTheme } from "@/src/hooks/useTheme";
import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import googleIosDark from "@/assets/images/google/ios/dark/logo.png";
import googleIosLight from "@/assets/images/google/ios/light/logo.png";
import googleAndroidDark from "@/assets/images/google/android/dark/logo.png";
import googleAndroidLight from "@/assets/images/google/android/light/logo.png";
import appleDark from "@/assets/images/apple/dark/logo.png";
import appleLight from "@/assets/images/apple/light/logo.png";
import facebookLogo from "@/assets/images/facebook/logo.png";

export default function ProviderSSO() {
	const { dark: isDark } = useTheme();

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

	const iconSource = useMemo(
		() => ({
			google:
				Platform.OS === "ios"
					? isDark
						? googleIosDark
						: googleIosLight
					: isDark
						? googleAndroidDark
						: googleAndroidLight,
			apple: isDark ? appleDark : appleLight,
			facebook: facebookLogo,
		}),
		[isDark]
	);

	const providers = [
		{ key: "apple", src: iconSource.apple },
		{ key: "facebook", src: iconSource.facebook },
		{ key: "google", src: iconSource.google },
	];

	return (
		<View style={styles.container}>
			{providers.map((el, index) => (
				<TouchableOpacity
					key={index}
					activeOpacity={0.6}
					onPress={() => console.log(`${el.key} SSO`)}
				>
					<Image source={el.src} style={styles.icon} resizeMode='contain' />
				</TouchableOpacity>
			))}
		</View>
	);
}
