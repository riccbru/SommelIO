import { List } from "react-native-paper";
import WinesAPI from "@/src/services/wines";
import { XIcon } from "phosphor-react-native";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Wine = {
	wid: string;
	denomination: string;
	winemaker: string;
	vintage: number;
};

type Props = {
	wines: Wine[];
	searchQuery: string;
};

export default function ToDrinkList({ wines, searchQuery }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const { refreshWines } = useData();

	const styles = StyleSheet.create({
		emptyText: {
			fontSize: 16,
			marginTop: 50,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	});

	const handleDelete = async (wid: string) => {
		try {
			await WinesAPI.deleteWine(wid);
			refreshWines();
		} catch (error) {
			console.error(`Delete failed: ${error}`);
		}
	};

	const filteredWines = wines.filter(wine => {
		const query = searchQuery.toLowerCase();
		return (
			wine.winemaker.toLowerCase().includes(query) ||
			wine.denomination.toLowerCase().includes(query)
		);
	});

	if (!filteredWines.length) {
		return <Text style={styles.emptyText}>{t("wine_notFound")}</Text>;
	}

	return (
		<List.Section>
			{filteredWines.map((wine, index) => (
				<List.Item
					key={index}
					title={`${wine.winemaker}`}
					titleStyle={{ fontFamily: "Epilogue-Bold", marginBottom: 10 }}
					description={`${wine.denomination}, ${wine.vintage}`}
					descriptionStyle={{ fontSize: 15, fontFamily: "Epilogue-Regular" }}
					left={props => (
						<View style={{ marginLeft: 25, marginTop: 10 }}>
							<Text
								style={{
									fontSize: 20,
									color: theme.colors.primary,
									fontFamily: "Epilogue-Bold",
								}}
							>{`${index + 1}.`}</Text>
						</View>
					)}
					right={props => (
						<View style={{ marginLeft: 0, marginTop: 5, marginRight: 0 }}>
							<TouchableOpacity activeOpacity={0.7} onPress={() => handleDelete(wine.wid)}>
								<XIcon size={32} color={theme.colors.red} />
							</TouchableOpacity>
						</View>
					)}
				/>
			))}
		</List.Section>
	);
}
