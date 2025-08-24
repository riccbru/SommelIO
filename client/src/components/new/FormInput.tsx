import { Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";
import { HelperText, TextInput } from "react-native-paper";

type Props<T> = {
	label: string;
	field: keyof T;
	value: string;
	error?: string;
	keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "numbers-and-punctuation";
	onChange: (field: keyof T, value: string) => void;
	color?: string;
};

export default function FormInput<T>({
	label,
	field,
	value,
	error,
	keyboardType = "default",
	onChange,
	color,
}: Props<T>) {
	const theme = useTheme();
	return (
		<View>
			<TextInput
				mode='outlined'
				label={<Text style={{ color: color, fontFamily: "Epilogue-Regular" }}>{label}</Text>}
				value={value}
				error={!!error}
				style={{ height: 50 }}
				keyboardType={keyboardType}
				onChangeText={text => onChange(field, text)}
			/>
			<HelperText
				type='error'
				visible={!!error}
				theme={theme.colors.red}
				style={{ fontFamily: "Epilogue-Bold" }}
			>
				{error}
			</HelperText>
		</View>
	);
}
