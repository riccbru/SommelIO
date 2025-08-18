import { capitalizeFirst } from "@/src/utils/utils";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

export default function TastingsLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
					title: "New tasting",
				}}
			/>
			<Stack.Screen
				name='visual'
				options={{
					headerShown: true,
					presentation: "card",
					headerBackTitle: capitalizeFirst(t("new.tasting.short").toLowerCase()),
					title: "",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
			<Stack.Screen
				name='olfactory'
				options={{
					headerShown: true,
					presentation: "card",
					headerBackTitle: capitalizeFirst(t("new.visual.short").toLowerCase()),
					title: "",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
			<Stack.Screen
				name='taste'
				options={{
					headerShown: true,
					presentation: "card",
					headerBackTitle: capitalizeFirst(t("new.olfactory.short").toLowerCase()),
					title: "",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
			<Stack.Screen
				name='final'
				options={{
					headerShown: true,
					presentation: "card",
					headerBackTitle: capitalizeFirst(t("new.taste.short").toLowerCase()),
					title: "",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
			<Stack.Screen
				name='scoring'
				options={{
					headerShown: true,
					presentation: "card",
					headerBackTitle: capitalizeFirst(t("new.final.short").toLowerCase()),
					title: "",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
		</Stack>
	);
}
