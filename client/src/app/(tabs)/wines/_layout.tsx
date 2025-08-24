import { Stack } from "expo-router";
import { useTheme } from "@/src/hooks/useTheme";

export default function TastingsLayout() {
	const theme = useTheme();

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
					headerShown: true,
					presentation: "card",
					headerBackTitle: "",
					title: "",
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
