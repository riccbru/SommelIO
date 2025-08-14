import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function TastingsLayout() {
	const theme = useTheme();

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
					title: "New tasting"
				}}
			/>
			<Stack.Screen
				name='visual'
				options={{
					headerShown: true,
					presentation: "card",
					headerBackTitle: "Description",
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
					headerBackTitle: "Visual",
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
					headerBackTitle: "Olfactory",
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
					headerBackTitle: "Taste",
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
					headerBackTitle: "Scoring",
					title: "",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
		</Stack>
	);
}
