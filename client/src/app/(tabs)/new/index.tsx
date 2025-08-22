import NewOption from "./NewOption";
import { useTheme } from "@/src/hooks/useTheme";
import { FlatList, StyleSheet, View } from "react-native";

export default function New() {
	const theme = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 10,
			backgroundColor: theme.colors.background,
		},
		item: {
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	});

	const data = [
		{ label: "tasting_name", path: "/new/tasting" },
		{ label: "todrink", path: "/new/todrink" },
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item }) => <NewOption title={item.label} path={item.path} />}
			/>
		</View>
	);
}
