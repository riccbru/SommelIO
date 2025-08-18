import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { useTranslation } from "react-i18next";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import NextButton from "@/src/components/new/NextButton";
import FormSwitch from "@/src/components/new/FormSwitch";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

type OlfactoryExam = {
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

const defaultFormData = {
	intensity: "",
	complexity: "",
	quality: "",
	aromatic: false,
	vinous: false,
	floral: false,
	fruity: false,
	grassy: false,
	mineral: false,
	fragrant: false,
	spicy: false,
	toasted: false,
	ethereal: false,
	notes: "",
};

export default function Olfactory() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<OlfactoryExam>(defaultFormData);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: theme.colors.background,
		},
		cardHeader: {
			flex: 1,
			alignItems: "center",
			flexDirection: "row",
			alignContent: "center",
			justifyContent: "space-between",
		},
		sectionTitle: {
			fontSize: 18,
			marginBottom: 15,
			color: theme.colors.text,
			fontFamily: "Epilogue-Bold",
		},
		text: {
			fontSize: 30,
			color: theme.colors.text,
			fontFamily: "Epilogue-Regular",
		},
		loadingContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.colors.background,
		},
		buttonContainer: {
			marginTop: 20,
			marginLeft: 15,
			marginRight: 15,
			marginBottom: 20,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
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

	return (
		<>
			<KeyboardAvoidingView
				keyboardVerticalOffset={140}
				style={{ flex: 1, backgroundColor: theme.colors.background }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
					<Card>
						<Card.Content>
							<View style={styles.cardHeader}>
								<Text style={styles.sectionTitle}>Olfactory Exam</Text>
								<CancelButton
									setErrors={setErrors}
									setFormData={setFormData}
									defaultFormData={defaultFormData}
								/>
							</View>

							<FormSelect
								label={t("new.intensity")}
								field='intensity'
								value={formData.intensity}
								error={errors.intensity}
								onChange={updateFormData}
								options={intensityOptions}
							/>

							<FormSelect
								label={t("new.olfactory.complexity")}
								field='complexity'
								value={formData.complexity}
								error={errors.complexity}
								onChange={updateFormData}
								options={complexityOptions}
							/>

							<FormSelect
								label={t("new.quality")}
								field='quality'
								value={formData.quality}
								error={errors.quality}
								onChange={updateFormData}
								options={qualityOptions}
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
						</Card.Content>
					</Card>

					<View style={styles.buttonContainer}>
						<ExitButton
							setErrors={setErrors}
							setFormData={setFormData}
							defaultFormData={defaultFormData}
						/>
						<NextButton
							requiresTid
							path='/new/taste'
							text={t("new.taste.short")}
							formData={formData}
							validation={validateForm}
							action={ExamsAPI.createOlfactory}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
