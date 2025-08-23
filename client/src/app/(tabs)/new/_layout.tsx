import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";

export default function NewLayout() {
	const theme = useTheme();
	const { t } = useTranslation();
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				title: t("tasting_name"),
				headerStyle: { backgroundColor: theme.colors.background },
				headerTitleStyle: {
					fontSize: 20,
					color: theme.colors.primary,
					fontFamily: "Epilogue-Bold",
				},
			}}
		>
			<Stack.Screen name='index' options={{ title: t("new.name") }} />
			<Stack.Screen name='todrink' options={{ title: "ToDrink" }} />
		</Stack>
	);
}
