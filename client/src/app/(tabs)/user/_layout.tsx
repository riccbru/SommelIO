import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";

export default function ColleaguesLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	const screenOptions = {
		headerShown: true,
		headerStyle: {
			backgroundColor: theme.colors.background,
		},
		headerTitleStyle: {
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	};

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: "",
					...screenOptions,
				}}
			/>
			<Stack.Screen
				name='blocked'
				options={{
					title: "",
					presentation: "card",
					headerBackTitle: t("tastings.back"),
					...screenOptions,
				}}
			/>
		</Stack>
	);
}
