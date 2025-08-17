import { useRouter } from "expo-router";
import { List, useTheme } from "react-native-paper";
import { capitalizeFirst, formatDescription } from "@/src/utils/utils";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FileMagnifyingGlassIcon, FileTextIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import i18n from "@/src/locales/i18n";

type Props = {
	searchQuery: string;
	tastings: Tasting[];
};

export default function TastingsList({ searchQuery, tastings }: Props) {
	const theme = useTheme();
	const router = useRouter();
	const {t} = useTranslation();

	const styles = StyleSheet.create({
		row: {
			marginBottom: 8,
			flexDirection: "row",
			alignItems: "center",
		},
		iconContainer: {
			width: 50,
			height: 50,
			marginLeft: 5,
			borderRadius: 5,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.pearl,
		},
		accordionTrigger: {
			flex: 1,
			marginLeft: 5,
			marginRight: 5,
			color: theme.colors.text,
			fontFamily: "Epilogue-Regular",
		},
		accordionBody: {
			marginLeft: 20,
			marginRight: 35,
			backgroundColor: theme.colors.background,
		},
		accordionRow: {
			marginVertical: 3,
			flexDirection: "row",
			justifyContent: "space-between",
		},
		textLabel: {
			fontSize: 13,
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold",
		},
		textValue: {
			fontSize: 14,
			color: theme.colors.text,
			fontFamily: "Epilogue-Regular",
		},
	});

	const handlePress = (tasting: Tasting) => {
		router.push(`/tastings/${tasting.tid}`);
	};

	return (
		<List.Section>
			{tastings
				.filter(tasting => {
					const query = searchQuery.toLowerCase();
					return (
						tasting.winemaker.toLowerCase().includes(query) ||
						tasting.wine_denomination.toLowerCase().includes(query)
					);
				})
				.map((tasting, index) => (
					<View key={index} style={styles.row}>
						{/* <View style={styles.iconContainer}>
							<Button onPress={() => handlePress(t)}>
							<FileTextIcon size={32} />
							<FileMagnifyingGlassIcon size={32} />
							</Button>
							</View> */}
						<TouchableOpacity style={styles.iconContainer} onPress={() => handlePress(tasting)}>
							<FileTextIcon size={32} />
						</TouchableOpacity>

						<View style={styles.accordionTrigger}>
							<List.Accordion
								title={
									<Text style={{ fontFamily: "Epilogue-Regular" }}>
										{`${capitalizeFirst(tasting.winemaker)} - ${tasting.wine_denomination.toUpperCase()}`}
									</Text>
								}
								description={formatDescription(
									i18n.language,
									tasting.tasting_date,
									tasting.tasting_time,
									tasting.tasting_location
								)}
							>
								<View style={styles.accordionBody}>
									<View style={styles.accordionRow}>
										<Text style={styles.textLabel}>{t("new.tasting.vintage")}</Text>
										<Text style={styles.textValue}>{tasting.vintage}</Text>
									</View>
									<View style={styles.accordionRow}>
										<Text style={styles.textLabel}>{t("new.tasting.sample")}</Text>
										<Text style={styles.textValue}>{tasting.sample_number}</Text>
									</View>
									<View style={styles.accordionRow}>
										<Text style={styles.textLabel}>{t("new.tasting.alcohol")}</Text>
										<Text style={styles.textValue}>{tasting.alcohol_content}</Text>
									</View>
									<View style={styles.accordionRow}>
										<Text style={styles.textLabel}>{t("new.tasting.wine_temperature")}</Text>
										<Text style={styles.textValue}>{tasting.wine_temperature}</Text>
									</View>
									<View style={styles.accordionRow}>
										<Text style={styles.textLabel}>{t("new.tasting.ambient_temperature")}</Text>
										<Text style={styles.textValue}>{tasting.ambient_temperature}</Text>
									</View>
								</View>
							</List.Accordion>
						</View>
					</View>
				))}
		</List.Section>
	);
}
