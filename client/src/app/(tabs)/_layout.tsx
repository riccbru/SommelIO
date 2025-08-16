import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { TAB_CONFIG } from "@/src/constants/tabConfig";
import AnimatedTabButton from "@/src/components/navigation/AnimatedTabButton";
import { Text } from "react-native";

export default function TabsLayout() {
	const theme = useTheme();
	const iconWeight = (focused: boolean) => (!focused ? "regular" : "fill");
	const iconColor = (focused: boolean) => (!focused ? theme.colors.primary : theme.colors.amber);

	return (
		<Tabs
			screenOptions={({ route }) => {
				const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
				const Icon = config?.icon;
				return {
					headerTitle: config?.title ?? route.name,
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
					headerTintColor: theme.colors.text,
					tabBarStyle: {
						paddingTop: 5,
						backgroundColor: theme.colors.background,
					},
					// tabBarLabel: "",
					tabBarLabel: config?.title,
					tabBarLabelStyle: {
						paddingTop: 5,
						fontFamily: "Epilogue-Regular",
						color: focused ? theme.colors.amber : theme.colors.primary,
					},
					tabBarIcon: ({ focused }) => (
						<Icon size={32} color={iconColor(focused)} weight={iconWeight(focused)} />
					),
					tabBarButton: props => <AnimatedTabButton {...props} />,
				};
			}}
		>
			{Object.keys(TAB_CONFIG).map(name => (
				<Tabs.Screen key={name} name={name} />
			))}
		</Tabs>
	);
}
