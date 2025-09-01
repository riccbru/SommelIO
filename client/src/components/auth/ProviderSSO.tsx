import { useMemo } from "react";
import { useTheme } from "@/src/hooks/useTheme";
import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import facebookLogo from "@/assets/images/SSO/fb_logo.png";
import appleDark from "@/assets/images/SSO/apple_light_logo.png";
import appleLight from "@/assets/images/SSO/apple_dark_logo.png";
import googleIosDark from "@/assets/images/SSO/google_ios_light_logo.png";
import googleIosLight from "@/assets/images/SSO/google_ios_dark_logo.png";
import googleAndroidDark from "@/assets/images/SSO/google_android_dark_logo.png";
import googleAndroidLight from "@/assets/images/SSO/google_android_light_logo.png";

export default function ProviderSSO() {
	const { dark: isDark } = useTheme();

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "space-around",
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
		{ key: "google", src: iconSource.google },
		{ key: "facebook", src: iconSource.facebook },
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
