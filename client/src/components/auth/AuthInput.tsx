import { useTheme } from "react-native-paper";
import { StyleSheet, TextInput } from "react-native";

type Props = {
  value: string;
  holder: string;
  onChangeText: (text: string) => void;
};

export default function AuthInput({ value, holder, onChangeText }: Props) {

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
      placeholder={holder}
      onChangeText={onChangeText}
      placeholderTextColor={theme.colors.gray}
    />
  );
}
