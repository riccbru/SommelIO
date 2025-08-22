import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useData } from "@/src/hooks/useData";

type ScoringEvaluation = {
	sid: string;
	visual_appearance: number;
	visual_color: number;
	olfactory_intensity: number;
	olfactory_complexity: number;
	olfactory_quality: number;
	taste_structure: number;
	taste_balance: number;
	taste_intensity: number;
	taste_persistence: number;
	taste_quality: number;
	harmony: number;
	notes: string;
	total_score: number;
};

type Props = {
	scoring: ScoringEvaluation;
};

export default function ScoringDetails({ scoring }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const { coefficients } = useData();

	const styles = StyleSheet.create({
		row: {
			marginBottom: 5,
			alignItems: "center",
			flexDirection: "row",
		},
		label: {
			flex: 6,
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
		notesRow: {
			marginTop: 8,
			paddingTop: 5,
			borderTopWidth: 1,
			borderTopColor: theme.colors.gray,
		},
		totalText: {
			fontSize: 18,
			color: theme.colors.amber,
			fontFamily: "Epilogue-Bold",
		},
		notes: {
			marginTop: 10,
			color: theme.colors.primary,
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

	const scoringFields = [
		{
			label: t("new.scoring.Vappearance"),
			value: scoring.visual_appearance,
			coefficient: coefficients.visual_appearance,
		},
		{
			label: t("new.scoring.Vcolor"),
			value: scoring.visual_color,
			coefficient: coefficients.visual_color,
		},
		{
			label: t("new.scoring.Ointensity"),
			value: scoring.olfactory_intensity,
			coefficient: coefficients.olfactory_intensity,
		},
		{
			label: t("new.scoring.Ocomplexity"),
			value: scoring.olfactory_complexity,
			coefficient: coefficients.olfactory_complexity,
		},
		{
			label: t("new.scoring.Oquality"),
			value: scoring.olfactory_quality,
			coefficient: coefficients.olfactory_quality,
		},
		{
			label: t("new.scoring.Tstructure"),
			value: scoring.taste_structure,
			coefficient: coefficients.taste_structure,
		},
		{
			label: t("new.scoring.Tbalance"),
			value: scoring.taste_balance,
			coefficient: coefficients.taste_balance,
		},
		{
			label: t("new.scoring.Tintensity"),
			value: scoring.taste_intensity,
			coefficient: coefficients.taste_intensity,
		},
		{
			label: t("new.scoring.Tpersistence"),
			value: scoring.taste_persistence,
			coefficient: coefficients.taste_persistence,
		},
		{
			label: t("new.scoring.Tquality"),
			value: scoring.taste_quality,
			coefficient: coefficients.taste_quality,
		},
		{ label: t("new.harmony"), value: scoring.harmony, coefficient: coefficients.harmony },
	];

	return (
		<View>
			{scoringFields.map(({ label, value, coefficient }) => (
				<View key={label} style={styles.row}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.value}>{value ?? "-"}</Text>
					<Text
						style={[styles.value, { color: theme.colors.gray, fontFamily: "Epilogue-Bold" }]}
					>
						{coefficient !== 1 ? `(x ${coefficient})` : ""}
					</Text>
				</View>
			))}

			<View style={[styles.row, { marginTop: 8 }]}>
				<Text style={[styles.label, styles.totalText]}>{t("new.scoring.total")}</Text>
				<Text style={[styles.value, styles.totalText]}>{scoring.total_score || "?"}</Text>
				<Text style={[styles.value, styles.totalText]}>{""}</Text>
			</View>

			<View style={styles.notesRow}>
				<Text style={styles.notesTitle}>{t("new.notes")}</Text>
				<Text style={styles.notesText}>{scoring.notes || "-"}</Text>
			</View>
		</View>
	);
}
