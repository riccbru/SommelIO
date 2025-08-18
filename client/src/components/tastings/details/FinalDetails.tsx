import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

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
	const theme = useTheme();
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
			marginLeft: 10,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		notes: {
			marginTop: 10,
			color: theme.colors.primary,
		},
		notesRow: {
			marginTop: 8,
			paddingTop: 5,
			borderTopWidth: 1,
			borderTopColor: theme.colors.gray,
		},
		notesTitle: {
			marginTop: 10,
			marginBottom: 4,
			marginLeft: 10,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		notesText: {
			lineHeight: 20,
			marginLeft: 15,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	});

	const finalFields = [
		{
			label: t("new.final.evolution"),
			value: t(`new.final.values.evolution.${exam.evolutionary_state}`).toUpperCase(),
		},
		{
			label: t("new.harmony"),
			value: t(`new.final.values.harmony.${exam.harmony}`).toUpperCase(),
		},
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
					<Text style={styles.notesTitle}>{t("new.final.pairings")}</Text>
					<Text style={styles.notesText}>{exam.pairings}</Text>
				</View>
			)}

			{exam.notes && (
				<View style={styles.notes}>
					<Text style={styles.notesTitle}>{t("new.notes")}</Text>
					<Text style={styles.notesText}>{exam.notes}</Text>
				</View>
			)}
		</View>
	);
}
