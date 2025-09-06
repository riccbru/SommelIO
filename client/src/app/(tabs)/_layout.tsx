import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { TAB_CONFIG } from "@/src/constants/tabConfig";
import AnimatedTabButton from "@/src/components/navigation/AnimatedTabButton";

export default function TabsLayout() {
	const theme = useTheme();
	const { t } = useTranslation();
	const getLabel = (key: string) => (key !== "tabs.new" ? t(key) : "");
	const iconColor = (focused: boolean) => (!focused ? theme.colors.primary : theme.colors.amber);
	const iconWeight = (title: string, focused: boolean) => {
		return !getLabel(title) || focused ? "fill" : "regular";
	};

	return (
		<Tabs
			screenOptions={({ route }) => {
				const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
				const Icon = config?.icon;
				return {
					headerShown: false,
					tabBarStyle: {
						paddingTop: 5,
						backgroundColor: theme.colors.background,
					},
					tabBarLabelStyle: {
						paddingTop: 5,
						fontFamily: "Epilogue-Regular",
					},
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
								{getLabel(config?.title)}
							</Text>
						),
					tabBarIconStyle: {
						marginTop: !getLabel(config.title) ? 8 : 1,
					},
					tabBarIcon: ({ focused }) => (
						<Icon
							color={iconColor(focused)}
							weight={iconWeight(config.title, focused)}
							size={!getLabel(config.title).length ? 48 : 32}
						/>
					),
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
