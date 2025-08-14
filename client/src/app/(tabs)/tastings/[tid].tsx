import { StarIcon } from "phosphor-react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Text, Card, useTheme, ActivityIndicator } from "react-native-paper";
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";

import TastingsAPI from "@/src/services/tastings";
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
			backgroundColor: theme.colors.background,
			padding: 16,
		},
		loadingContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		card: {
			marginBottom: 16,
			backgroundColor: theme.colors.pearl,
		},
		title: {
			color: "#000000",
			fontSize: 24,
			marginBottom: 8,
			fontFamily: "Epilogue-Bold"
		},
		cardSubtitle: {
			marginBottom: 10,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		subtitle: {
			fontSize: 18,
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold"
		},
		text: {
			color: theme.colors.text,
			fontFamily: "Epilogue-Regular"
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
				color: theme.dark ? "#ffffff" : "#000000"
			},
			headerRight: () => (
				<TouchableOpacity
					style={{ justifyContent: "center", marginTop: 10, marginBottom: 10 }}
					onPress={toggleFavorite}
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
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' />
				<View style={{ marginTop: 10 }} />
				<Text style={styles.text}>Loading tasting details...</Text>
			</View>
		);
	}

	if (!tasting) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.text}>Tasting not found</Text>
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
				<ActionButton action='download' tid={tasting.tid} />
				<ActionButton
					action='delete'
					tid={tasting.tid}
					name={tasting.wine_denomination}
					winemaker={tasting.winemaker}
				/>
			</View>

			<Card style={styles.card}>
				<Card.Content>
					<TastingCard
						name={"tasting"}
						uuid={tasting.tid}
						editMode={editMode}
						setEditMode={setEditMode}
						subtitle='Wine description'
					/>
					{!editMode["tasting"] ? (
						<TastingDetails tasting={tasting} />
					) : (
						<TastingUpdate />
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
						subtitle='Visual Examination'
					/>
					{!editMode["visual"] ? (
						<VisualDetails exam={tasting.visual_exam} />
					) : (
						<VisualUpdate />
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
						subtitle='Olfactory Examination'
					/>
					{!editMode["olfactory"] ? (
						<OlfactoryDetails exam={tasting.olfactory_exam} />
					) : (
						<OlfactoryUpdate />
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
						subtitle='Taste-Olfactory Examination'
					/>
					{!editMode["taste"] ? (
						<TasteDetails exam={tasting.taste_olfactory_exam} />
					) : (
						<TasteUpdate />
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
						subtitle='Final Considerations'
					/>
					{!editMode["final"] ? (
						<FinalDetails exam={tasting.final_considerations} />
					) : (
						<FinalUpdate />
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
						subtitle='Scoring Evaluation'
					/>
					{!editMode["scoring"] ? (
						<ScoringDetails scoring={tasting.scoring_evaluation} />
					) : (
						<ScoringUpdate />
					)}
				</Card.Content>
			</Card>
		</ScrollView>
	);
}
