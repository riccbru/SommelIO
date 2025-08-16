import React from "react";
import { Switch, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

type Props<T> = {
	label: string;
	name: keyof T;
	formData: T;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
};

export default function FormSwitch<T extends Record<string, any>>({
	label,
	name,
	formData,
	setFormData,
}: Props<T>) {
	const theme = useTheme();
	const isChecked = !!formData[name];
	const toggle = () => setFormData(prev => ({ ...prev, [name]: !prev[name] }));

	return (
		<View
			style={{
				marginTop: 8,
				marginBottom: 30,
				flexDirection: "row",
				alignItems: "center",
				paddingHorizontal: 16,
				justifyContent: "space-between",
			}}
		>
			<Text
				style={{
					fontSize: 18,
					fontFamily: "Epilogue-Regular",
					color: theme.dark ? "#c9c4cf" : "#565656",
				}}
			>
				{label}
			</Text>
			<Switch value={isChecked} onChange={toggle} />
		</View>
	);
}
