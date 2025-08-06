import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

type Props<T> = {
  label: string;
  field: keyof T;
  value: string;
  error?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "numbers-and-punctuation";
  onChange: (field: keyof T, value: string) => void;
};

export default function FormInput<T>({
  label,
  field,
  value,
  error,
  keyboardType = "default",
  onChange,
}: Props<T>) {
  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        error={!!error}
        keyboardType={keyboardType}
        onChangeText={(text) => onChange(field, text)}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </View>
  );
}
