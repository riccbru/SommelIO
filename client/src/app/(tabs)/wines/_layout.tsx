import { Stack } from "expo-router";
import { useTheme } from "@/src/hooks/useTheme";
import { useTranslation } from "react-i18next";

export default function TastingsLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: "",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='[tid]'
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
