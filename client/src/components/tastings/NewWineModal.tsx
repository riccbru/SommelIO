import { useState } from "react";
import FormField from "./FormField";
import WinesAPI from "@/src/services/wines";
import { XIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { Modal, Portal, Text, Divider, useTheme } from "react-native-paper";
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type NewWine = {
	denomination: string;
	winemaker: string;
	vintage: number;
};

const defaultNewWine: NewWine = {
	denomination: "",
	winemaker: "",
	vintage: 0,
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
			marginTop: 10,
			marginBottom: 10,
			backgroundColor: theme.colors.primary,
		},
		addButton: {
			height: 40,
			marginTop: 10,
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

	const handleDismiss = () => {
		onDismiss();
		setFormData(defaultNewWine);
		setErrors({});
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
				onDismiss={handleDismiss}
				contentContainerStyle={styles.modalContainer}
			>
				<Text
					style={{
						fontSize: 22,
						fontFamily: "Epilogue-Bold",
						marginBottom: 16,
						textAlign: "center",
					}}
				>
					{t("todrink")}
				</Text>
				<FormField
					keyboardType='default'
					error={errors.denomination}
					value={formData.denomination}
					label={t("new.tasting.denomination")}
					onChangeText={text => setFormData({ ...formData, denomination: text })}
				/>

				<FormField
					keyboardType='default'
					error={errors.winemaker}
					value={formData.winemaker}
					label={t("new.tasting.winemaker")}
					onChangeText={text => setFormData({ ...formData, winemaker: text })}
				/>

				<FormField
					keyboardType='numeric'
					error={errors.vintage}
					value={formData.vintage !== 0 ? `${formData.vintage}` : ""}
					label={`${t("new.tasting.vintage")} (YYYY)`}
					onChangeText={text => setFormData({ ...formData, vintage: Number(text) })}
				/>

				<TouchableOpacity style={styles.addButton} onPress={handleAdd}>
					<Text style={{ fontFamily: "Epilogue-Regular", fontSize: 20 }}>
						{t("new.add_wine")}
					</Text>
				</TouchableOpacity>

				<Divider bold style={styles.divider} />

				<ScrollView
					style={{ maxHeight: 300 }}
					refreshControl={
						<RefreshControl refreshing={false} onRefresh={() => setRefresh(prev => !prev)} />
					}
				>
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
