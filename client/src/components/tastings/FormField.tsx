import React from "react";
import { TextInput, HelperText } from "react-native-paper";
import { View } from "react-native";

type Props = {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	error?: string;
	keyboardType?: "default" | "numeric";
};

export default function FormField({ label, value, onChangeText, error, keyboardType }: Props) {
	return (
		<>
			<TextInput
				label={label}
				value={value}
				mode='outlined'
				keyboardType={keyboardType}
				onChangeText={onChangeText}
			/>
			{!error && <View style={{ height: 28 }} />}
			{!error ? null : (
				<HelperText visible type='error' style={{ fontFamily: "Epilogue-Bold" }}>
					{error}
				</HelperText>
			)}
		</>
	);
}
