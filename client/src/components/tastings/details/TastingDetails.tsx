import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

type Tasting = {
	wine_denomination: string;
	winemaker: string;
	favorite: boolean;
	wine_category_name: string;
	sample_number: string;
	alcohol_content: string;
	vintage: string;
	wine_temperature: string;
	ambient_temperature: string;
	tasting_date: string;
	tasting_time: string;
	tasting_location: string;
};

type Props = {
	tasting: Tasting;
};

export default function TastingDetails({ tasting }: Props) {
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
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
			color: theme.colors.text,
			fontFamily: "Epilogue-Regular",
		},
	});

	const tastingFields = [
		{ label: t("new.tasting.denomination"), value: tasting.wine_denomination },
		{ label: t("new.tasting.winemaker"), value: tasting.winemaker },
		{ label: t("new.tasting.category"), value: tasting.wine_category_name.toUpperCase() },
		{ label: t("new.tasting.sample"), value: tasting.sample_number ?? "-" },
		{ label: t("new.tasting.alcohol"), value: tasting.alcohol_content },
		{ label: t("new.tasting.vintage"), value: tasting.vintage },
		{ label: t("new.tasting.wine_temperature"), value: tasting.wine_temperature },
		{ label: t("new.tasting.ambient_temperature"), value: tasting.ambient_temperature },
		{ label: `${t("new.tasting.date")} (YYYY-MM-DD)`, value: tasting.tasting_date },
		{ label: `${t("new.tasting.time")} (HH:mm)`, value: tasting.tasting_time },
		{ label: t("new.tasting.location"), value: tasting.tasting_location.toUpperCase() },
	];

	return (
		<View>
			{tastingFields.map(({ label, value }) => (
				<View key={label} style={styles.row}>
					<Text style={styles.label}>{label}</Text>
					<Text style={styles.value}>{value}</Text>
				</View>
			))}
		</View>
	);
}
