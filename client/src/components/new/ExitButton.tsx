import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { XCircleIcon } from "phosphor-react-native";
import { Button, useTheme } from "react-native-paper";

export default function ExitButton() {

    const theme = useTheme();
    const router = useRouter();

    const text = "EXIT EXAM";
    
    return (
        <View style={{ alignItems: "center", backgroundColor: theme.colors.background }}>
            <Button
                mode='text'
                onPress={() => router.replace("/(tabs)/tastings")}
                style={{ width: 150, marginTop: 20, marginBottom: 20, backgroundColor: theme.colors.red }}
                >
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <XCircleIcon size={24} style={{ marginRight: 5 }} color={"#000000"} />
                    <Text style={{ fontWeight: "bold", color: "#000000" }}>{text}</Text>
                </View>
            </Button>
        </View>
    );   
}
