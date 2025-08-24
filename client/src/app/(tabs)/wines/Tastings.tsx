import { useState } from "react";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { Searchbar, Text } from "react-native-paper";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import TastingsList from "@/src/components/tastings/TastingsList";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function Tastings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [searchQuery, setSearchQuery] = useState("");
	const { loading, tastings, refreshTastings } = useData();

	const styles = StyleSheet.create({
		container: {
			backgroundColor: theme.colors.background,
		},
		centeredContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		searchBarContainer: {
			marginLeft: 5,
			marginRight: 5,
			marginTop: 10,
			backgroundColor: theme.colors.background,
		},
		tastingsContainer: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 22,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		fab: {
			right: 0,
			width: 55,
			bottom: 0,
			margin: 15,
			height: 55,
			borderRadius: 30,
			position: "absolute",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.dark ? theme.colors.notCard : theme.colors.pearl,
		},
		modalContainer: {
			margin: 20,
			padding: 20,
			borderWidth: 2,
			borderRadius: 15,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		divider: {
			marginTop: 5,
			marginBottom: 20,
			backgroundColor: theme.colors.primary,
		},
	});

	if (loading) {
		return <LoadingSpinner text={t("loading")} />;
	}

	return (
		<>
			{!tastings.length ? (
				<View style={styles.centeredContainer}>
					<Text style={styles.text}>{t("tastings.notFound")}</Text>
				</View>
			) : (
				<>
					<View style={styles.container}>
						<View style={styles.searchBarContainer}>
							<Searchbar
								value={searchQuery}
								onChangeText={setSearchQuery}
								placeholder={t("tastings.searchbar")}
								style={{ marginTop: 5, marginBottom: 5 }}
							/>
						</View>
					</View>
					<ScrollView
						style={styles.tastingsContainer}
						keyboardShouldPersistTaps='handled'
						refreshControl={
							<RefreshControl refreshing={loading} onRefresh={refreshTastings} />
						}
					>
						<TastingsList tastings={tastings} searchQuery={searchQuery} />
					</ScrollView>
				</>
			)}
		</>
	);
}
