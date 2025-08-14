// import { StyleSheet, Text, View } from "react-native";
// import { formatOption } from "@/src/utils/utils";

// type OlfactoryExam = {
// 	intensity: string;
// 	complexity: string;
// 	quality: string;
// 	description: {
// 		quality: string;
// 		aromatic: boolean;
// 		vinous: boolean;
// 		floral: boolean;
// 		fruity: boolean;
// 		grassy: boolean;
// 		mineral: boolean;
// 		fragrant: boolean;
// 		spicy: boolean;
// 		toasted: boolean;
// 		ethereal: boolean;
// 	};
// 	notes: string;
// };

// type Props = {
// 	exam: OlfactoryExam;
// };

// export default function OlfactoryDetails({ exam }: Props) {
// 	if (!exam || Object.keys(exam).length === 0) {
// 		console.log(exam);
// 		return <Text>{}</Text>;
// 	}

// 	const styles = StyleSheet.create({
// 		row: {
// 			marginBottom: 5,
// 			flexDirection: "row",
// 			alignItems: "center",
// 		},
// 		label: {
// 			flex: 1,
// 			fontWeight: "bold",
// 		},
// 		value: {
// 			flex: 1,
// 			textAlign: "center",
// 		},
// 		notes: {
// 			marginTop: 10,
// 		},
// 		notesRow: {
// 			marginTop: 8,
// 			paddingTop: 5,
// 			borderTopWidth: 1,
// 			borderTopColor: "#000000",
// 		},
// 	});

// 	const booleanFields = [
// 		{ label: "Aromatic", value: exam.description.aromatic },
// 		{ label: "Vinous", value: exam.description.vinous },
// 		{ label: "Floral", value: exam.description.floral },
// 		{ label: "Fruity", value: exam.description.fruity },
// 		{ label: "Grassy", value: exam.description.grassy },
// 		{ label: "Mineral", value: exam.description.mineral },
// 		{ label: "Fragrant", value: exam.description.fragrant },
// 		{ label: "Spicy", value: exam.description.spicy },
// 		{ label: "Toasted", value: exam.description.toasted },
// 		{ label: "Ethereal", value: exam.description.ethereal },
// 	];

// 	return (
// 		<View>
// 			<View style={styles.row}>
// 				<Text style={styles.label}>Intensity</Text>
// 				<Text style={styles.value}>{formatOption(exam.intensity).toUpperCase()}</Text>
// 			</View>
// 			<View style={styles.row}>
// 				<Text style={styles.label}>Complexity</Text>
// 				<Text style={styles.value}>{formatOption(exam.complexity).toUpperCase()}</Text>
// 			</View>
// 			<View style={styles.row}>
// 				<Text style={styles.label}>Quality</Text>
// 				<Text style={styles.value}>{formatOption(exam.quality).toUpperCase()}</Text>
// 			</View>

// 			{booleanFields.map(({ label, value }) => (
// 				<View key={label} style={styles.row}>
// 					<Text style={styles.label}>{label}</Text>
// 					<Text style={styles.value}>{value ? "X" : ""}</Text>
// 				</View>
// 			))}
// 			{exam.notes && (
// 				<View style={styles.notesRow}>
// 					<Text style={{ fontWeight: "bold", marginBottom: 4 }}>Notes</Text>
// 					<Text style={{ lineHeight: 20 }}>{exam.notes}</Text>
// 				</View>
// 			)}
// 		</View>
// 	);
// }

import { StyleSheet, Text, View } from "react-native";
import { formatOption } from "@/src/utils/utils";

type OlfactoryExam = {
	intensity: string;
	complexity: string;
	quality: string;
	description: {
		quality: string;
		aromatic: boolean;
		vinous: boolean;
		floral: boolean;
		fruity: boolean;
		grassy: boolean;
		mineral: boolean;
		fragrant: boolean;
		spicy: boolean;
		toasted: boolean;
		ethereal: boolean;
	};
	notes: string;
};

type Props = {
	exam: OlfactoryExam;
};

export default function OlfactoryDetails({ exam }: Props) {
	if (!exam || Object.keys(exam).length === 0) {
		console.log(exam);
		return <Text>{}</Text>;
	}

	const styles = StyleSheet.create({
		row: {
			marginBottom: 5,
			flexDirection: "row",
			alignItems: "center",
		},
		label: {
			flex: 1,
			fontWeight: "bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
		},
		descriptorsHeader: {
			fontWeight: "bold",
			marginTop: 10,
			marginBottom: 5,
		},
		descriptorRow: {
			marginBottom: 3,
			paddingLeft: 25,
			flexDirection: "row",
			alignItems: "center",
		},
		descriptorLabel: {
			flex: 1,
			fontWeight: "bold",
		},
		descriptorValue: {
			flex: 1,
			textAlign: "center",
		},
		notes: {
			marginTop: 10,
		},
		notesRow: {
			marginTop: 15,
			paddingTop: 10,
			borderTopWidth: 1,
			borderTopColor: "#000000",
		},
	});

	const booleanFields = [
		{ label: "Aromatic", value: exam.description.aromatic },
		{ label: "Vinous", value: exam.description.vinous },
		{ label: "Floral", value: exam.description.floral },
		{ label: "Fruity", value: exam.description.fruity },
		{ label: "Grassy", value: exam.description.grassy },
		{ label: "Mineral", value: exam.description.mineral },
		{ label: "Fragrant", value: exam.description.fragrant },
		{ label: "Spicy", value: exam.description.spicy },
		{ label: "Toasted", value: exam.description.toasted },
		{ label: "Ethereal", value: exam.description.ethereal },
	];

	return (
		<View>
			<View style={styles.row}>
				<Text style={styles.label}>Intensity</Text>
				<Text style={styles.value}>{formatOption(exam.intensity).toUpperCase()}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Complexity</Text>
				<Text style={styles.value}>{formatOption(exam.complexity).toUpperCase()}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Quality</Text>
				<Text style={styles.value}>{formatOption(exam.quality).toUpperCase()}</Text>
			</View>

			<Text style={styles.descriptorsHeader}>Descriptors</Text>
			{booleanFields.map(({ label, value }) => (
				<View key={label} style={styles.descriptorRow}>
					<Text style={styles.descriptorLabel}>{label}</Text>
					<Text style={styles.descriptorValue}>{value ? "X" : "-"}</Text>
				</View>
			))}

			{exam.notes && (
				<View style={styles.notesRow}>
					<Text style={{ fontWeight: "bold", marginBottom: 4 }}>Notes</Text>
					<Text style={{ lineHeight: 20 }}>{exam.notes}</Text>
				</View>
			)}
		</View>
	);
}
