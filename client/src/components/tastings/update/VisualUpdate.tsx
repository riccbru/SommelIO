import { View } from "react-native";
import React, { useState } from "react";
import UpdateButton from "../UpdateButton";
import ExamsAPI from "@/src/services/exams";
import FormInput from "../../new/FormInput";
import FormSelect from "../../new/FormSelect";
import { useTranslation } from "react-i18next";

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

type Props = {
	tid: string;
	sparkling: boolean;
	exam: VisualExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

export default function VisualUpdate({ tid, sparkling, exam, setRefresh, setEditMode }: Props) {
	const { t } = useTranslation();
	const i18nextPath = "new.visual.values";
	const [formData, setFormData] = useState<VisualExam>(exam);
	const [errors, setErrors] = useState<Record<string, string>>({});

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

		if (!formData.limpidity.trim()) {
			newErrors.limpidity = `${t("new.visual.limpidity")} ${t("new.required")}`;
		} else if (!limpidityOptions.includes(formData.limpidity)) {
			newErrors.limpidity = `${t("new.visual.limpidity")} ${t("new.invalid")}`;
		}

		if (!formData.color_family.trim()) {
			newErrors.color_family = `${t("new.visual.color")} ${t("new.required")}`;
		} else if (!colorFamilyOptions.includes(formData.color_family)) {
			newErrors.color_family = `${t("new.visual.color")} ${t("new.invalid")}`;
		}

		if (!formData.color_shade.trim()) {
			newErrors.color_shade = `${t("new.visual.shade")} ${t("new.required")}`;
		}
		const validShades = colorShadesOptions[formData.color_family] || [];
		if (!validShades.includes(formData.color_shade)) {
			newErrors.color_shade = `${t("new.visual.shade")} ${t("new.invalid")}`;
		}

		if (!formData.consistency.trim()) {
			newErrors.consistency = `${t("new.visual.consistency")} ${t("new.required")}`;
		} else if (!consistencyOptions.includes(formData.consistency)) {
			newErrors.consistency = `${t("new.visual.consistency")} ${t("new.invalid")}`;
		}

		if (sparkling) {
			if (!formData.bubble_size.trim()) {
				newErrors.bubble_size = `${t("new.visual.bubble_size")} ${t("new.required")}`;
			} else if (!bubblesizeOptions.includes(formData.bubble_size)) {
				newErrors.bubble_size = `${t("new.visual.bubble_size")} ${t("new.invalid")}`;
			}

			if (!formData.bubble_number.trim()) {
				newErrors.bubble_number = `${t("new.visual.bubble_number")} ${t("new.required")}`;
			} else if (!bubbleNumberOptions.includes(formData.bubble_number)) {
				newErrors.bubble_number = `${t("new.visual.bubble_number")} ${t("new.invalid")}`;
			}

			if (!formData.bubble_persistence.trim()) {
				newErrors.bubble_persistence = `${t("new.visual.bubble_persistence")} ${t("new.required")}`;
			} else if (!bubblePersistenceOptions.includes(formData.bubble_persistence)) {
				newErrors.bubble_persistence = `${t("new.visual.bubble_persistence")} ${t("new.invalid")}`;
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		try {
			await ExamsAPI.updateExam(tid, formData, "visual");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, visual: !prev.visual }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		}
	};

	return (
		<View>
			<FormSelect
				label={t("new.visual.limpidity")}
				field='limpidity'
				value={formData.limpidity}
				error={errors.limpidity}
				onChange={updateFormData}
				options={limpidityOptions}
				i18nPath={`${i18nextPath}.limpidity`}
			/>

			<FormSelect
				label={t("new.visual.color")}
				field='color_family'
				value={formData.color_family}
				error={errors.color_family}
				onChange={(field, value) => {
					updateFormData(field, value);
					updateFormData("color_shade", "");
				}}
				options={colorFamilyOptions}
				i18nPath={`${i18nextPath}.color`}
			/>

			<FormSelect
				label={t("new.visual.shade")}
				field='color_shade'
				value={formData.color_shade}
				error={errors.color_shade}
				onChange={updateFormData}
				options={colorShadesOptions[formData.color_family]}
				i18nPath={`${i18nextPath}.shade`}
			/>

			<FormSelect
				label={t("new.visual.consistency")}
				field='consistency'
				value={formData.consistency}
				error={errors.consistency}
				onChange={updateFormData}
				options={consistencyOptions}
				i18nPath={`${i18nextPath}.consistency`}
			/>

			{sparkling ? (
				<FormSelect
					label={t("new.visual.bubble_size")}
					field='bubble_size'
					value={formData.bubble_size}
					error={errors.bubble_size}
					onChange={updateFormData}
					options={bubblesizeOptions}
					i18nPath={`${i18nextPath}.bubble_size`}
				/>
			) : (
				<></>
			)}

			{sparkling ? (
				<FormSelect
					label={t("new.visual.bubble_number")}
					field='bubble_number'
					value={formData.bubble_number}
					error={errors.bubble_number}
					onChange={updateFormData}
					options={bubbleNumberOptions}
					i18nPath={`${i18nextPath}.bubble_number`}
				/>
			) : (
				<></>
			)}

			{sparkling ? (
				<FormSelect
					label={t("new.visual.bubble_persistence")}
					field='bubble_persistence'
					value={formData.bubble_persistence}
					error={errors.bubble_persistence}
					onChange={updateFormData}
					options={bubblePersistenceOptions}
					i18nPath={`${i18nextPath}.bubble_persistence`}
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
