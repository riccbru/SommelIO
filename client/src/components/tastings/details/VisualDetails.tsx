import { formatOption } from "@/src/utils/utils";
import { StyleSheet, Text, View } from "react-native";

type VisualExam = {
	limpidity: string;
	color_family: string;
	color_shade: string;
	consistency: string;
	bubble_size: string;
	bubble_number: string;
	bubble_persistence: string;
	notes: string;
};

type Props = {
	exam: VisualExam;
};

export default function VisualDetails({ exam }: Props) {
	if (!exam || Object.keys(exam).length === 0) {
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
		notes: {
			marginTop: 10,
		},
		notesRow: {
			marginTop: 8,
			paddingTop: 5,
			borderTopWidth: 1,
			borderTopColor: "#000000",
		},
	});

	const visualFields = [
		{ label: "Limpidity", value: formatOption(exam?.limpidity).toUpperCase() },
		{ label: "Color Family", value: formatOption(exam?.color_family).toUpperCase() },
		{ label: "Color Shade", value: formatOption(exam?.color_shade).toUpperCase() },
		{ label: "Consistency", value: formatOption(exam?.consistency).toUpperCase() },
		...(exam.bubble_size
			? [{ label: "Bubble Size", value: formatOption(exam?.bubble_size).toUpperCase() }]
			: []),
		...(exam.bubble_number
			? [{ label: "Bubble Number", value: formatOption(exam?.bubble_number).toUpperCase() }]
			: []),
		...(exam.bubble_persistence
			? [{ label: "Bubble Persistence", value: formatOption(exam?.bubble_persistence).toUpperCase() }]
			: []),
	];

	return (
		<View>
			{visualFields.map(({ label, value }) => (
				<View key={label} style={styles.row}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.value}>{value}</Text>
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
