import { View } from "react-native";
import { XCircleIcon } from "phosphor-react-native";
import { Button, useTheme } from "react-native-paper";

type Props<T> = {
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  defaultFormData: T;
};

export default function CancelButton({ setFormData, defaultFormData }: Props<T>) {

    const theme = useTheme();

    const handlePress = () => {
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
                    <XCircleIcon size={24} color={"#000000"} />
                </View>
            </Button>
        </View>
    );
}