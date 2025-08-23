import { useState } from "react";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import { useTheme, Searchbar, Text } from "react-native-paper";
import ToDrinkList from "@/src/components/tastings/ToDrinkList";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function ToDrink() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [searchQuery, setSearchQuery] = useState("");
	const { loading, wines, refreshWines } = useData();

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
			{!wines.length ? (
				<View style={styles.centeredContainer}>
					<Text style={styles.text}>{t("todrink_notFound")}</Text>
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
						refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshWines} />}
					>
						<ToDrinkList wines={wines} searchQuery={searchQuery} />
					</ScrollView>
				</>
			)}
		</>
	);
}
