import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";

export default function ColleaguesLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	const screenOptions = {
		headerStyle: {
			backgroundColor: theme.colors.background,
		}
	};

	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen
				name='index'
				options={{
					title: t("tabs.profile"),
					headerTitleStyle: {
						fontSize: 18,
						color: theme.colors.primary,
						fontFamily: "Epilogue-Bold",
					},
				}}
			/>
			<Stack.Screen
				name='blocked'
				options={{
					title: t("profile.blocked"),
					headerBackTitle: t("tastings.back"),
					headerTitleStyle: {
						fontSize: 18,
						color: theme.colors.primary,
						fontFamily: "Epilogue-Regular",
					},
				}}
			/>
		</Stack>
	);
}
