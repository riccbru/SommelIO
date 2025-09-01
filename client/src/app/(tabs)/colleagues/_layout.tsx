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
			fontSize: 18,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
	};

	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name='index' options={{ title: t("tabs.colleagues") }} />
			<Stack.Screen
				name='[cid]'
				options={{
					title: "",
					headerBackTitle: t("tastings.back"),
				}}
			/>
			<Stack.Screen
				name='notifications'
				options={{
					title: t("colleagues.notifications.title"),
					headerBackTitle: t("tastings.back"),
				}}
			/>
		</Stack>
	);
}
