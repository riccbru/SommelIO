import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

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
		},
		notesRow: {
			marginTop: 8,
			paddingTop: 5,
			borderTopWidth: 1,
			borderTopColor: theme.colors.gray,
		},
		notesTitle: {
			marginTop: 10,
			marginLeft: 10,
			marginBottom: 4,
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

	const tasteFields = [
		{
			label: t("new.taste.sweetness"),
			value: t(`new.taste.values.sweetness.${exam.sweetness}`).toUpperCase(),
		},
		{
			label: t("new.taste.alcohols"),
			value: t(`new.taste.values.alcohols.${exam.alcohols}`).toUpperCase(),
		},
		{
			label: t("new.taste.softness"),
			value: t(`new.taste.values.softness.${exam.softness}`).toUpperCase(),
		},
		{
			label: t("new.taste.acidity"),
			value: t(`new.taste.values.acidity.${exam.acidity}`).toUpperCase(),
		},
		{
			label: t("new.taste.tannicity"),
			value: t(`new.taste.values.tannicity.${exam.tannicity}`).toUpperCase(),
		},
		{
			label: t("new.taste.saltiness"),
			value: t(`new.taste.values.saltiness.${exam.saltiness}`).toUpperCase(),
		},
		{
			label: t("new.intensity"),
			value: t(`new.taste.values.intensity.${exam.intensity}`).toUpperCase(),
		},
		{
			label: t("new.taste.persistence"),
			value: t(`new.taste.values.persistence.${exam.persistence}`).toUpperCase(),
		},
		{
			label: t("new.quality"),
			value: t(`new.taste.values.quality.${exam.quality}`).toUpperCase(),
		},
		{
			label: t("new.taste.structure"),
			value: t(`new.taste.values.structure.${exam.structure}`).toUpperCase(),
		},
		{
			label: t("new.taste.balance"),
			value: t(`new.taste.values.balance.${exam.balance}`).toUpperCase(),
		},
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
