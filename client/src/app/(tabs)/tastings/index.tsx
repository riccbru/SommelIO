import { useNavigation } from "expo-router";
import TastingsAPI from "@/src/services/tastings";
import { ListPlusIcon } from "phosphor-react-native";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import TastingsList from "@/src/components/tastings/TastingsList";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTheme, Searchbar, Text } from "react-native-paper";
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

type Exam = Record<string, any>;

type Tasting = {
	tid: string;
	uid: string;
	full_name: string;
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

export default function Tastings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [tastings, setTastings] = useState<Tasting[]>([]);

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
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
					onPress={() => {
						console.log("add wine to drink");
					}}
				>
					<ListPlusIcon size={32} color={theme.dark ? "#ffffff" : "#000000"} />
				</TouchableOpacity>
			),
		});
	}, [navigation, theme.dark]);

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
		</>
	);
}
