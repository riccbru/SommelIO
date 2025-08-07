import { View } from "react-native";
import { TrashIcon } from "phosphor-react-native";
import { Button, useTheme } from "react-native-paper";

type Props<T> = {
    defaultFormData: T;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function CancelButton({ defaultFormData, setFormData, setErrors }: Props<T>) {

    const theme = useTheme();

    const handlePress = () => {
        setErrors({});
        setFormData(defaultFormData);
    }

    return (
        <View style={{ alignItems: "center" }}>
            <Button
                mode='contained'
                onPress={handlePress}
                style={{
                    width: 40,
                    marginRight: 25,
                    marginBottom: 15,
                    borderRadius: 20,
                    backgroundColor: theme.colors.red

                }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5
                }}>
                    <TrashIcon size={24} color={"#000000"} />
                </View>
            </Button>
        </View>
    );
}