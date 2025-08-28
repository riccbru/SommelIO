import ToDrink from "./ToDrink";
import { useState } from "react";
import Tastings from "./Tastings";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const renderScene = SceneMap({
	todrink: ToDrink,
	tastings: Tastings,
});

export default function TabViewWines() {
	const theme = useTheme();
	const { t } = useTranslation();
	const layout = useWindowDimensions();
	const { tab } = useLocalSearchParams();

	const initialIndex = tab === "tastings" ? 1 : 0;
	const [index, setIndex] = useState(initialIndex);

	const routes = [
		{ key: "todrink", title: "ToDrink" },
		{ key: "tastings", title: t("tastings_name") },
	];

	return (
		<TabView
			onIndexChange={setIndex}
			renderScene={renderScene}
			navigationState={{ index, routes }}
			initialLayout={{ width: layout.width }}
			style={{ backgroundColor: theme.colors.background }}
			renderTabBar={props => (
				<TabBar
					{...props}
					activeColor={theme.colors.primary}
					inactiveColor={theme.colors.primary}
					style={{ backgroundColor: theme.colors.background }}
					indicatorStyle={{ backgroundColor: theme.colors.primary }}
				/>
			)}
		/>
	);
}
