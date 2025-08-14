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
			fontFamily: "Epilogue-Bold"
		},
		value: {
			flex: 1,
			textAlign: "center",
			fontFamily: "Epilogue-Regular"
		},
		descriptorsHeader: {
			marginTop: 10,
			marginBottom: 5,
			fontFamily: "Epilogue-Bold"
		},
		descriptorRow: {
			marginBottom: 3,
			paddingLeft: 25,
			flexDirection: "row",
			alignItems: "center",
		},
		descriptorLabel: {
			flex: 1,
			fontFamily: "Epilogue-Bold"
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
		notesTitle: {
			marginBottom: 4,
			fontFamily: "Epilogue-Bold"
		},
		notesText: {
			lineHeight: 20,
			fontFamily: "Epilogue"
		}
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
					<Text style={styles.notesTitle}>Notes</Text>
					<Text style={styles.notesText}>{exam.notes}</Text>
				</View>
			)}
		</View>
	);
}
