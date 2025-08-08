import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { XCircleIcon } from "phosphor-react-native";
import { Button, useTheme } from "react-native-paper";

type Props<T> = {
    defaultFormData: T;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function ExitButton({ defaultFormData, setFormData, setErrors }: Props<T>) {

    const theme = useTheme();
    const router = useRouter();

    const text = "EXIT EXAM";
    const handlePress = () => {
        setErrors({});
        setFormData(defaultFormData);
        router.replace("/(tabs)/tastings");
    }
    
    return (
        <View style={{ alignItems: "center", backgroundColor: theme.colors.background }}>
            <Button
                mode='text'
                onPress={handlePress}
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
