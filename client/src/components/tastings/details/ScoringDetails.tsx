import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

type ScoringEvaluation = {
	sid: string;
	visual_appearance: number;
	visual_color: number;
	olfactory_intensity: number;
	olfactory_complexity: number;
	olfactory_quality: number;
	taste_structure: number;
	taste_balance: number;
	taste_intensity: number;
	taste_persistence: number;
	taste_quality: number;
	harmony: number;
	notes: string;
	total_score: number;
};

type Props = {
	scoring: ScoringEvaluation;
};

export default function ScoringDetails({ scoring }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	if (!scoring || Object.keys(scoring).length === 0) {
		return <Text>{}</Text>;
	}

	const styles = StyleSheet.create({
		row: {
			marginBottom: 5,
			alignItems: "center",
			flexDirection: "row",
		},
		label: {
			flex: 3,
			marginLeft: 10,
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
			color: theme.colors.text,
			fontFamily: "Epilogue-Regular",
		},
		notesRow: {
			marginTop: 8,
			paddingTop: 5,
			borderTopWidth: 1,
			borderTopColor: theme.colors.gray,
		},
		totalText: {
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold",
		},
		notes: {
			marginTop: 10,
			color: theme.colors.text,
		},
		notesTitle: {
			marginTop: 10,
			marginLeft: 10,
			marginBottom: 4,
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold",
		},
		notesText: {
			lineHeight: 20,
			marginLeft: 15,
			color: theme.colors.text,
			fontFamily: "Epilogue-Regular",
		},
	});

	const scoringFields = [
		{ label: t("new.scoring.Vappearance"), value: scoring.visual_appearance },
		{ label: t("new.scoring.Vcolor"), value: scoring.visual_color },
		{ label: t("new.scoring.Ointensity"), value: scoring.olfactory_intensity },
		{ label: t("new.scoring.Ocomplexity"), value: scoring.olfactory_complexity },
		{ label: t("new.scoring.Oquality"), value: scoring.olfactory_quality },
		{ label: t("new.scoring.Tstructure"), value: scoring.taste_structure },
		{ label: t("new.scoring.Tbalance"), value: scoring.taste_balance },
		{ label: t("new.scoring.Tintensity"), value: scoring.taste_intensity },
		{ label: t("new.scoring.Tpersistence"), value: scoring.taste_persistence },
		{ label: t("new.scoring.Tquality"), value: scoring.taste_quality },
		{ label: t("new.harmony"), value: scoring.harmony },
	];

	return (
		<View>
			{scoringFields.map(({ label, value }) => (
				<View key={label} style={styles.row}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.value}>{value}</Text>
				</View>
			))}

			<View style={[styles.row, { marginTop: 8 }]}>
				<Text style={[styles.label, styles.totalText]}>{t("new.scoring.total")}</Text>
				<Text style={[styles.value, styles.totalText]}>{scoring.total_score}</Text>
			</View>

			{scoring.notes && (
				<View style={styles.notesRow}>
					<Text style={styles.notesTitle}>{t("new.notes")}</Text>
					<Text style={styles.notesText}>{scoring.notes}</Text>
				</View>
			)}
		</View>
	);
}
