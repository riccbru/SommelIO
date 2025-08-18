import React, { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import FormInput from "../../new/FormInput";
import FormSelect from "../../new/FormSelect";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { PencilSimpleIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FinalExam = {
	evolutionary_state: string;
	harmony: string;
	pairings: string;
	notes: string;
};

type Props = {
	tid: string;
	exam: FinalExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

export default function FinalUpdate({ tid, exam, setRefresh, setEditMode }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const [formData, setFormData] = useState<FinalExam>(exam);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const styles = StyleSheet.create({
		button: {
			maxWidth: 250,
			borderWidth: 1,
			borderRadius: 15,
			alignSelf: "center",
			paddingVertical: 10,
			paddingHorizontal: 15,
			backgroundColor: theme.colors.green,
		},
		buttonView: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
		},
		buttonText: {
			fontSize: 20,
			marginTop: 3,
			marginLeft: 3,
			fontFamily: "Epilogue-Regular",
		},
	});

	const updateFormData = (field: keyof FinalExam, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const evolutionaryStateOptions = ["immature", "young", "ready", "mature", "old"];
	const harmonyOptions = ["disharmonious", "quite_harmonious", "harmonious"];
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!evolutionaryStateOptions.includes(formData.evolutionary_state)) {
			newErrors.evolutionary_state = "Invalid evolution state value";
		}

		if (!harmonyOptions.includes(formData.harmony)) {
			newErrors.harmony = "Invalid harmony value";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		try {
			await ExamsAPI.updateExam(tid, formData, "final");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, final: !prev.final }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		}
	};

	return (
		<View>
			<FormSelect
				label={t("new.final.evolution")}
				field='evolutionary_state'
				value={formData.evolutionary_state}
				error={errors.evolutionary_state}
				onChange={updateFormData}
				options={evolutionaryStateOptions}
			/>

			<FormSelect
				label={t("new.harmony")}
				field='harmony'
				value={formData.harmony}
				error={errors.harmony}
				onChange={updateFormData}
				options={harmonyOptions}
			/>

			<FormInput
				label={t("new.final.pairings")}
				field='pairings'
				value={formData.pairings}
				error={errors.pairings}
				onChange={updateFormData}
			/>

			<FormInput
				label={t("new.notes")}
				field='notes'
				value={formData.notes}
				error={errors.notes}
				onChange={updateFormData}
			/>

			<TouchableOpacity style={styles.button} onPress={handlePress}>
				<View style={styles.buttonView}>
					<PencilSimpleIcon size={24} weight='bold' />
					<Text style={styles.buttonText}>{t("tastings.edit")}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
