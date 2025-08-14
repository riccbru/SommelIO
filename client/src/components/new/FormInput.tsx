import { Text, View } from "react-native";
import { HelperText, TextInput, useTheme } from "react-native-paper";

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
	const theme = useTheme();
	return (
		<View>
			<TextInput
				mode='outlined'
				label={<Text style={{ fontFamily: "Epilogue-Regular" }}>{label}</Text>}
				value={value}
				error={!!error}
				keyboardType={keyboardType}
				onChangeText={text => onChange(field, text)}
			/>
			<HelperText type='error' visible={!!error} theme={theme.colors.red} style={{ fontFamily: "Epilogue-Bold" }}>
				{error}
			</HelperText>
		</View>
	);
}
