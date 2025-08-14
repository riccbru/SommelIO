import { StyleSheet, Text, View } from "react-native";

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
	});

	const tastingFields = [
		{ label: "Category", value: tasting.wine_category_name.toUpperCase() },
		{ label: "Sample", value: tasting.sample_number ?? "-" },
		{ label: "Alcohol", value: tasting.alcohol_content },
		{ label: "Vintage", value: tasting.vintage },
		{ label: "Wine Temperature", value: tasting.wine_temperature },
		{ label: "Ambient Temperature", value: tasting.ambient_temperature },
		{ label: "Tasting Date", value: tasting.tasting_date },
		{ label: "Tasting Time", value: tasting.tasting_time },
		{ label: "Location", value: tasting.tasting_location.toUpperCase() },
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
