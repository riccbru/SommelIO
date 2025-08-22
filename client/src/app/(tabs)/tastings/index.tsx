import { useState } from "react";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { ListIcon } from "phosphor-react-native";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import ToDrinkModal from "@/src/components/tastings/ToDrinkModal";
import TastingsList from "@/src/components/tastings/TastingsList";
import { useTheme, Searchbar, Text, FAB } from "react-native-paper";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function Tastings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [modal, setModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const { loading, tastings, wines, refreshTastings } = useData();

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
		return <LoadingSpinner text={t("tastings.loading_tastings")} />;
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
								style={{ marginTop: 5 }}
								value={searchQuery}
								onChangeText={setSearchQuery}
								placeholder={t("tastings.searchbar")}
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
						<TastingsList searchQuery={searchQuery} tastings={tastings} />
					</ScrollView>
				</>
			)}

			<FAB
				animated={false}
				style={styles.fab}
				onPress={() => setModal(true)}
				color={theme.colors.background}
				icon={() => <ListIcon size={24} color={theme.colors.black} />}
			/>

			<ToDrinkModal wines={wines} visible={modal} onDismiss={() => setModal(false)} />
		</>
	);
}
