import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { Text, Card } from "react-native-paper";
import { GavelIcon, StarIcon } from "phosphor-react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import TastingsAPI from "@/src/services/tastings";
import TastingCard from "@/src/components/tastings/TastingCard";
import ActionButton from "@/src/components/tastings/ActionButton";

import TastingDetails from "@/src/components/tastings/details/TastingDetails";
import TastingUpdate from "@/src/components/tastings/update/TastingUpdate";

import OldVisualDetails from "@/src/components/tastings/details/old/OldVisualDetails";
import NewVisualDetails from "@/src/components/tastings/details/new/NewVisualDetails";
import OldVisualUpdate from "@/src/components/tastings/update/old/OldVisualUpdate";
import NewVisualUpdate from "@/src/components/tastings/update/new/NewVisualUpdate";

import OldOlfactoryDetails from "@/src/components/tastings/details/old/OldOlfactoryDetails";
import NewOlfactoryDetails from "@/src/components/tastings/details/new/NewOlfactoryDetails";
import OldOlfactoryUpdate from "@/src/components/tastings/update/old/OldOlfactoryUpdate";
import NewOlfactoryUpdate from "@/src/components/tastings/update/new/NewOlfactoryUpdate";

import OldTasteDetails from "@/src/components/tastings/details/old/OldTasteDetails";
import NewTasteDetails from "@/src/components/tastings/details/new/NewTasteDetails";
import OldTasteUpdate from "@/src/components/tastings/update/old/OldTasteUpdate";
import NewTasteUpdate from "@/src/components/tastings/update/new/NewTasteUpdate";

import OldFinalDetails from "@/src/components/tastings/details/old/OldFinalDetails";
import NewFinalDetails from "@/src/components/tastings/details/new/NewFinalDetails";
import OldFinalUpdate from "@/src/components/tastings/update/old/OldFinalUpdate";
import NewFinalUpdate from "@/src/components/tastings/update/new/NewFinalUpdate";

import ScoringDetails from "@/src/components/tastings/details/ScoringDetails";
import ScoringUpdate from "@/src/components/tastings/update/ScoringUpdate";

type EditModeShape = {
	tasting: boolean;
	visual: boolean;
	olfactory: boolean;
	taste: boolean;
	final: boolean;
	scoring: boolean;
};

const defaultEditMode = {
	tasting: false,
	visual: false,
	olfactory: false,
	taste: false,
	final: false,
	scoring: false,
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
	new: boolean;
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
	const [editMode, setEditMode] = useState<EditModeShape>(defaultEditMode);

	const VisualDetails = !tasting?.new ? OldVisualDetails : NewVisualDetails;
	const VisualUpdate = !tasting?.new ? OldVisualUpdate : NewVisualUpdate;

	const OlfactoryDetails = !tasting?.new ? OldOlfactoryDetails : NewOlfactoryDetails;
	const OlfactoryUpdate = !tasting?.new ? OldOlfactoryUpdate : NewOlfactoryUpdate;

	const TasteDetails = !tasting?.new ? OldTasteDetails : NewTasteDetails;
	const TasteUpdate = !tasting?.new ? OldTasteUpdate : NewTasteUpdate;

	const FinalDetails = !tasting?.new ? OldFinalDetails : NewFinalDetails;
	const FinalUpdate = !tasting?.new ? OldFinalUpdate : NewFinalUpdate;

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
				color: theme.colors.primary,
				fontFamily: "Epilogue-Regular",
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
						color={favorite ? theme.colors.amber : theme.colors.primary}
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
	}, [refresh, tid]);

	if (!tasting) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.text}>{t("tastings.notFound")}</Text>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={140}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, backgroundColor: theme.colors.background }}
		>
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={() => setRefresh(!refresh)} />
				}
			>
				<View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
					<View style={{ marginTop: 10 }} />
					{!tasting.new ? (
						<></>
					) : (
						<>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start",
								}}
							>
								<GavelIcon
									size={32}
									weight='fill'
									color={theme.colors.purple}
									style={{ marginLeft: 10, marginRight: 10 }}
								/>
								<Text
									style={{
										fontSize: 20,
										marginTop: 5,
										color: theme.colors.primary,
										fontFamily: "Epilogue-Regular",
									}}
								>
									{t("new_tasting_name_description")}
								</Text>
							</View>
							<View style={{ paddingVertical: 5 }} />
						</>
					)}
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
							editMode={editMode}
							setEditMode={setEditMode}
							uuid={tasting.visual_exam.eid}
							subtitle={t("new.visual.title")}
						/>

						{!editMode["visual"] ? (
							<VisualDetails exam={tasting.visual_exam} />
						) : (
							<VisualUpdate
								tid={tasting.tid}
								setRefresh={setRefresh}
								setEditMode={setEditMode}
								exam={tasting.visual_exam}
								sparkling={tasting.wine_category_name === "sparkling"}
							/>
						)}
					</Card.Content>
				</Card>

				<Card style={styles.card}>
					<Card.Content>
						<TastingCard
							name={"olfactory"}
							editMode={editMode}
							setEditMode={setEditMode}
							uuid={tasting.olfactory_exam.eid}
							subtitle={t("new.olfactory.title")}
						/>
						{!editMode["olfactory"] ? (
							<OlfactoryDetails exam={tasting.olfactory_exam} />
						) : (
							<OlfactoryUpdate
								tid={tasting.tid}
								setRefresh={setRefresh}
								setEditMode={setEditMode}
								exam={tasting.olfactory_exam}
							/>
						)}
					</Card.Content>
				</Card>

				<Card style={styles.card}>
					<Card.Content>
						<TastingCard
							name={"taste"}
							editMode={editMode}
							setEditMode={setEditMode}
							subtitle={t("new.taste.title")}
							uuid={tasting.taste_olfactory_exam.eid}
						/>
						{!editMode["taste"] ? (
							<TasteDetails exam={tasting.taste_olfactory_exam} />
						) : (
							<TasteUpdate
								tid={tasting.tid}
								setRefresh={setRefresh}
								setEditMode={setEditMode}
								exam={tasting.taste_olfactory_exam}
								sparkling={tasting.wine_category_name === "sparkling"}
							/>
						)}
					</Card.Content>
				</Card>

				<Card style={styles.card}>
					<Card.Content>
						<TastingCard
							name={"final"}
							editMode={editMode}
							setEditMode={setEditMode}
							subtitle={t("new.final.title")}
							uuid={tasting.final_considerations.eid}
						/>
						{!editMode["final"] ? (
							<FinalDetails exam={tasting.final_considerations} />
						) : (
							<FinalUpdate
								tid={tasting.tid}
								setRefresh={setRefresh}
								setEditMode={setEditMode}
								exam={tasting.final_considerations}
							/>
						)}
					</Card.Content>
				</Card>

				<Card style={styles.card}>
					<Card.Content>
						<TastingCard
							name={"scoring"}
							editMode={editMode}
							setEditMode={setEditMode}
							subtitle={t("new.scoring.title")}
							uuid={tasting.scoring_evaluation.sid}
						/>
						{!editMode["scoring"] ? (
							<ScoringDetails scoring={tasting.scoring_evaluation} />
						) : (
							<ScoringUpdate
								tid={tasting.tid}
								setRefresh={setRefresh}
								setEditMode={setEditMode}
								scoring={tasting.scoring_evaluation}
							/>
						)}
					</Card.Content>
				</Card>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
