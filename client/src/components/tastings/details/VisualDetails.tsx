import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
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
	const theme = useTheme();
	const { t } = useTranslation();

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

	const visualFields = [
		{
			label: t("new.visual.limpidity"),
			value: t(`new.visual.values.limpidity.${exam?.limpidity}`).toUpperCase(),
		},
		{
			label: t("new.visual.color"),
			value: t(`new.visual.values.color.${exam?.color_family}`).toUpperCase(),
		},
		{
			label: t("new.visual.shade"),
			value: t(`new.visual.values.shade.${exam?.color_shade}`).toUpperCase(),
		},
		{
			label: t("new.visual.consistency"),
			value: t(`new.visual.values.consistency.${exam?.consistency}`).toUpperCase(),
		},
		...(exam.bubble_size
			? [
					{
						label: t("new.visual.bubble_size"),
						value: t(`new.visual.values.bubble_size.${exam?.bubble_size}`).toUpperCase(),
					},
				]
			: []),
		...(exam.bubble_number
			? [
					{
						label: t("new.visual.bubble_number"),
						value: t(`new.visual.values.bubble_number.${exam?.bubble_number}`).toUpperCase(),
					},
				]
			: []),
		...(exam.bubble_persistence
			? [
					{
						label: t("new.visual.bubble_persistence"),
						value: t(
							`new.visual.values.bubble_persistence.${exam?.bubble_persistence}`
						).toUpperCase(),
					},
				]
			: []),
	];

	return (
		<View>
			{visualFields.map(({ label, value }) => (
				<View key={label} style={styles.row}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.value}>{!Object.keys(exam).length ? "-" : value}</Text>
				</View>
			))}

			<View style={styles.notesRow}>
				<Text style={styles.notesTitle}>Notes</Text>
				<Text style={styles.notesText}>{exam.notes || "-"}</Text>
			</View>
		</View>
	);
}
