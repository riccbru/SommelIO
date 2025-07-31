import { Tabs } from "expo-router";
import { TAB_CONFIG } from "@/src/constants/tabConfig";
import { useTheme } from "react-native-paper";

export default function TabsLayout() {

    const theme = useTheme();
    const iconWeight = (focused: boolean) => (!focused ? "regular" : "fill");
    const iconColor = (focused: boolean) => (!focused ? theme.colors.background : theme.colors.amber);

    return(
        <Tabs
            screenOptions={
                ({ route }) => {
                    const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
                    const Icon = config?.icon;
                    return {
                        headerTitle: config?.title ?? route.name,
                        headerStyle: { backgroundColor: theme.colors.background },
                        headerTintColor: theme.colors.text,
                        tabBarStyle: {
                            paddingTop: 7,
                            backgroundColor: theme.colors.primary
                        },
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => (
                            <Icon size={32} color={iconColor(focused)} weight={iconWeight(focused)} />
                        )
                    }
                }
            }
        >
      {Object.keys(TAB_CONFIG).map((name) => (
        <Tabs.Screen key={name} name={name} />
      ))}
    </Tabs>
    );
}
