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
				marginBottom: 20,
				flexDirection: "row",
				alignItems: "center",
				paddingHorizontal: 16,
				justifyContent: "space-between",
			}}
		>
			<Text style={{ fontSize: 18, color: "#c9c4cf" }}>{label}</Text>
			<Switch value={isChecked} onChange={toggle} />
		</View>
	);
}
