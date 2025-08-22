import { StyleSheet, TextInput } from "react-native";
import { HelperText, useTheme } from "react-native-paper";

type Props = {
	value: string;
	holder: string;
	isEmail?: boolean;
	error: string;
	onSubmit?: () => void;
	onChangeText: (text: string) => void;
};

export default function AuthInput({
	value,
	holder,
	isEmail,
	error,
	onSubmit,
	onChangeText,
}: Props) {
	const theme = useTheme();

	const styles = StyleSheet.create({
		input: {
			height: 56,
			padding: 16,
			borderRadius: 12,
			color: theme.colors.black,
			fontFamily: "Epilogue-Regular",
			backgroundColor: theme.colors.pearl,
		},
	});

	return (
		<>
			<TextInput
				value={value}
				style={styles.input}
				placeholder={holder}
				onSubmitEditing={onSubmit}
				onChangeText={onChangeText}
				keyboardType={isEmail ? "email-address" : "default"}
				placeholderTextColor={theme.colors.gray}
			/>
			<HelperText
				type='error'
				visible={!!error}
				theme={theme.colors.red}
				style={{ fontFamily: "Epilogue-Bold" }}
			>
				{error}
			</HelperText>
		</>
	);
}
