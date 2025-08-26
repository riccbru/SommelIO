import React, { useState } from "react";
import { useTheme } from "@/src/hooks/useTheme";
import { InfoIcon } from "phosphor-react-native";
import { Switch, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";

type Props<T> = {
	label: string;
	name: keyof T;
	formData: T;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
	description?: string;
};

export default function FormSwitch<T extends Record<string, any>>({
	label,
	name,
	formData,
	setFormData,
	description
}: Props<T>) {
	const theme = useTheme();
	const isChecked = !!formData[name];
	const [modal, setModal] = useState(false);
	const toggle = () => setFormData(prev => ({ ...prev, [name]: !prev[name] }));

	const styles = StyleSheet.create({
		row: {
			marginTop: 8,
			marginBottom: 30,
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 16,
			justifyContent: "space-between",
		},
		info: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "flex-start"
		},
		text: {
			fontSize: 18,
			marginLeft: 5,
			marginTop: 3,
			fontFamily: "Epilogue-Regular",
			color: theme.dark ? "#c9c4cf" : "#565656",
		},
		modalDescription: {
			width: "80%",
			maxWidth: 300,
			borderWidth: 3,
			borderRadius: 15,
			borderColor: theme.colors.amber,
		},
		modalDescrOverlay: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "rgba(0,0,0,0.7)",
		}
	});

	return (
		<View>
			<View style={styles.row}>
				{!description ? (
					<Text style={styles.text}>{label}</Text>
				) : (
					<TouchableOpacity activeOpacity={0.5} onPress = { () => setModal(true) }>
						<View style = {styles.info}>
							<InfoIcon size={28} color={theme.colors.primary} />
							<Text style={styles.text}>{label}</Text>
						</View>
					</TouchableOpacity>
				)}
				<Switch value={isChecked} onChange={toggle} />
			</View>

			{description && <Modal	
				transparent
				visible={modal}
				animationType="fade"
				onRequestClose={() => setModal(false)}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.modalDescrOverlay}
					onPressOut={() => setModal(false)}
				>
					<View style={[styles.modalDescription, { backgroundColor: theme.colors.surface, padding: 20, borderRadius: 8 }]}>
						<Text style={{ fontSize: 20, fontFamily: "Epilogue-Bold", color: theme.colors.primary, marginBottom: 5 }}>
							{label}
						</Text>
						<Text style={{ fontSize: 16, fontFamily: "Epilogue-Regular", color: theme.colors.primary }}>
							{description}
						</Text>
					</View>
				</TouchableOpacity>
			</Modal>}
		</View>
	);
}
