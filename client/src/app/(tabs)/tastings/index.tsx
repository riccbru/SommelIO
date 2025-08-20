import { useTranslation } from "react-i18next";
import TastingsAPI from "@/src/services/tastings";
import { ListPlusIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import NewWineModal from "@/src/components/tastings/NewWineModal";
import TastingsList from "@/src/components/tastings/TastingsList";
import { useTheme, Searchbar, Text, FAB } from "react-native-paper";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

type Exam = Record<string, any>;

type newWine = {
	denomination: string;
	winemaker: string;
	vintage: string;
};

type Tasting = {
	tid: string;
	uid: string;
	full_name: string;
	winemaker: string;
	wine_category_name: string;
	sample_number: string;
	wine_denomination: string;
	alcohol_content: string;
	vintage: string;
	wine_temperature: string;
	ambient_temperature: string;
	tasting_date: string;
	tasting_time: string;
	tasting_location: string;
	created_at: string;
	updated_at: string;
	visual_exam: Exam;
	olfactory_exam: Exam;
	taste_olfactory_exam: Exam;
	final_considerations: Exam;
};

const defaultNewWine: newWine = {
	denomination: "",
	winemaker: "",
	vintage: "",
};

export default function Tastings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [tastings, setTastings] = useState<Tasting[]>([]);
	const [newWine, setNewWine] = useState<newWine>(defaultNewWine);

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

	const fetchTastings = useCallback(async () => {
		const delay = new Promise(resolve => setTimeout(resolve, 650));
		try {
			const [data] = await Promise.all([TastingsAPI.fetchTastings(), delay]);
			setTastings(data.tastings || []);
		} catch (error: any) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTastings();
	}, [fetchTastings]);

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
						refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTastings} />}
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
				icon={() => <ListPlusIcon size={24} />}
			/>

			<NewWineModal
				visible={modal}
				newWine={newWine}
				tastings={tastings}
				setNewWine={setNewWine}
				onDismiss={() => setModal(false)}
			/>
		</>
	);
}
