import { formatOption } from "@/src/utils/utils";
import { useTranslation } from "react-i18next";
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

	const {t} = useTranslation();
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

	const tasteFields = [
		{ label: t("new.taste.sweetness"), value: formatOption(exam.sweetness).toUpperCase() },
		{ label: t("new.taste.alcohols"), value: formatOption(exam.alcohols).toUpperCase() },
		{ label: t("new.taste.softness"), value: formatOption(exam.softness).toUpperCase() },
		{ label: t("new.taste.acidity"), value: formatOption(exam.acidity).toUpperCase() },
		{ label: t("new.taste.tannicity"), value: formatOption(exam.tannicity).toUpperCase() },
		{ label: t("new.taste.saltiness"), value: formatOption(exam.saltiness).toUpperCase() },
		{ label: t("new.intensity"), value: formatOption(exam.intensity).toUpperCase() },
		{ label: t("new.taste.persistence"), value: formatOption(exam.persistence).toUpperCase() },
		{ label: t("new.quality"), value: formatOption(exam.quality).toUpperCase() },
		{ label: t("new.taste.structure"), value: formatOption(exam.structure).toUpperCase() },
		{ label: t("new.taste.balance"), value: formatOption(exam.balance).toUpperCase() },
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
					<Text style={styles.notesTitle}>{t("new.notes")}</Text>
					<Text style={styles.notesText}>{exam.notes}</Text>
				</View>
			)}
		</View>
	);
}
