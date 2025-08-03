import { useTheme } from "react-native-paper";
import { StyleSheet, TextInput } from "react-native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
}

export default function DateInput({ value, onChangeText }: Props) {

    const theme = useTheme();

    const styles = StyleSheet.create({
        input: {
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            color: "#000000",
            backgroundColor: theme.colors.pearl
        }
    });
    
    return (
        <TextInput
            value={value}
            style={styles.input}
            // keyboardType="numeric"
            placeholder="YYYY-MM-DD"
            onChangeText={onChangeText}
            placeholderTextColor={theme.colors.pearl}
        />
    );
}