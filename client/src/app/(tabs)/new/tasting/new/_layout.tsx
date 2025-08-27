import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
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
						name={el}
						key={index}
						options={{
							headerBackTitle: capitalizeFirst(t(`new.${el}.short`).toLowerCase()),
						}}
					/>
				);
			})}
		</Stack>
	);
}
