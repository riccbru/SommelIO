import { StarIcon } from "phosphor-react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";

import TastingsAPI from "@/src/services/tastings";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import TastingCard from "@/src/components/tastings/TastingCard";
import ActionButton from "@/src/components/tastings/ActionButton";

import FinalDetails from "@/src/components/tastings/details/FinalDetails";
import TasteDetails from "@/src/components/tastings/details/TasteDetails";
import VisualDetails from "@/src/components/tastings/details/VisualDetails";
import TastingDetails from "@/src/components/tastings/details/TastingDetails";
import ScoringDetails from "@/src/components/tastings/details/ScoringDetails";
import OlfactoryDetails from "@/src/components/tastings/details/OlfactoryDetails";

import FinalUpdate from "@/src/components/tastings/update/FinalUpdate";
import TasteUpdate from "@/src/components/tastings/update/TasteUpdate";
import VisualUpdate from "@/src/components/tastings/update/VisualUpdate";
import ScoringUpdate from "@/src/components/tastings/update/ScoringUpdate";
import TastingUpdate from "@/src/components/tastings/update/TastingUpdate";
import OlfactoryUpdate from "@/src/components/tastings/update/OlfactoryUpdate";
import { useTranslation } from "react-i18next";

type EditModeShape = {
	tasting: boolean;
	visual: boolean;
	olfactory: boolean;
	taste: boolean;
	final: boolean;
	scoring: boolean;
};

type Tasting = {
	tid: string;
	uid: string;
	full_name: string;
	wine_category_name: string;
	sample_number: string;
	wine_denomination: string;
	favorite: boolean;
	winemaker: string;
	alcohol_content: string;
	vintage: string;
	wine_temperature: string;
	ambient_temperature: string;
	tasting_date: string;
	tasting_time: string;
	tasting_location: string;
	created_at: string;
	updated_at: string;
	visual_exam: Record<string, any>;
	olfactory_exam: Record<string, any>;
	taste_olfactory_exam: Record<string, any>;
	final_considerations: Record<string, any>;
	scoring_evaluation: Record<string, any>;
};

