import { Tabs } from "expo-router";
import { FilePlus, House, User, Users, Wine } from 'phosphor-react-native';

export default function TabsLayout() {
  return(
    <Tabs
        screenOptions={{
            headerStyle: {
                backgroundColor: "#000000",
            },
            headerTintColor: "#ffffff",
            tabBarStyle: {
                backgroundColor: "#ffffff",
            }
        }}
    >
        <Tabs.Screen name="index" options={{
            headerTitle: "Welcome",
            tabBarLabel: "",
            tabBarIcon: ({focused, color}) => <House size={30} weight={!focused ? "regular" : "fill"} />
        }} />
        <Tabs.Screen name="Friends" options={{
            headerTitle: "",
            tabBarLabel: "",
            tabBarIcon: ({focused, color}) => <Users size={30} weight={!focused ? "regular" : "fill"} />
        }} />
        <Tabs.Screen name="Add" options={{
            headerTitle: "Nuova Degustazione",
            tabBarLabel: "",
            tabBarIcon: ({focused, color}) => <FilePlus size={30} weight={!focused ? "regular" : "fill"} />
        }} />
        <Tabs.Screen name="Tastings" options={{
            headerTitle: "",
            tabBarLabel: "",
            tabBarIcon: ({focused, color}) => <Wine size={30} weight={!focused ? "regular" : "fill"} />
        }} />
        <Tabs.Screen name="User" options={{
            headerTitle: "Profilo",
            tabBarLabel: "",
            tabBarIcon: ({focused, color}) => <User size={30} weight={!focused ? "regular" : "fill"} />
        }} />
    </Tabs>
  );
}
