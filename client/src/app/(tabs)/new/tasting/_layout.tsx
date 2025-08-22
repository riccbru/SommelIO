import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { capitalizeFirst } from "@/src/utils/utils";

export default function NewTastingLayout() {
	const theme = useTheme();
	const { t } = useTranslation();
	const stacks = ["index", "visual", "olfactory", "taste", "final", "scoring"];
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				presentation: "card",
				headerStyle: { backgroundColor: theme.colors.background },
			}}
		>
			{stacks.map((el, index) => {
				return (
					<Stack.Screen
						key={index}
						name={el}
						options={{
							headerBackTitle: capitalizeFirst(t(`new.${el}.short`).toLowerCase()),
						}}
					/>
				);
			})}
		</Stack>
	);
}
