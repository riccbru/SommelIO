import { View } from "react-native";
import React, { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import UpdateButton from "../../UpdateButton";
import { useTranslation } from "react-i18next";
import { setDescription } from "@/src/utils/utils";
import FormInput from "@/src/components/new/FormInput";
import FormSelect from "@/src/components/new/FormSelect";

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

type EditModeShape = {
	tasting: boolean;
	visual: boolean;
	olfactory: boolean;
	taste: boolean;
	final: boolean;
	scoring: boolean;
};

type Props = {
	tid: string;
	exam: TasteExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
};

export default function OldTasteUpdate({ tid, exam, setRefresh, setEditMode }: Props) {
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

		if (!formData.sweetness?.trim()) {
			newErrors.sweetness = `${t("new.taste.")} ${t("new.required")}`;
		} else if (!sweetnessOptions.includes(formData.sweetness)) {
			newErrors.sweetness = `${t("new.taste.")} ${t("new.invalid")}`;
		}

		if (!formData.alcohols?.trim()) {
			newErrors.alcohols = `${t("new.taste.alcohols")} ${t("new.required")}`;
		} else if (!alcoholsOptions.includes(formData.alcohols)) {
			newErrors.alcohols = `${t("new.taste.alcohols")} ${t("new.invalid")}`;
		}

		if (!formData.softness?.trim()) {
			newErrors.softness = `${t("new.taste.softness")} ${t("new.required")}`;
		} else if (!softnessOptions.includes(formData.softness)) {
			newErrors.softness = `${t("new.taste.softness")} ${t("new.invalid")}`;
		}

		if (!formData.acidity?.trim()) {
			newErrors.acidity = `${t("new.taste.acidity")} ${t("new.required")}`;
		} else if (!acidityOptions.includes(formData.acidity)) {
			newErrors.acidity = `${t("new.taste.acidity")} ${t("new.invalid")}`;
		}

		if (!formData.tannicity?.trim()) {
			newErrors.tannicity = `${t("new.taste.tannicity")} ${t("new.required")}`;
		} else if (!tannicityOptions.includes(formData.tannicity)) {
			newErrors.tannicity = `${t("new.taste.tannicity")} ${t("new.invalid")}`;
		}

		if (!formData.saltiness?.trim()) {
			newErrors.saltiness = `${t("new.taste.saltiness")} ${t("new.required")}`;
		} else if (!saltinessOptions.includes(formData.saltiness)) {
			newErrors.saltiness = `${t("new.taste.saltiness")} ${t("new.invalid")}`;
		}

		if (!formData.balance?.trim()) {
			newErrors.balance = `${t("new.taste.balance")} ${t("new.required")}`;
		} else if (!balanceOptions.includes(formData.balance)) {
			newErrors.balance = `${t("new.taste.balance")} ${t("new.invalid")}`;
		}

		if (!formData.intensity?.trim()) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.required")}`;
		} else if (!intensityOptions.includes(formData.intensity)) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.invalid")}`;
		}

		if (!formData.persistence?.trim()) {
			newErrors.persistence = `${t("new.taste.persistence")} ${t("new.required")}`;
		} else if (!persistenceOptions.includes(formData.persistence)) {
			newErrors.persistence = `${t("new.taste.persistence")} ${t("new.invalid")}`;
		}

		if (!formData.quality?.trim()) {
			newErrors.quality = `${t("new.quality")} ${t("new.required")}`;
		} else if (!qualityOptions.includes(formData.quality)) {
			newErrors.quality = `${t("new.quality")} ${t("new.invalid")}`;
		}

		if (!formData.structure?.trim()) {
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
			if (!Object.keys(exam).length) {
				await ExamsAPI.createTaste(tid, formData);
			}
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
				field='sweetness'
				error={errors.sweetness}
				onChange={updateFormData}
				options={sweetnessOptions}
				value={formData.sweetness}
				label={t("new.taste.sweetness")}
				i18nPath={`${i18nextPath}.sweetness`}
				description={setDescription(t, "taste", "sweetness", formData.sweetness)}
			/>

			<FormSelect
				field='alcohols'
				error={errors.alcohols}
				onChange={updateFormData}
				options={alcoholsOptions}
				value={formData.alcohols}
				label={t("new.taste.alcohols")}
				i18nPath={`${i18nextPath}.alcohols`}
				description={setDescription(t, "taste", "alcohols", formData.alcohols)}
			/>

			<FormSelect
				field='softness'
				error={errors.softness}
				onChange={updateFormData}
				options={softnessOptions}
				value={formData.softness}
				label={t("new.taste.softness")}
				i18nPath={`${i18nextPath}.softness`}
				description={setDescription(t, "taste", "softness", formData.softness)}
			/>

			<FormSelect
				field='acidity'
				error={errors.acidity}
				options={acidityOptions}
				value={formData.acidity}
				onChange={updateFormData}
				label={t("new.taste.acidity")}
				i18nPath={`${i18nextPath}.acidity`}
				description={setDescription(t, "taste", "acidity", formData.acidity)}
			/>

			<FormSelect
				field='tannicity'
				error={errors.tannicity}
				onChange={updateFormData}
				options={tannicityOptions}
				value={formData.tannicity}
				label={t("new.taste.tannicity")}
				i18nPath={`${i18nextPath}.tannicity`}
				description={setDescription(t, "taste", "tannicity", formData.tannicity)}
			/>

			<FormSelect
				field='saltiness'
				error={errors.saltiness}
				onChange={updateFormData}
				options={saltinessOptions}
				value={formData.saltiness}
				label={t("new.taste.saltiness")}
				i18nPath={`${i18nextPath}.saltiness`}
				description={setDescription(t, "taste", "saltiness", formData.saltiness)}
			/>

			<FormSelect
				field='balance'
				error={errors.balance}
				options={balanceOptions}
				value={formData.balance}
				onChange={updateFormData}
				label={t("new.taste.balance")}
				i18nPath={`${i18nextPath}.balance`}
				description={setDescription(t, "taste", "balance", formData.balance)}
			/>

			<FormSelect
				field='intensity'
				error={errors.intensity}
				onChange={updateFormData}
				label={t("new.intensity")}
				options={intensityOptions}
				value={formData.intensity}
				i18nPath={`${i18nextPath}.intensity`}
				description={setDescription(t, "taste", "intensity", formData.intensity)}
			/>

			<FormSelect
				field='persistence'
				onChange={updateFormData}
				error={errors.persistence}
				options={persistenceOptions}
				value={formData.persistence}
				label={t("new.taste.persistence")}
				i18nPath={`${i18nextPath}.persistence`}
				description={setDescription(t, "taste", "persistence", formData.persistence)}
			/>

			<FormSelect
				field='quality'
				error={errors.quality}
				label={t("new.quality")}
				options={qualityOptions}
				value={formData.quality}
				onChange={updateFormData}
				i18nPath={`${i18nextPath}.quality`}
				description={setDescription(t, "taste", "quality", formData.quality)}
			/>

			<FormSelect
				field='structure'
				error={errors.structure}
				onChange={updateFormData}
				options={structureOptions}
				value={formData.structure}
				label={t("new.taste.structure")}
				i18nPath={`${i18nextPath}.structure`}
				description={setDescription(t, "taste", "structure", formData.structure)}
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
