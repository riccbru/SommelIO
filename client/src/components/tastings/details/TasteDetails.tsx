import { formatOption } from "@/src/utils/utils";
import { StyleSheet, Text, View } from "react-native";

type TasteExam = {
	sweetness: string;
	alcohols: string;
	softness: string;
	acidity: string;
	tannicity: string;
	saltiness: string;
	balance: string;
	intensity: string;
	persistence: string;
	quality: string;
	structure: string;
	notes: string;
};

type Props = {
	exam: TasteExam;
};

export default function TasteDetails({ exam }: Props) {
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

	const tasteFields = [
		{ label: "Sweetness", value: formatOption(exam.sweetness).toUpperCase() },
		{ label: "Alcohols", value: formatOption(exam.alcohols).toUpperCase() },
		{ label: "Softness", value: formatOption(exam.softness).toUpperCase() },
		{ label: "Acidity", value: formatOption(exam.acidity).toUpperCase() },
		{ label: "Tannicity", value: formatOption(exam.tannicity).toUpperCase() },
		{ label: "Saltiness", value: formatOption(exam.saltiness).toUpperCase() },
		{ label: "Intensity", value: formatOption(exam.intensity).toUpperCase() },
		{ label: "Persistence", value: formatOption(exam.persistence).toUpperCase() },
		{ label: "Quality", value: formatOption(exam.quality).toUpperCase() },
		{ label: "Structure", value: formatOption(exam.structure).toUpperCase() },
		{ label: "Balance", value: formatOption(exam.balance).toUpperCase() },
	];

	return (
		<View>
			{tasteFields.map(({ label, value }) => (
				<View key={label} style={styles.row}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.value}>{value}</Text>
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
