import { StyleSheet, Text, View } from "react-native";

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
			flex: 2,
			fontFamily: "Epilogue-Bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
			fontFamily: "Epilogue-Regular",
		},
		notesRow: {
			marginTop: 8,
			paddingTop: 5,
			borderTopWidth: 1,
			borderTopColor: "#000000",
		},
		totalText: {
			fontFamily: "Epilogue-Bold",
		},
		notes: {
			marginTop: 10,
		},
		notesTitle: {
			marginBottom: 4,
			fontFamily: "Epilogue-Bold",
		},
		notesText: {
			lineHeight: 20,
			fontFamily: "Epilogue-Regular",
		},
	});

	const scoringFields = [
		{ label: "Visual Appearance", value: scoring.visual_appearance },
		{ label: "Visual Color", value: scoring.visual_color },
		{ label: "Olfactory Intensity", value: scoring.olfactory_intensity },
		{ label: "Olfactory Complexity", value: scoring.olfactory_complexity },
		{ label: "Olfactory Quality", value: scoring.olfactory_quality },
		{ label: "Taste Structure", value: scoring.taste_structure },
		{ label: "Taste Balance", value: scoring.taste_balance },
		{ label: "Taste Intensity", value: scoring.taste_intensity },
		{ label: "Taste Persistence", value: scoring.taste_persistence },
		{ label: "Taste Quality", value: scoring.taste_quality },
		{ label: "Harmony", value: scoring.harmony },
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
				<Text style={[styles.label, styles.totalText]}>TOTAL SCORE</Text>
				<Text style={[styles.value, styles.totalText]}>{scoring.total_score}</Text>
			</View>

			{scoring.notes && (
				<View style={styles.notesRow}>
					<Text style={styles.notesTitle}>Notes</Text>
					<Text style={styles.notesText}>{scoring.notes}</Text>
				</View>
			)}
		</View>
	);
}
