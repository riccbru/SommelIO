import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";

export default function NewLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	const screenOptions = {
		headerShown: true,
		title: t("tasting_name"),
		headerStyle: {
			backgroundColor: theme.colors.background
		},
		headerTitleStyle: {
			fontSize: 18,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		headerBackTitle: t("tastings.back")
	}

	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name='index' options={{ title: t("tabs.new") }} />
			<Stack.Screen name='todrink' options={{ title: "ToDrink" }} />
			<Stack.Screen
				name='tasting/old'
				options={{
					title: "",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='tasting/new'
				options={{
					title: "",
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
