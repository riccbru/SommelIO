import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { TAB_CONFIG } from "@/src/constants/tabConfig";
import AnimatedTabButton from "@/src/components/navigation/AnimatedTabButton";
import { Text } from "react-native";

export default function TabsLayout() {
	const theme = useTheme();
	const iconColor = (focused: boolean) => (!focused ? theme.colors.primary : theme.colors.amber);
	const iconWeight = (base: "regular" | "light", focused: boolean) => (!focused ? base : "fill");

	return (
		<Tabs
			screenOptions={({ route }) => {
				const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
				const Icon = config?.icon;
				return {
					headerTitle: "",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
					headerTintColor: theme.colors.text,
					tabBarStyle: {
						paddingTop: 5,
						backgroundColor: theme.colors.background,
					},
					// tabBarLabel: "",
					// tabBarLabel: config?.title,
					// tabBarLabelStyle: ({focused}) => ({
					// 	paddingTop: 5,
					// 	color: focused ? theme.colors.amber : theme.colors.text,
					// 	fontFamily: "Epilogue-Regular"
					// }),
					tabBarLabel: ({ focused }) =>
						!config.title.length ? (
							<></>
						) : (
							<Text
								style={{
									fontSize: 12,
									paddingTop: 5,
									color: focused ? theme.colors.amber : theme.colors.text,
									fontFamily: focused ? "Epilogue-Bold" : "Epilogue-Regular",
								}}
							>
								{config?.title}
							</Text>
						),
					tabBarIcon: ({ focused }) => (
						<Icon
							size={!config.title.length ? 42 : 32}
							color={iconColor(focused)}
							weight={iconWeight(!config.title.length ? "light" : "regular", focused)}
						/>
					),
					tabBarIconStyle: {
						marginTop: !config.title.length ? 7 : 0,
					},
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
