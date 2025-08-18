import React, { useState } from "react";
import FormInput from "../../new/FormInput";
import FormScore from "../../new/FormScore";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { isRightRange } from "@/src/utils/utils";
import ScoringsAPI from "@/src/services/scorings";
import { PencilSimpleIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ScoringBody = {
	visual_appearance: number;
	visual_color: number;
	olfactory_intensity: number;
	olfactory_complexity: number;
	olfactory_quality: number;
	taste_structure: number;
	taste_balance: number;
	taste_intensity: number;
	taste_persistence: number;
	taste_quality: number;
	harmony: number;
	notes: string;
};

type Props = {
	tid: string;
	scoring: ScoringBody;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

export default function ScoringUpdate({ tid, scoring, setRefresh, setEditMode }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const [formData, setFormData] = useState<ScoringBody>(scoring);
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

	const scoreFields: { key: string; label: string }[] = [
		{ key: "visual_appearance", label: t("new.scoring.Vappearance") },
		{ key: "visual_color", label: t("new.scoring.Vcolor") },
		{ key: "olfactory_intensity", label: t("new.scoring.Ointensity") },
		{ key: "olfactory_complexity", label: t("new.scoring.Ocomplexity") },
		{ key: "olfactory_quality", label: t("new.scoring.Oquality") },
		{ key: "taste_structure", label: t("new.scoring.Tstructure") },
		{ key: "taste_balance", label: t("new.scoring.Tbalance") },
		{ key: "taste_intensity", label: t("new.scoring.Tintensity") },
		{ key: "taste_persistence", label: t("new.scoring.Tpersistence") },
		{ key: "taste_quality", label: t("new.scoring.Tquality") },
		{ key: "harmony", label: t("new.harmony") },
	];

	const updateFormData = (field: keyof typeof formData, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const validateForm = (): boolean => {
		const MIN = 1;
		const MAX = 5;
		const errMsg = t("new.scoring.error");
		const newErrors: Record<string, string> = {};

		scoreFields.forEach(({ key, label }) => {
			if (!isRightRange(formData[key] as number, MIN, MAX)) {
				newErrors[key] = `${label} ${errMsg}`;
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		try {
			await ScoringsAPI.updateScoring(tid, formData);
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, scoring: !prev.scoring }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		}
	};

	return (
		<View>
			{scoreFields.map(({ key, label }) => (
				<FormScore
					key={key}
					label={label}
					value={formData[key]}
					error={errors[key]}
					onChange={v => updateFormData(key, v)}
				/>
			))}

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
