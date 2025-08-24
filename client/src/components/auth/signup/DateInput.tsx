import { useTheme } from "@/src/hooks/useTheme";
import { HelperText } from "react-native-paper";
import { StyleSheet, TextInput } from "react-native";

type Props = {
	value: string;
	error: string;
	onChangeText: (text: string) => void;
};

export default function DateInput({ value, error, onChangeText }: Props) {
	const theme = useTheme();

	const styles = StyleSheet.create({
		input: {
			padding: 16,
			borderRadius: 12,
			color: "#000000",
			backgroundColor: theme.colors.pearl,
		},
	});

	return (
		<>
			<TextInput
				value={value}
				style={styles.input}
				placeholder='YYYY-MM-DD'
				onChangeText={onChangeText}
				keyboardType='numbers-and-punctuation'
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