export default function TastingDetail() {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [favorite, setFavorite] = useState(false);
	const { tid } = useLocalSearchParams<{ tid: string }>();
	const [tasting, setTasting] = useState<Tasting | null>(null);
	const [editMode, setEditMode] = useState<EditModeShape>({
		tasting: false,
		visual: false,
		olfactory: false,
		taste: false,
		final: false,
		scoring: false,
	});

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 5,
			backgroundColor: theme.colors.background,
		},
		loadingContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		card: {
			borderWidth: 2,
			marginBottom: 30,
			borderColor: theme.colors.primary,
		},
		title: {
			fontSize: 24,
			marginBottom: 8,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		cardSubtitle: {
			marginBottom: 10,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		subtitle: {
			fontSize: 18,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		text: {
			fontSize: 22,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	});

	const toggleFavorite = useCallback(async () => {
		try {
			const response = await TastingsAPI.toggleFavorite(tid);
			setFavorite(response.data.favorite);
		} catch (error) {
			console.log(error);
		}
	}, [tid]);

	useLayoutEffect(() => {
		if (!tasting) return;
		navigation.setOptions({
			title: `${tasting?.wine_denomination} - ${tasting?.winemaker}`,
			headerTitleStyle: {
				fontFamily: "Epilogue-Regular",
				color: theme.dark ? "#ffffff" : "#000000",
			},
			headerRight: () => (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={toggleFavorite}
					style={{ justifyContent: "center", marginTop: 10, marginBottom: 10 }}
				>
					<StarIcon
						size={32}
						weight={favorite ? "fill" : "regular"}
						color={favorite ? theme.colors.amber : theme.dark ? "#ffffff" : "#000000"}
					/>
				</TouchableOpacity>
			),
		});
	}, [navigation, theme, favorite, tasting, toggleFavorite]);

	useEffect(() => {
		const fetchTasting = async () => {
			try {
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				const [response] = await Promise.all([TastingsAPI.fetchTastingById(tid), delay]);
				setTasting(response.data);
				setFavorite(response.data.favorite);
			} catch (error) {
				console.error("Error fetching tasting:", error);
			} finally {
				setLoading(false);
			}
		};
		if (tid) {
			fetchTasting();
		}
	}, [tid, refresh]);

	if (loading) {
		return <LoadingSpinner text={t("tastings.loading_details")} />;
	}

	if (!tasting) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.text}>{t("tastings.notFound")}</Text>
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={loading} onRefresh={() => setRefresh(!refresh)} />
			}
		>
			<View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
				<View style={{ marginTop: 20 }} />
				<ActionButton action='download' tid={tasting.tid} />
				<View style={{ paddingVertical: 5 }} />
				<ActionButton
					action='delete'
					tid={tasting.tid}
					name={tasting.wine_denomination}
					winemaker={tasting.winemaker}
				/>
				<View style={{ marginBottom: 20 }} />
			</View>

			<Card style={styles.card}>
				<Card.Content>
					<TastingCard
						name={"tasting"}
						uuid={tasting.tid}
						editMode={editMode}
						setEditMode={setEditMode}
						subtitle={t("new.tasting.title")}
					/>
					{!editMode["tasting"] ? (
						<TastingDetails tasting={tasting} />
					) : (
						<TastingUpdate
							tasting={tasting}
							setEditMode={setEditMode}
							setRefresh={setRefresh}
						/>
					)}
				</Card.Content>
			</Card>

			<Card style={styles.card}>
				<Card.Content>
					<TastingCard
						name={"visual"}
						uuid={tasting.visual_exam.eid}
						editMode={editMode}
						setEditMode={setEditMode}
						subtitle={t("new.visual.title")}
					/>
					{!editMode["visual"] ? (
						<VisualDetails exam={tasting.visual_exam} />
					) : (
						<VisualUpdate
							tid={tasting.tid}
							sparkling={tasting.wine_category_name === "sparkling"}
							exam={tasting.visual_exam}
							setEditMode={setEditMode}
							setRefresh={setRefresh}
						/>
					)}
				</Card.Content>
			</Card>

			<Card style={styles.card}>
				<Card.Content>
					<TastingCard
						name={"olfactory"}
						uuid={tasting.olfactory_exam.eid}
						editMode={editMode}
						setEditMode={setEditMode}
						subtitle={t("new.olfactory.title")}
					/>
					{!editMode["olfactory"] ? (
						<OlfactoryDetails exam={tasting.olfactory_exam} />
					) : (
						<OlfactoryUpdate
							tid={tasting.tid}
							exam={tasting.olfactory_exam}
							setEditMode={setEditMode}
							setRefresh={setRefresh}
						/>
					)}
				</Card.Content>
			</Card>

			<Card style={styles.card}>
				<Card.Content>
					<TastingCard
						name={"taste"}
						uuid={tasting.taste_olfactory_exam.eid}
						editMode={editMode}
						setEditMode={setEditMode}
						subtitle={t("new.taste.title")}
					/>
					{!editMode["taste"] ? (
						<TasteDetails exam={tasting.taste_olfactory_exam} />
					) : (
						<TasteUpdate
							tid={tasting.tid}
							exam={tasting.taste_olfactory_exam}
							setEditMode={setEditMode}
							setRefresh={setRefresh}
						/>
					)}
				</Card.Content>
			</Card>

			<Card style={styles.card}>
				<Card.Content>
					<TastingCard
						name={"final"}
						uuid={tasting.final_considerations.eid}
						editMode={editMode}
						setEditMode={setEditMode}
						subtitle={t("new.final.title")}
					/>
					{!editMode["final"] ? (
						<FinalDetails exam={tasting.final_considerations} />
					) : (
						<FinalUpdate
							tid={tasting.tid}
							exam={tasting.final_considerations}
							setEditMode={setEditMode}
							setRefresh={setRefresh}
						/>
					)}
				</Card.Content>
			</Card>

			<Card style={styles.card}>
				<Card.Content>
					<TastingCard
						name={"scoring"}
						uuid={tasting.scoring_evaluation.sid}
						editMode={editMode}
						setEditMode={setEditMode}
						subtitle={t("new.scoring.title")}
					/>
					{!editMode["scoring"] ? (
						<ScoringDetails scoring={tasting.scoring_evaluation} />
					) : (
						<ScoringUpdate
							tid={tasting.tid}
							scoring={tasting.scoring_evaluation}
							setEditMode={setEditMode}
							setRefresh={setRefresh}
						/>
					)}
				</Card.Content>
			</Card>
		</ScrollView>
	);
}
