import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, View } from "react-native";

export function LineSeparator() {
	const theme = useTheme();
	const { t } = useTranslation();

	const styles = StyleSheet.create({
		container: {
			marginTop: 25,
			marginBottom: 25,
			flexDirection: "row",
			alignItems: "center",
		},
		lines: {
			flex: 1,
			height: 1,
			fontFamily: "Epilogue-Regular",
			backgroundColor: theme.colors.gray,
		},
		lineText: {
			marginHorizontal: 10,
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular",
		},
	});

	return (
		<View style={styles.container}>
			<View style={styles.lines} />
			<Text style={styles.lineText}>{t("signin.continueSSO")}</Text>
			<View style={styles.lines} />
		</View>
	);
}
