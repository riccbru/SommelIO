import { StyleSheet, Text, View } from "react-native";
import { formatOption } from "@/src/utils/utils";

type FinalExam = {
	evolutionary_state: string;
	harmony: string;
	pairings: string;
	notes: string;
};

type Props = {
	exam: FinalExam;
};

export default function FinalDetails({ exam }: Props) {
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
			fontFamily: "Epilogue-Bold"
		},
		value: {
			flex: 1,
			textAlign: "center",
			fontFamily: "Epilogue-Regular"
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
		notesTitle: {
			marginBottom: 4,
			fontFamily: "Epilogue-Bold"
		},
		notesText: {
			lineHeight: 20,
			fontFamily: "Epilogue-Regular"
		}
	});

	const finalFields = [
		{ label: "Evolutionary State", value: formatOption(exam.evolutionary_state).toUpperCase() },
		{ label: "Harmony", value: formatOption(exam.harmony).toUpperCase() },
	];

	return (
		<View>
			{finalFields.map(({ label, value }) => (
				<View key={label} style={styles.row}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.value}>{value}</Text>
				</View>
			))}

			{exam.pairings && (
				<View style={styles.notesRow}>
					<Text style={styles.notesTitle}>Pairings</Text>
					<Text style={styles.notesText}>{exam.pairings}</Text>
				</View>
			)}

			{exam.notes && (
				<View style={styles.notes}>
					<Text style={styles.notesTitle}>Notes</Text>
					<Text style={styles.notesText}>{exam.notes}</Text>
				</View>
			)}
		</View>
	);
}
