import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

type Props = {
	text: string;
};

export default function LoadingSpinner({ text }: Props) {
	const theme = useTheme();
	const styles = StyleSheet.create({
		loadingContainer: {
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
	});
	return (
		<View style={styles.loadingContainer}>
			<ActivityIndicator size='large' color={theme.dark ? "#ffffff" : "#000000"} />
			<View style={{ marginTop: 25 }} />
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}
