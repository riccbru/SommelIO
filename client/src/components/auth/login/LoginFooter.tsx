import { useRouter } from "expo-router";
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

export function LoginFooter() {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const styles = StyleSheet.create({
		container: {
			marginTop: 25,
			alignItems: "center",
		},
		text: {
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		linkText: {
			marginLeft: 5,
			color: theme.colors.gray,
			textDecorationLine: "underline",
			fontFamily: "Epilogue-Regular",
		},
	});
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row" }}>
				<Text style={styles.text}>{t("signin.noAccount")}</Text>
				<TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/signup")}>
					<Text style={styles.linkText}>Signup</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
