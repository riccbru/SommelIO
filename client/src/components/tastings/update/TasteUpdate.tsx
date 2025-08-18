import { View } from "react-native";
import React, { useState } from "react";
import UpdateButton from "../UpdateButton";
import ExamsAPI from "@/src/services/exams";
import FormInput from "../../new/FormInput";
import FormSelect from "../../new/FormSelect";
import { useTranslation } from "react-i18next";

type TasteExam = {
	sweetness: string;
	alcohols: string;
	softness: string;
	acidity: string;
	tannicity: string;
	saltiness: string;
	balance: string;
	intensity: string;
	persistence: string;
	quality: string;
	structure: string;
	notes: string;
};

type Props = {
	tid: string;
	exam: TasteExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

export default function TasteUpdate({ tid, exam, setRefresh, setEditMode }: Props) {
	const { t } = useTranslation();
	const i18nextPath = "new.taste.values";
	const [formData, setFormData] = useState<TasteExam>(exam);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const updateFormData = (field: keyof TasteExam, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const sweetnessOptions = ["dry", "medium_dry", "medium_sweet", "sweet", "excessively_sweet"];
	const alcoholsOptions = ["light", "lightly_warm", "medium_warm", "warm", "alcoholic"];
	const softnessOptions = ["sharp", "scarcely_soft", "quite_soft", "soft", "velvety"];
	const acidityOptions = ["flat", "scarcely_fresh", "quite_fresh", "fresh", "acidulous"];
	const tannicityOptions = ["flabby", "scarcely_tannic", "quite_tannic", "tannic", "astringent"];
	const saltinessOptions = ["tasteless", "scarcely_tasty", "quite_tasty", "tasty", "salty"];
	const balanceOptions = ["unbalanced", "quite_balanced", "balanced"];
	const intensityOptions = [
		"lacking",
		"scarcely_intense",
		"quite_intense",
		"intense",
		"very_intense",
	];
	const persistenceOptions = [
		"short",
		"scarcely_persistent",
		"quite_persistent",
		"persistent",
		"very_persistent",
	];
	const qualityOptions = ["coarse", "scarcely_fine", "quite_fine", "fine", "excellent"];
	const structureOptions = ["thin", "weak", "full", "vigorous", "heavy"];

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.sweetness.trim()) {
			newErrors.sweetness = `${t("new.taste.")} ${t("new.required")}`;
		} else if (!sweetnessOptions.includes(formData.sweetness)) {
			newErrors.sweetness = `${t("new.taste.")} ${t("new.invalid")}`;
		}

		if (!formData.alcohols.trim()) {
			newErrors.alcohols = `${t("new.taste.alcohols")} ${t("new.required")}`;
		} else if (!alcoholsOptions.includes(formData.alcohols)) {
			newErrors.alcohols = `${t("new.taste.alcohols")} ${t("new.invalid")}`;
		}

		if (!formData.softness.trim()) {
			newErrors.softness = `${t("new.taste.softness")} ${t("new.required")}`;
		} else if (!softnessOptions.includes(formData.softness)) {
			newErrors.softness = `${t("new.taste.softness")} ${t("new.invalid")}`;
		}

		if (!formData.acidity.trim()) {
			newErrors.acidity = `${t("new.taste.acidity")} ${t("new.required")}`;
		} else if (!acidityOptions.includes(formData.acidity)) {
			newErrors.acidity = `${t("new.taste.acidity")} ${t("new.invalid")}`;
		}

		if (!formData.tannicity.trim()) {
			newErrors.tannicity = `${t("new.taste.tannicity")} ${t("new.required")}`;
		} else if (!tannicityOptions.includes(formData.tannicity)) {
			newErrors.tannicity = `${t("new.taste.tannicity")} ${t("new.invalid")}`;
		}

		if (!formData.saltiness.trim()) {
			newErrors.saltiness = `${t("new.taste.saltiness")} ${t("new.required")}`;
		} else if (!saltinessOptions.includes(formData.saltiness)) {
			newErrors.saltiness = `${t("new.taste.saltiness")} ${t("new.invalid")}`;
		}

		if (!formData.balance.trim()) {
			newErrors.balance = `${t("new.taste.balance")} ${t("new.required")}`;
		} else if (!balanceOptions.includes(formData.balance)) {
			newErrors.balance = `${t("new.taste.balance")} ${t("new.invalid")}`;
		}

		if (!formData.intensity.trim()) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.required")}`;
		} else if (!intensityOptions.includes(formData.intensity)) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.invalid")}`;
		}

		if (!formData.persistence.trim()) {
			newErrors.persistence = `${t("new.taste.persistence")} ${t("new.required")}`;
		} else if (!persistenceOptions.includes(formData.persistence)) {
			newErrors.persistence = `${t("new.taste.persistence")} ${t("new.invalid")}`;
		}

		if (!formData.quality.trim()) {
			newErrors.quality = `${t("new.quality")} ${t("new.required")}`;
		} else if (!qualityOptions.includes(formData.quality)) {
			newErrors.quality = `${t("new.quality")} ${t("new.invalid")}`;
		}

		if (!formData.structure.trim()) {
			newErrors.structure = `${t("new.taste.structure")} ${t("new.required")}`;
		} else if (!structureOptions.includes(formData.structure)) {
			newErrors.structure = `${t("new.taste.structure")} ${t("new.invalid")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		try {
			await ExamsAPI.updateExam(tid, formData, "taste");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, taste: !prev.taste }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		}
	};

	return (
		<View>
			<FormSelect
				label={t("new.taste.sweetness")}
				field='sweetness'
				value={formData.sweetness}
				error={errors.sweetness}
				onChange={updateFormData}
				options={sweetnessOptions}
				i18nPath={`${i18nextPath}.sweetness`}
			/>

			<FormSelect
				label={t("new.taste.alcohols")}
				field='alcohols'
				value={formData.alcohols}
				error={errors.alcohols}
				onChange={updateFormData}
				options={alcoholsOptions}
				i18nPath={`${i18nextPath}.alcohols`}
			/>

			<FormSelect
				label={t("new.taste.softness")}
				field='softness'
				value={formData.softness}
				error={errors.softness}
				onChange={updateFormData}
				options={softnessOptions}
				i18nPath={`${i18nextPath}.softness`}
			/>

			<FormSelect
				label={t("new.taste.acidity")}
				field='acidity'
				value={formData.acidity}
				error={errors.acidity}
				onChange={updateFormData}
				options={acidityOptions}
				i18nPath={`${i18nextPath}.acidity`}
			/>

			<FormSelect
				label={t("new.taste.tannicity")}
				field='tannicity'
				value={formData.tannicity}
				error={errors.tannicity}
				onChange={updateFormData}
				options={tannicityOptions}
				i18nPath={`${i18nextPath}.tannicity`}
			/>

			<FormSelect
				label={t("new.taste.saltiness")}
				field='saltiness'
				value={formData.saltiness}
				error={errors.saltiness}
				onChange={updateFormData}
				options={saltinessOptions}
				i18nPath={`${i18nextPath}.saltiness`}
			/>

			<FormSelect
				label={t("new.taste.balance")}
				field='balance'
				value={formData.balance}
				error={errors.balance}
				onChange={updateFormData}
				options={balanceOptions}
				i18nPath={`${i18nextPath}.balance`}
			/>

			<FormSelect
				label={t("new.intensity")}
				field='intensity'
				value={formData.intensity}
				error={errors.intensity}
				onChange={updateFormData}
				options={intensityOptions}
				i18nPath={`${i18nextPath}.intensity`}
			/>

			<FormSelect
				label={t("new.taste.persistence")}
				field='persistence'
				value={formData.persistence}
				error={errors.persistence}
				onChange={updateFormData}
				options={persistenceOptions}
				i18nPath={`${i18nextPath}.persistence`}
			/>

			<FormSelect
				label={t("new.quality")}
				field='quality'
				value={formData.quality}
				error={errors.quality}
				onChange={updateFormData}
				options={qualityOptions}
				i18nPath={`${i18nextPath}.quality`}
			/>

			<FormSelect
				label={t("new.taste.structure")}
				field='structure'
				value={formData.structure}
				error={errors.structure}
				onChange={updateFormData}
				options={structureOptions}
				i18nPath={`${i18nextPath}.structure`}
			/>

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
