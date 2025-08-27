import { View } from "react-native";
import React, { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import UpdateButton from "../../UpdateButton";
import { useTranslation } from "react-i18next";
import { setDescription } from "@/src/utils/utils";
import FormInput from "@/src/components/new/FormInput";
import FormSelect from "@/src/components/new/FormSelect";
import FormSwitch from "@/src/components/new/FormSwitch";

type OlfactoryExam = {
	intensity: string;
	complexity: string;
	quality: string;
	description: {
		aromatic: boolean;
		floral: boolean;
		spicy: boolean;
		varietal: boolean;
		vegetal: boolean;
		baking: boolean;
		fruity: boolean;
		fragrant: boolean;
		empyreumatic: boolean;
	};
	notes: string;
};

type OlfactoryExamBody = {
	intensity: string;
	complexity: string;
	quality: string;
	aromatic: boolean;
	floral: boolean;
	spicy: boolean;
	varietal: boolean;
	vegetal: boolean;
	baking: boolean;
	fruity: boolean;
	fragrant: boolean;
	empyreumatic: boolean;
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
	exam: OlfactoryExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
};

export default function NewOlfactoryUpdate({ tid, exam, setRefresh, setEditMode }: Props) {
	const { t } = useTranslation();
	const i18nextPath = "new.olfactory.values";
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<OlfactoryExamBody>({
		intensity: exam?.intensity,
		complexity: exam?.complexity,
		quality: exam?.quality,
		aromatic: exam?.description?.aromatic || false,
		floral: exam?.description?.floral || false,
		spicy: exam?.description?.spicy || false,
		varietal: exam?.description?.varietal || false,
		vegetal: exam?.description?.vegetal || false,
		baking: exam?.description?.baking || false,
		fruity: exam?.description?.fruity || false,
		fragrant: exam?.description?.fragrant || false,
		empyreumatic: exam?.description?.empyreumatic || false,
		notes: exam?.notes || "",
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

	const intensityOptions = ["quite_intense", "intense", "very_intense"];
	const complexityOptions = ["quite_complex", "complex", "ample"];
	const qualityOptions = ["acceptable", "good", "distinguished", "very_good", "excellent"];
	const descriptors = [
		"aromatic",
		"floral",
		"spicy",
		"varietal",
		"vegetal",
		"baking",
		"fruity",
		"fragrant",
		"empyreumatic",
	];

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.intensity?.trim()) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.required")}`;
		} else if (!intensityOptions.includes(formData.intensity)) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.invalid")}`;
		}

		if (!formData.complexity?.trim()) {
			newErrors.complexity = `${t("new.olfactory.complexity")} ${t("new.required")}`;
		} else if (!complexityOptions.includes(formData.complexity)) {
			newErrors.complexity = `${t("new.olfactory.complexity")} ${t("new.invalid")}`;
		}

		if (!formData.quality?.trim()) {
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
			if (!Object.keys(exam).length) {
				await ExamsAPI.createNewOlfactory(tid, formData);
			}
			await ExamsAPI.updateNewExam(tid, formData, "olfactory");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, olfactory: !prev.olfactory }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		}
	};

	return (
		<View>
			<FormSelect
				field='intensity'
				error={errors.intensity}
				onChange={updateFormData}
				label={t("new.intensity")}
				options={intensityOptions}
				value={formData.intensity}
				i18nPath={`${i18nextPath}.intensity`}
				description={setDescription(t, "olfactory", "intensity", formData.intensity)}
			/>

			<FormSelect
				label={t("new.olfactory.complexity")}
				field='complexity'
				value={formData.complexity}
				error={errors.complexity}
				onChange={updateFormData}
				options={complexityOptions}
				i18nPath={`${i18nextPath}.complexity`}
				description={setDescription(t, "olfactory", "complexity", formData.complexity)}
			/>

			<FormSelect
				label={t("new.quality")}
				field='quality'
				value={formData.quality}
				error={errors.quality}
				onChange={updateFormData}
				options={qualityOptions}
				i18nPath={`${i18nextPath}.quality`}
				description={setDescription(t, "olfactory", "quality", formData.quality)}
			/>

			{descriptors.map((el, index) => (
				<FormSwitch
					key={index}
					formData={formData}
					setFormData={setFormData}
					label={t(`new.olfactory.${el}`)}
					name={el as keyof OlfactoryExamBody}
					description={setDescription(t, "olfactory", "descriptors", el)}
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
