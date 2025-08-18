import { useState } from "react";
import ExamsAPI from "@/src/services/exams";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import NextButton from "@/src/components/new/NextButton";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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

const defaultFormData = {
	sweetness: "",
	alcohols: "",
	softness: "",
	acidity: "",
	tannicity: "",
	saltiness: "",
	balance: "",
	intensity: "",
	persistence: "",
	quality: "",
	structure: "",
	notes: "",
};

export default function Taste() {
	const theme = useTheme();
	const { t } = useTranslation();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<TasteExam>(defaultFormData);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: theme.colors.background,
		},
		cardHeader: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
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

		// Notes is optional — no validation

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	return (
		<>
			<KeyboardAvoidingView
				keyboardVerticalOffset={140}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1, backgroundColor: theme.colors.background }}
			>
				<ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
					<Card>
						<Card.Content>
							<View style={styles.cardHeader}>
								<Text style={styles.sectionTitle}>Taste-Olfactory Exam</Text>
								<CancelButton
									setErrors={setErrors}
									setFormData={setFormData}
									defaultFormData={defaultFormData}
								/>
							</View>

							<FormSelect
								label={t("new.taste.sweetness")}
								field='sweetness'
								value={formData.sweetness}
								error={errors.sweetness}
								onChange={updateFormData}
								options={sweetnessOptions}
							/>

							<FormSelect
								label={t("new.taste.alcohols")}
								field='alcohols'
								value={formData.alcohols}
								error={errors.alcohols}
								onChange={updateFormData}
								options={alcoholsOptions}
							/>

							<FormSelect
								label={t("new.taste.softness")}
								field='softness'
								value={formData.softness}
								error={errors.softness}
								onChange={updateFormData}
								options={softnessOptions}
							/>

							<FormSelect
								label={t("new.taste.acidity")}
								field='acidity'
								value={formData.acidity}
								error={errors.acidity}
								onChange={updateFormData}
								options={acidityOptions}
							/>

							<FormSelect
								label={t("new.taste.tannicity")}
								field='tannicity'
								value={formData.tannicity}
								error={errors.tannicity}
								onChange={updateFormData}
								options={tannicityOptions}
							/>

							<FormSelect
								label={t("new.taste.saltiness")}
								field='saltiness'
								value={formData.saltiness}
								error={errors.saltiness}
								onChange={updateFormData}
								options={saltinessOptions}
							/>

							<FormSelect
								label={t("new.taste.balance")}
								field='balance'
								value={formData.balance}
								error={errors.balance}
								onChange={updateFormData}
								options={balanceOptions}
							/>

							<FormSelect
								label={t("new.intensity")}
								field='intensity'
								value={formData.intensity}
								error={errors.intensity}
								onChange={updateFormData}
								options={intensityOptions}
							/>

							<FormSelect
								label={t("new.taste.persistence")}
								field='persistence'
								value={formData.persistence}
								error={errors.persistence}
								onChange={updateFormData}
								options={persistenceOptions}
							/>

							<FormSelect
								label={t("new.quality")}
								field='quality'
								value={formData.quality}
								error={errors.quality}
								onChange={updateFormData}
								options={qualityOptions}
							/>

							<FormSelect
								label={t("new.taste.structure")}
								field='structure'
								value={formData.structure}
								error={errors.structure}
								onChange={updateFormData}
								options={structureOptions}
							/>

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
							path='/new/final'
							text={t("new.final.short")}
							formData={formData}
							validation={validateForm}
							action={ExamsAPI.createTaste}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
