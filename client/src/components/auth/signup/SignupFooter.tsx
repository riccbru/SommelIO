import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SignupFooter() {
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
				<Text style={styles.text}>{t("signup.noSignup")}</Text>
				<TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/login")}>
					<Text style={styles.linkText}>Login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
