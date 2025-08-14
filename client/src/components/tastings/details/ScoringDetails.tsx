// import { StyleSheet, Text, View } from "react-native";

// type ScoringEvaluation = {
// 	sid: string;
// 	visual_appearance: number;
// 	visual_color: number;
// 	olfactory_intensity: number;
// 	olfactory_complexity: number;
// 	olfactory_quality: number;
// 	taste_structure: number;
// 	taste_balance: number;
// 	taste_intensity: number;
// 	taste_persistence: number;
// 	taste_quality: number;
// 	harmony: number;
// 	notes: string;
// 	total_score: number;
// };

// type Props = {
// 	scoring: ScoringEvaluation;
// };

// export default function ScoringDetails({ scoring }: Props) {
// 	if (!scoring || Object.keys(scoring).length === 0) {
// 		return <Text>{}</Text>;
// 	}

// 	const rows = [
// 		["Visual Appearance", scoring.visual_appearance],
// 		["Visual Color", scoring.visual_color],
// 		["Olfactory Intensity", scoring.olfactory_intensity],
// 		["Olfactory Complexity", scoring.olfactory_complexity],
// 		["Olfactory Quality", scoring.olfactory_quality],
// 		["Taste Structure", scoring.taste_structure],
// 		["Taste Balance", scoring.taste_balance],
// 		["Taste Intensity", scoring.taste_intensity],
// 		["Taste Persistence", scoring.taste_persistence],
// 		["Taste Quality", scoring.taste_quality],
// 		["Harmony", scoring.harmony],
// 	];

// 	const styles = StyleSheet.create({
// 		row: {
// 			flexDirection: "row",
// 			marginBottom: 5,
// 		},
// 		label: {
// 			flex: 1,
// 			fontWeight: "bold",
// 		},
// 		value: {
// 			width: 60,
// 			textAlign: "right",
// 			marginRight: 10,
// 		},
// 		totalRow: {
// 			borderTopWidth: 1,
// 			borderTopColor: "#000",
// 			paddingTop: 5,
// 			marginTop: 5,
// 		},
// 		totalText: {
// 			fontWeight: "bold",
// 		},
// 	});

// 	return (
// 		<View>
// 			{rows.map(([label, value], index) => (
// 				<View key={index} style={styles.row}>
// 					<Text style={styles.label}>{label}</Text>
// 					<Text style={styles.value}>{value}</Text>
// 				</View>
// 			))}

// 			<View style={[styles.row, styles.totalRow]}>
// 				<Text style={[styles.label, styles.totalText]}>TOTAL SCORE</Text>
// 				<Text style={[styles.value, styles.totalText]}>{scoring.total_score}</Text>
// 			</View>

// 			{scoring.notes && (
// 				<View style={{ marginTop: 10 }}>
// 					<Text style={{ fontWeight: "bold", marginBottom: 4 }}>Notes</Text>
// 					<Text style={{ lineHeight: 20 }}>{scoring.notes}</Text>
// 				</View>
// 			)}
// 		</View>
// 	);
// }

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
			fontWeight: "bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
		},
		notesRow: {
			marginTop: 8,
			paddingTop: 5,
			borderTopWidth: 1,
			borderTopColor: "#000000",
		},
		totalText: {
			fontWeight: "bold",
		},
		notes: {
			marginTop: 10,
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
					<Text style={{ fontWeight: "bold", marginBottom: 4 }}>Notes</Text>
					<Text style={{ lineHeight: 20 }}>{scoring.notes}</Text>
				</View>
			)}
		</View>
	);
}
