import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import { TAB_CONFIG } from "@/src/constants/tabConfig";
import AnimatedTabButton from "@/src/components/navigation/AnimatedTabButton";

export default function TabsLayout() {
	const theme = useTheme();
	const iconColor = (focused: boolean) => (!focused ? theme.colors.primary : theme.colors.amber);
	const iconWeight = (title: string, focused: boolean) => {
		return !title || focused ? "fill" : "regular";
	};

	return (
		<Tabs
			screenOptions={({ route }) => {
				const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
				const Icon = config?.icon;
				return {
					headerTitle: config.title,
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
					headerTintColor: theme.colors.primary,
					tabBarStyle: {
						paddingTop: 5,
						backgroundColor: theme.colors.background,
					},
					tabBarLabelStyle: ({ focused }: { focused: boolean }) => ({
						paddingTop: 5,
						fontFamily: "Epilogue-Regular",
						color: focused ? theme.colors.amber : theme.colors.primary,
					}),
					// tabBarLabel: "",
					tabBarLabel: ({ focused }) =>
						!config.title.length ? (
							<></>
						) : (
							<Text
								style={{
									fontSize: 12,
									paddingTop: 5,
									fontFamily: "Epilogue-Regular",
									color: focused ? theme.colors.amber : theme.colors.primary,
								}}
							>
								{config?.title}
							</Text>
						),
					tabBarIcon: ({ focused }) => (
						<Icon
							color={iconColor(focused)}
							size={!config.title.length ? 46 : 32}
							weight={iconWeight(config.title, focused)}
						/>
					),
					tabBarIconStyle: {
						marginTop: !config.title.length ? 5 : 3,
					},
					tabBarButton: (props: any) => <AnimatedTabButton {...props} />,
				};
			}}
		>
			{Object.keys(TAB_CONFIG).map(name => (
				<Tabs.Screen key={name} name={name} />
			))}
		</Tabs>
	);
}
