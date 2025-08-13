import { useState } from "react";
import { isRightRange } from "@/src/utils/utils";
import ScoringsAPI from "@/src/services/scorings";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import FormScore from "@/src/components/new/FormScore";
import ExitButton from "@/src/components/new/ExitButton";
import NextButton from "@/src/components/new/NextButton";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, Text } from "react-native";

type ScoringEvaluation = {
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
	total_score: number;
};

const defaultFormData = {
	visual_appearance: 0,
	visual_color: 0,
	olfactory_intensity: 0,
	olfactory_complexity: 0,
	olfactory_quality: 0,
	taste_structure: 0,
	taste_balance: 0,
	taste_intensity: 0,
	taste_persistence: 0,
	taste_quality: 0,
	harmony: 0,
	notes: "",
};

export default function Scoring() {
	const theme = useTheme();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<Record<string, string>>(defaultFormData);

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
			fontWeight: "bold",
			marginBottom: 15,
			color: theme.colors.text,
		},
		text: {
			fontSize: 30,
			fontWeight: 300,
			fontFamily: "Epilogue",
			color: theme.colors.text,
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

	const updateFormData = (field: keyof ScoringEvaluation, value: string) => {
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
		const errMex = "must be in range [1, 5]";
		const newErrors: Record<string, string> = {};

		if (!isRightRange(formData.visual_appearance, MIN, MAX)) {
			newErrors.visual_appearance = `Visual Appearance ${errMex}`;
		}
		if (!isRightRange(formData.visual_color, MIN, MAX)) {
			newErrors.visual_color = `Visual Color ${errMex}`;
		}
		if (!isRightRange(formData.olfactory_intensity, MIN, MAX)) {
			newErrors.olfactory_intensity = `Olfactory Intensity ${errMex}`;
		}
		if (!isRightRange(formData.olfactory_complexity, MIN, MAX)) {
			newErrors.olfactory_complexity = `Olfactory Complexity ${errMex}`;
		}
		if (!isRightRange(formData.olfactory_quality, MIN, MAX)) {
			newErrors.olfactory_quality = `Olfactory Quality ${errMex}`;
		}
		if (!isRightRange(formData.taste_structure, MIN, MAX)) {
			newErrors.taste_structure = `Taste Structure ${errMex}`;
		}
		if (!isRightRange(formData.taste_balance, MIN, MAX)) {
			newErrors.taste_balance = `Taste Balance ${errMex}`;
		}
		if (!isRightRange(formData.taste_intensity, MIN, MAX)) {
			newErrors.taste_intensity = `Taste Intensity ${errMex}`;
		}
		if (!isRightRange(formData.taste_persistence, MIN, MAX)) {
			newErrors.taste_persistence = `Taste Persistence ${errMex}`;
		}
		if (!isRightRange(formData.taste_quality, MIN, MAX)) {
			newErrors.taste_quality = `Taste Quality ${errMex}`;
		}
		if (!isRightRange(formData.harmony, MIN, MAX)) {
			newErrors.harmony = `Harmony ${errMex}`;
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
								<Text style={styles.sectionTitle}>Scoring Evaluation</Text>
								<CancelButton
									setErrors={setErrors}
									setFormData={setFormData}
									defaultFormData={defaultFormData}
								/>
							</View>

							<FormScore
								label='Visual Appearance'
								value={formData.visual_appearance}
								error={errors.visual_appearance}
								onChange={v => updateFormData("visual_appearance", v)}
							/>
							<FormScore
								label='Visual Color'
								value={formData.visual_color}
								error={errors.visual_color}
								onChange={v => updateFormData("visual_color", v)}
							/>
							<FormScore
								label='Olfactory Intensity'
								value={formData.olfactory_intensity}
								error={errors.olfactory_intensity}
								onChange={v => updateFormData("olfactory_intensity", v)}
							/>
							<FormScore
								label='Olfactory Complexity'
								value={formData.olfactory_complexity}
								error={errors.olfactory_complexity}
								onChange={v => updateFormData("olfactory_complexity", v)}
							/>
							<FormScore
								label='Olfactory Quality'
								value={formData.olfactory_quality}
								error={errors.olfactory_quality}
								onChange={v => updateFormData("olfactory_quality", v)}
							/>
							<FormScore
								label='Taste Structure'
								value={formData.taste_structure}
								error={errors.taste_structure}
								onChange={v => updateFormData("taste_structure", v)}
							/>
							<FormScore
								label='Taste Balance'
								value={formData.taste_balance}
								error={errors.taste_balance}
								onChange={v => updateFormData("taste_balance", v)}
							/>
							<FormScore
								label='Taste Intensity'
								value={formData.taste_intensity}
								error={errors.taste_intensity}
								onChange={v => updateFormData("taste_intensity", v)}
							/>
							<FormScore
								label='Taste Persistence'
								value={formData.taste_persistence}
								error={errors.taste_persistence}
								onChange={v => updateFormData("taste_persistence", v)}
							/>
							<FormScore
								label='Taste Quality'
								value={formData.taste_quality}
								error={errors.taste_quality}
								onChange={v => updateFormData("taste_quality", v)}
							/>
							<FormScore
								label='Harmony'
								value={formData.harmony}
								error={errors.harmony}
								onChange={v => updateFormData("harmony", v)}
							/>
							<FormInput
								label='Notes'
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
							path='/new/scoring'
							text='SAVE'
							formData={formData}
							validation={validateForm}
							action={ScoringsAPI.createScoring}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
