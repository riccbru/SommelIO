import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";

export default function ColleaguesLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: "",
					headerShown: true,
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
			<Stack.Screen
				name='[cid]'
				options={{
					title: "",
					headerShown: true,
					presentation: "card",
					headerBackTitle: t("tastings.back"),
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
					headerTitleStyle: {
						fontFamily: "Epilogue-Regular",
					},
				}}
			/>
		</Stack>
	);
}
