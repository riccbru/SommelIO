import { LinkProps } from "expo-router";
import { useTheme } from "@/src/hooks/useTheme";
import { FlatList, StyleSheet, View } from "react-native";
import NewOption from "@/src/components/navigation/NewOption";

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
		{ label: "todrink", descr: "todrink_description", path: "/new/todrink" as LinkProps["href"] },
		{
			label: "tasting_name",
			descr: "new_tasting_name_description",
			path: "/new/tasting/new" as LinkProps["href"],
		},
		{
			label: "tasting_name",
			descr: "old_tasting_name_description",
			path: "/new/tasting/old" as LinkProps["href"],
		},
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<NewOption title={item.label} descr={item.descr} path={item.path} />
				)}
			/>
		</View>
	);
}
