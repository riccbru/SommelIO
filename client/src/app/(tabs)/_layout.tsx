import { Tabs } from "expo-router";
import { TAB_CONFIG } from "@/src/constants/tabConfig";

const focusedColor = "#b58638";
const iconWeight = (focused: boolean) => (!focused ? "regular" : "fill");
const iconColor = (focused: boolean) => (!focused ? "#000000" : focusedColor);

export default function TabsLayout() {
    return(
        <Tabs
            screenOptions={
                ({ route }) => {
                    const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];
                    const Icon = config?.icon;
                    return {
                        headerTitle: config?.title ?? route.name,
                        headerStyle: { backgroundColor: "#000000" },
                        headerTintColor: "#ffffff",
                        tabBarStyle: {
                            paddingTop: 7,
                            backgroundColor: "#ffffff"
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
