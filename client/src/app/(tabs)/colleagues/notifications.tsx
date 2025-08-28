import { useData } from "@/src/hooks/useData";
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, View } from "react-native";
import IncomingRequests from "@/src/components/colleagues/IncomingRequest";

export default function Notifications() {
	const theme = useTheme();
	const { requests } = useData();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 15,
			fontFamily: "Epilogue-Regular",
			color: theme.colors.primary,
		},
	});

	return (
		<View style={styles.container}>
			<IncomingRequests requests={requests} />
		</View>
	);
}
