import { Link } from "expo-router";
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	const theme = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 22,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		link: {
			fontSize: 24,
			fontFamily: "Epilogue-Bold",
			color: theme.colors.primary,
			textDecorationLine: "underline",
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Route not found</Text>
			<View style={{ marginTop: 5 }} />
			<Link href={"/"} style={styles.link}>
				Go back to home
			</Link>
		</View>
	);
}
