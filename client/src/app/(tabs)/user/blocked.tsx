import React from "react";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BlockedColleague from "@/src/components/colleagues/BlockedColleague";

export default function Blocked() {
	const theme = useTheme();
	const { t } = useTranslation();
	const { blocked } = useData();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 10,
			backgroundColor: theme.colors.background,
		},
		emptyText: {
			fontSize: 20,
			marginTop: 20,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	});

	return (
		<View style={styles.container}>
			{!blocked.length ? (
				<View style={{ marginTop: 25, alignItems: "center", justifyContent: "center" }}>
					<Text style={styles.emptyText}>{t("wine_notFound")}</Text>
				</View>
			) : (
				<FlatList
					data={blocked}
					keyExtractor={item => item.rid}
					renderItem={({ item }) => <BlockedColleague blocked={item} />}
				/>
			)}
		</View>
	);
}
