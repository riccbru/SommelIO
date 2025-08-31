import { View } from "react-native";
import React, { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import UpdateButton from "../../UpdateButton";
import { useTranslation } from "react-i18next";
import { setDescription } from "@/src/utils/utils";
import FormInput from "@/src/components/new/FormInput";
import FormSelect from "@/src/components/new/FormSelect";

type FinalExam = {
	evolutionary_state: string;
	harmony: string;
	quality: string;
	pairings: string;
	notes: string;
};

const defaultFinalExam: FinalExam = {
	evolutionary_state: "",
	harmony: "",
	quality: "",
	pairings: "",
	notes: "",
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
	exam: FinalExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
};

export default function NewFinalUpdate({ tid, exam, setRefresh, setEditMode }: Props) {
	const { t } = useTranslation();
	const i18nextPath = "new.final.values";
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<FinalExam>(exam || defaultFinalExam);

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

	const evolutionaryStateOptions = ["ready", "mature"];
	const harmonyOptions = ["disharmonious", "quite_harmonious", "harmonious"];
	const qualityOptions = ["acceptable", "good", "distinguished", "very_good", "excellent"];
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.evolutionary_state?.trim()) {
			newErrors.evolutionary_state = `${t("new.final.evolution")} ${t("new.required")}`;
		} else if (!evolutionaryStateOptions.includes(formData.evolutionary_state)) {
			newErrors.evolutionary_state = `${t("new.final.evolution")} ${t("new.invalid")}`;
		}

		if (!formData.harmony?.trim()) {
			newErrors.harmony = `${t("new.harmony")} ${t("new.required")}`;
		} else if (!harmonyOptions.includes(formData.harmony)) {
			newErrors.harmony = `${t("new.harmony")} ${t("new.invalid")}`;
		}

		if (!formData.quality?.trim()) {
			newErrors.quality = `${t("new.quality")} ${t("new.required")}`;
		} else if (!qualityOptions.includes(formData.quality)) {
			newErrors.quality = `${t("new.quality")} ${t("new.invalid")}`;
		}

		if (!formData.pairings?.trim()) {
			newErrors.pairings = `${t("new.final.pairings")} ${t("new.required")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		try {
			setLoading(true);
			if (!Object.keys(exam).length) {
				await ExamsAPI.createNewFinal(tid, formData);
			}
			await ExamsAPI.updateNewExam(tid, formData, "final");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, final: !prev.final }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			<FormSelect
				field='evolutionary_state'
				onChange={updateFormData}
				label={t("new.final.evolution")}
				error={errors.evolutionary_state}
				options={evolutionaryStateOptions}
				value={formData.evolutionary_state}
				i18nPath={`${i18nextPath}.evolution`}
				description={setDescription(t, "final", "evolution", formData.evolutionary_state)}
			/>

			<FormSelect
				field='harmony'
				error={errors.harmony}
				label={t("new.harmony")}
				options={harmonyOptions}
				value={formData.harmony}
				onChange={updateFormData}
				i18nPath={`${i18nextPath}.harmony`}
				description={setDescription(t, "final", "harmony", formData.harmony)}
			/>

			<FormSelect
				field='quality'
				error={errors.quality}
				label={t("new.quality")}
				options={qualityOptions}
				value={formData.quality}
				onChange={updateFormData}
				i18nPath={`${i18nextPath}.quality`}
				description={setDescription(t, "final", "quality", formData.quality)}
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

			<UpdateButton loading={loading} onPress={handlePress} />
		</View>
	);
}
