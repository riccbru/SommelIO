import { View } from "react-native";
import React, { useState } from "react";
import UpdateButton from "../UpdateButton";
import ExamsAPI from "@/src/services/exams";
import FormInput from "../../new/FormInput";
import FormSelect from "../../new/FormSelect";
import { useTranslation } from "react-i18next";
import { setDescription } from "@/src/utils/utils";

type VisualExam = {
	limpidity: string;
	color_family: string;
	color_shade: string;
	consistency: string;
	bubble_size: string;
	bubble_number: string;
	bubble_persistence: string;
	notes: string;
};

type EditModeShape = {
	tasting: boolean;
	visual: boolean;
	olfactory: boolean;
	taste: boolean;
	final: boolean;
	scoring: boolean;
};

const defaultVisualExam: VisualExam = {
	limpidity: "",
	color_family: "",
	color_shade: "",
	consistency: "",
	bubble_size: "",
	bubble_number: "",
	bubble_persistence: "",
	notes: "",
};

type Props = {
	tid: string;
	sparkling: boolean;
	exam: VisualExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
};

export default function VisualUpdate({ tid, sparkling, exam, setRefresh, setEditMode }: Props) {
	const { t } = useTranslation();
	const i18nextPath = "new.visual.values";
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<VisualExam>(exam || defaultVisualExam);

	const updateFormData = (field: keyof VisualExam, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const colorFamilyOptions = ["yellow", "red", "rosé"];
	const colorShadesOptions: Record<string, string[]> = {
		yellow: ["greenish_yellow", "straw_yellow", "golden_yellow", "amber"],
		red: ["purple_red", "ruby_red", "garnet", "orange_red"],
		rosé: ["soft_rosé", "cherry_red", "dark_rosé"],
	};
	const limpidityOptions = ["veiled", "quite_limpid", "limpid", "crystal_clear", "brilliant"];
	const consistencyOptions = [
		"flowing",
		"scarcely_consistent",
		"quite_consistent",
		"consistent",
		"oily",
	];
	const bubblesizeOptions = ["large", "quite_fine", "fine"];
	const bubbleNumberOptions = ["very_few", "quite_numerous", "numerous"];
	const bubblePersistenceOptions = ["fading", "quite_persistent", "persistent"];

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.limpidity?.trim()) {
			newErrors.limpidity = `${t("new.visual.limpidity")} ${t("new.required")}`;
		} else if (!limpidityOptions.includes(formData.limpidity)) {
			newErrors.limpidity = `${t("new.visual.limpidity")} ${t("new.invalid")}`;
		}

		if (!formData.color_family?.trim()) {
			newErrors.color_family = `${t("new.visual.color")} ${t("new.required")}`;
		} else if (!colorFamilyOptions.includes(formData.color_family)) {
			newErrors.color_family = `${t("new.visual.color")} ${t("new.invalid")}`;
		}

		if (!formData.color_shade?.trim()) {
			newErrors.color_shade = `${t("new.visual.shade")} ${t("new.required")}`;
		}
		const validShades = colorShadesOptions[formData.color_family] || [];
		if (!validShades.includes(formData.color_shade)) {
			newErrors.color_shade = `${t("new.visual.shade")} ${t("new.invalid")}`;
		}

		if (!formData.consistency?.trim()) {
			newErrors.consistency = `${t("new.visual.consistency")} ${t("new.required")}`;
		} else if (!consistencyOptions.includes(formData.consistency)) {
			newErrors.consistency = `${t("new.visual.consistency")} ${t("new.invalid")}`;
		}

		if (sparkling) {
			if (!formData.bubble_size?.trim()) {
				newErrors.bubble_size = `${t("new.visual.bubble_size")} ${t("new.required")}`;
			}
			if (!bubblesizeOptions.includes(formData.bubble_size)) {
				newErrors.bubble_size = `${t("new.visual.bubble_size")} ${t("new.invalid")}`;
			}

			if (!formData.bubble_number?.trim()) {
				newErrors.bubble_number = `${t("new.visual.bubble_number")} ${t("new.required")}`;
			}
			if (!bubbleNumberOptions.includes(formData.bubble_number)) {
				newErrors.bubble_number = `${t("new.visual.bubble_number")} ${t("new.invalid")}`;
			}

			if (!formData.bubble_persistence?.trim()) {
				newErrors.bubble_persistence = `${t("new.visual.bubble_persistence")} ${t("new.required")}`;
			}
			if (!bubblePersistenceOptions.includes(formData.bubble_persistence)) {
				newErrors.bubble_persistence = `${t("new.visual.bubble_persistence")} ${t("new.invalid")}`;
			}
		} else {
			setFormData(prev => ({ ...prev, bubble_size: "" }));
			setFormData(prev => ({ ...prev, bubble_number: "" }));
			setFormData(prev => ({ ...prev, bubble_persistence: "" }));
		}

		if (!formData.notes) {
			setFormData(prev => ({ ...prev, notes: "" }));
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		const res = validateForm();
		if (!res) console.log("∫ƒ(π)dπ");
		try {
			if (!Object.keys(exam).length) {
				await ExamsAPI.createVisual(tid, formData);
			}
			await ExamsAPI.updateExam(tid, formData, "visual");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, visual: !prev.visual }));
		} catch (error: any) {
			console.error(`Failed updating: ${error.message}`);
		}
	};

	return (
		<View>
			<FormSelect
				field='limpidity'
				error={errors.limpidity}
				onChange={updateFormData}
				value={formData.limpidity}
				options={limpidityOptions}
				label={t("new.visual.limpidity")}
				i18nPath={`${i18nextPath}.limpidity`}
				description={setDescription(t, 'visual', 'limpidity', formData.limpidity)}
			/>

			<FormSelect
				field='color_family'
				error={errors.color_family}
				options={colorFamilyOptions}
				value={formData.color_family}
				label={t("new.visual.color")}
				i18nPath={`${i18nextPath}.color`}
				onChange={(field, value) => {
					updateFormData(field, value);
					updateFormData("color_shade", "");
				}}
			/>

			<FormSelect
				field='color_shade'
				onChange={updateFormData}
				error={errors.color_shade}
				value={formData.color_shade}
				label={t("new.visual.shade")}
				i18nPath={`${i18nextPath}.shade`}
				options={colorShadesOptions[formData.color_family]}
				description={setDescription(t, 'visual', 'color', formData.color_shade)}
			/>

			<FormSelect
				field='consistency'
				onChange={updateFormData}
				error={errors.consistency}
				value={formData.consistency}
				options={consistencyOptions}
				label={t("new.visual.consistency")}
				i18nPath={`${i18nextPath}.consistency`}
				description={setDescription(t, 'visual', 'consistency', formData.consistency)}
			/>

			{sparkling ? (
				<FormSelect
					field='bubble_size'
					onChange={updateFormData}
					error={errors.bubble_size}
					options={bubblesizeOptions}
					value={formData.bubble_size}
					label={t("new.visual.bubble_size")}
					i18nPath={`${i18nextPath}.bubble_size`}
					description={setDescription(t, 'visual', 'effervescence', formData.bubble_size)}
				/>
			) : (
				<></>
			)}

			{sparkling ? (
				<FormSelect
					field='bubble_number'
					onChange={updateFormData}
					error={errors.bubble_number}
					options={bubbleNumberOptions}
					value={formData.bubble_number}
					label={t("new.visual.bubble_number")}
					i18nPath={`${i18nextPath}.bubble_number`}
					description={setDescription(t, 'visual', 'effervescence', formData.bubble_number)}
				/>
			) : (
				<></>
			)}

			{sparkling ? (
				<FormSelect
					field='bubble_persistence'
					onChange={updateFormData}
					error={errors.bubble_persistence}
					options={bubblePersistenceOptions}
					value={formData.bubble_persistence}
					label={t("new.visual.bubble_persistence")}
					i18nPath={`${i18nextPath}.bubble_persistence`}
					description={setDescription(t, 'visual', 'effervescence', formData.bubble_persistence)}
				/>
			) : (
				<></>
			)}

			<FormInput
				label={t("new.notes")}
				field='notes'
				value={formData.notes}
				error={errors.notes}
				onChange={updateFormData}
			/>

			<UpdateButton onPress={handlePress} />
		</View>
	);
}
