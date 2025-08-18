import { View } from "react-native";
import React, { useState } from "react";
import UpdateButton from "../UpdateButton";
import ExamsAPI from "@/src/services/exams";
import FormInput from "../../new/FormInput";
import FormSwitch from "../../new/FormSwitch";
import FormSelect from "../../new/FormSelect";
import { useTranslation } from "react-i18next";

type OlfactoryExam = {
	intensity: string;
	complexity: string;
	quality: string;
	description: {
		aromatic: boolean;
		vinous: boolean;
		floral: boolean;
		fruity: boolean;
		grassy: boolean;
		mineral: boolean;
		fragrant: boolean;
		spicy: boolean;
		toasted: boolean;
		ethereal: boolean;
	};
	notes: string;
};

type OlfactoryExamBody = {
	intensity: string;
	complexity: string;
	quality: string;
	aromatic: boolean;
	vinous: boolean;
	floral: boolean;
	fruity: boolean;
	grassy: boolean;
	mineral: boolean;
	fragrant: boolean;
	spicy: boolean;
	toasted: boolean;
	ethereal: boolean;
	notes: string;
};

type Props = {
	tid: string;
	exam: OlfactoryExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

export default function OlfactoryUpdate({ tid, exam, setRefresh, setEditMode }: Props) {
	const { t } = useTranslation();
	const i18nextPath = "new.olfactory.values";
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<OlfactoryExamBody>({
		intensity: exam.intensity,
		complexity: exam.complexity,
		quality: exam.quality,
		aromatic: exam.description.aromatic,
		vinous: exam.description.vinous,
		floral: exam.description.floral,
		fruity: exam.description.fruity,
		grassy: exam.description.grassy,
		mineral: exam.description.mineral,
		fragrant: exam.description.fragrant,
		spicy: exam.description.spicy,
		toasted: exam.description.toasted,
		ethereal: exam.description.ethereal,
		notes: exam.notes,
	});

	const updateFormData = (field: keyof OlfactoryExam, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const intensityOptions = [
		"lacking",
		"scarcely_intense",
		"quite_intense",
		"intense",
		"very_intense",
	];
	const complexityOptions = ["lacking", "scarcely_complex", "quite_complex", "complex", "ample"];
	const qualityOptions = ["coarse", "scarcely_fine", "quite_fine", "fine", "excellent"];
	const descriptors = [
		"aromatic",
		"vinous",
		"floral",
		"fruity",
		"grassy",
		"mineral",
		"fragrant",
		"spicy",
		"toasted",
		"ethereal",
	];
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.intensity.trim()) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.required")}`;
		} else if (!intensityOptions.includes(formData.intensity)) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.invalid")}`;
		}

		if (!formData.complexity.trim()) {
			newErrors.complexity = `${t("new.olfactory.complexity")} ${t("new.required")}`;
		} else if (!complexityOptions.includes(formData.complexity)) {
			newErrors.complexity = `${t("new.olfactory.complexity")} ${t("new.invalid")}`;
		}

		if (!formData.quality.trim()) {
			newErrors.quality = `${t("new.quality")} ${t("new.required")}`;
		} else if (!qualityOptions.includes(formData.quality)) {
			newErrors.quality = `${t("new.quality")} ${t("new.invalid")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		try {
			await ExamsAPI.updateExam(tid, formData, "olfactory");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, olfactory: !prev.olfactory }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		}
	};

	return (
		<View>
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
				label={t("new.olfactory.complexity")}
				field='complexity'
				value={formData.complexity}
				error={errors.complexity}
				onChange={updateFormData}
				options={complexityOptions}
				i18nPath={`${i18nextPath}.complexity`}
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

			{descriptors.map((el, index) => (
				<FormSwitch
					key={index}
					label={t(`new.olfactory.${el}`)}
					name={el}
					formData={formData}
					setFormData={setFormData}
				/>
			))}

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
