import WinesAPI from "@/src/services/wines";
import { XIcon } from "phosphor-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Modal, Portal, Text, TextInput, Divider, useTheme, HelperText } from "react-native-paper";

type NewWine = {
	denomination: string;
	winemaker: string;
	vintage: number;
};

const defaultNewWine: NewWine = {
	denomination: "",
	winemaker: "",
	vintage: 2025,
};

type Props = {
	visible: boolean;
	wines: any[];
	onDismiss: () => void;
	setRefresh: (refresh: boolean) => void;
};

export default function NewWineModal({ visible, wines, onDismiss, setRefresh }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<NewWine>(defaultNewWine);

	const styles = StyleSheet.create({
		modalContainer: {
			margin: 20,
			padding: 20,
			borderWidth: 2,
			borderRadius: 15,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		divider: {
			marginTop: 5,
			marginBottom: 20,
			backgroundColor: theme.colors.primary,
		},
		addButton: {
			height: 40,
			marginTop: 20,
			borderRadius: 15,
			marginBottom: 10,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.amber,
		},
		winesView: {
			marginVertical: 5,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
	});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.denomination.trim()) {
			newErrors.denomination = `${t("new.tasting.denomination")} ${t("new.required")}`;
		}

		if (!formData.winemaker.trim()) {
			newErrors.winemaker = `${t("new.tasting.winemaker")} ${t("new.required")}`;
		}

		if (!formData.vintage) {
			newErrors.vintage = `${t("new.tasting.vintage")} ${t("new.required")}`;
		} else if (!/^\d{4}$/.test(formData.vintage.toString().trim())) {
			newErrors.vintage = `${t("new.tasting.vintage")} must be 4 digits (YYYY)`;
		} else if (formData.vintage < 1000 || formData.vintage > 2025) {
			newErrors.vintage = `Vintage year must be in a reasonable range`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleAdd = async () => {
		if (!validateForm()) return;
		try {
			await WinesAPI.createWine(formData);
			setRefresh(prev => !prev);
			setFormData(defaultNewWine);
		} catch (error) {
			console.error(`Add failed: ${error}`);
		}
	};

	const handleDelete = async (wid: string) => {
		try {
			await WinesAPI.deleteWine(wid);
			setRefresh(prev => !prev);
		} catch (error) {
			console.error(`Delete failed: ${error}`);
		}
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDismiss}
				contentContainerStyle={styles.modalContainer}
			>
				<TextInput
					mode='outlined'
					value={formData.denomination}
					style={{ marginBottom: 5 }}
					label={t("new.tasting.denomination")}
					onChangeText={text => setFormData({ ...formData, denomination: text })}
				/>
				{!errors.denomination ? null : (
					<HelperText
						type='error'
						visible={!!errors.denomination}
						theme={theme.colors.red}
						style={{ fontFamily: "Epilogue-Bold" }}
					>
						{errors.denomination}
					</HelperText>
				)}

				<TextInput
					mode='outlined'
					value={formData.winemaker}
					style={{ marginBottom: 10 }}
					label={t("new.tasting.winemaker")}
					onChangeText={text => setFormData({ ...formData, winemaker: text })}
				/>
				{!errors.winemaker ? null : (
					<HelperText
						type='error'
						visible={!!errors.winemaker}
						theme={theme.colors.red}
						style={{ fontFamily: "Epilogue-Bold" }}
					>
						{errors.winemaker}
					</HelperText>
				)}

				<TextInput
					mode='outlined'
					keyboardType='numeric'
					value={formData.vintage.toString()}
					style={{ marginBottom: 10 }}
					label={t("new.tasting.vintage")}
					onChangeText={text => setFormData({ ...formData, vintage: Number(text) })} // Ensure vintage is always a string
				/>
				{!errors.vintage ? null : (
					<HelperText
						type='error'
						visible={!!errors.vintage}
						theme={theme.colors.red}
						style={{ fontFamily: "Epilogue-Bold" }}
					>
						{errors.vintage}
					</HelperText>
				)}

				<TouchableOpacity style={styles.addButton} onPress={handleAdd}>
					<Text style={{ fontFamily: "Epilogue-Regular", fontSize: 20 }}>
						{t("new.add_wine")}
					</Text>
				</TouchableOpacity>

				<Divider bold style={styles.divider} />

				<ScrollView style={{ maxHeight: 300 }}>
					{wines?.map((el, index) => (
						<View key={index} style={styles.winesView}>
							<View style={{ flexDirection: "row", alignItems: "center", flexShrink: 1 }}>
								<Text style={{ fontFamily: "Epilogue-Bold", marginRight: 8 }}>
									{index + 1}.
								</Text>
								<Text style={{ fontFamily: "Epilogue-Regular", flexShrink: 1 }}>
									{el.denomination} – {el.winemaker}, {el.vintage}
								</Text>
							</View>
							<TouchableOpacity activeOpacity={0.7} onPress={() => handleDelete(el.wid)}>
								<XIcon size={24} color={theme.colors.red} />
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</Modal>
		</Portal>
	);
}
