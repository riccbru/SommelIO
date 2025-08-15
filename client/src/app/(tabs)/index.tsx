import { useTheme } from "react-native-paper";
import { Linking, StyleSheet, Pressable, Text, View } from "react-native";
import Title from "@/src/components/Title";

export default function Index() {
	const theme = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 30,
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold",
		},
		link: {
			fontSize: 20,
			color: theme.colors.amber,
			fontFamily: "Epilogue-Regular",
			textDecorationLine: "underline",
		},
	});

	const handlePress = () => {
		Linking.openURL("https://aisitalia.it/");
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "column", alignItems: "center" }}>
				<Text style={styles.text}>Welcome to </Text>
				<View style={{ marginLeft: 30 }}>
					<Title />
				</View>
			</View>
			<Pressable onPress={handlePress}>
				<Text style={styles.link}>https://aisitalia.it</Text>
			</Pressable>
		</View>
	);
}
