import { formatOption } from "@/src/utils/utils";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
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
			fontFamily: "Epilogue-Bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
			fontFamily: "Epilogue-Regular",
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
			fontFamily: "Epilogue-Bold",
		},
		notesText: {
			lineHeight: 20,
			fontFamily: "Epilogue-Regular",
		},
	});

	const visualFields = [
		{ label: t("new.visual.limpidity"), value: formatOption(exam?.limpidity).toUpperCase() },
		{ label: t("new.visual.color"), value: formatOption(exam?.color_family).toUpperCase() },
		{ label: t("new.visual.shade"), value: formatOption(exam?.color_shade).toUpperCase() },
		{ label: t("new.visual.consistency"), value: formatOption(exam?.consistency).toUpperCase() },
		...(exam.bubble_size
			? [
					{
						label: t("new.visual.bubble_size"),
						value: formatOption(exam?.bubble_size).toUpperCase(),
					},
				]
			: []),
		...(exam.bubble_number
			? [
					{
						label: t("new.visual.bubble_number"),
						value: formatOption(exam?.bubble_number).toUpperCase(),
					},
				]
			: []),
		...(exam.bubble_persistence
			? [
					{
						label: t("new.visual.bubble_persistence"),
						value: formatOption(exam?.bubble_persistence).toUpperCase(),
					},
				]
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
					<Text style={styles.notesTitle}>Notes</Text>
					<Text style={styles.notesText}>{exam.notes}</Text>
				</View>
			)}
		</View>
	);
}
