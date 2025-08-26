import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { TAB_CONFIG } from "@/src/constants/tabConfig";
import AnimatedTabButton from "@/src/components/navigation/AnimatedTabButton";

export default function TabsLayout() {
	const theme = useTheme();
	const { t } = useTranslation();
	const iconColor = (focused: boolean) => (!focused ? theme.colors.primary : theme.colors.amber);
	const iconWeight = (title: string, focused: boolean) => {
		return !title || focused ? "fill" : "regular";
	};

	const getTitle = (key: string) => t(key);

	return (
		<Tabs
			screenOptions={({ route }) => {
				const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
				const Icon = config?.icon;
				return {
					headerTitle: getTitle(config?.title),
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
								{getTitle(config?.title)}
							</Text>
						),
					tabBarIcon: ({ focused }) => (
						<Icon
							color={iconColor(focused)}
							size={!getTitle(config.title).length ? 48 : 32}
							weight={iconWeight(config.title, focused)}
						/>
					),
					tabBarIconStyle: {
						marginTop: !config.title.length ? 8 : 1,
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
