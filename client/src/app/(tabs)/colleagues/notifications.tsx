import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";

export default function Notifications() {
	const theme = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 35,
			fontFamily: "Epilogue-Bold",
			color: theme.colors.primary,
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.text}>notifications</Text>
		</View>
	);
}
