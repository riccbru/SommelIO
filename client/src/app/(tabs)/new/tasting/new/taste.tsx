import { useState } from "react";
import { Card } from "react-native-paper";
import ExamsAPI from "@/src/services/exams";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { setDescription } from "@/src/utils/utils";
import { useLocalSearchParams } from "expo-router";
import FormInput from "@/src/components/new/FormInput";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import NextButton from "@/src/components/new/NextButton";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

type TasteExam = {
	sweetness: string;
	acidity: string;

	alcohols: string;
	tannicity: string;

	softness: string;
	saltiness: string;

	effervescence: string;

	intensity: string;
	structure: string;
	balance: string;
	persistence: string;
	quality: string;

	notes: string;
};

const defaultFormData = {
	sweetness: "",
	acidity: "",
	alcohols: "",
	tannicity: "",
	softness: "",
	saltiness: "",
	effervescence: "",
	intensity: "",
	structure: "",
	balance: "",
	persistence: "",
	quality: "",
	notes: "",
};

export default function Taste() {
	const theme = useTheme();
	const { t } = useTranslation();
	const i18nextPath = "new.taste.values";
	const { sparkling } = useLocalSearchParams();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<TasteExam>(defaultFormData);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		card: {
			margin: 20,
			padding: 5,
			borderWidth: 2,
			borderRadius: 15,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		cardHeader: {
			flexDirection: "row",
			alignItems: "center",
			alignContent: "center",
			justifyContent: "space-between",
		},
		sectionTitle: {
			fontSize: 18,
			marginBottom: 15,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		text: {
			fontSize: 30,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		loadingContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
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
	const acidityOptions = ["scarcely_fresh", "quite_fresh", "fresh", "vibrant", "acidulous"];
	const alcoholsOptions = ["lightly_warm", "medium_warm", "warm", "very_warm", "alcoholic"];
	const tannicityOptions = [
		"scarcely_tannic",
		"quite_tannic",
		"tannic",
		"tenacious",
		"astringent",
	];
	const softnessOptions = ["scarcely_soft", "quite_soft", "soft", "velvety", "mellow"];
	const saltinessOptions = ["scarcely_tasty", "quite_tasty", "tasty", "savory", "salty"];
	const effervescenceOptions = ["delicate", "moderate", "lively", "exuberant", "vivid"];
	const intensityOptions = ["quite_intense", "intense", "very_intense"];
	const structureOptions = ["medium", "full", "vigorous"];
	const balanceOptions = ["unbalanced", "quite_balanced", "balanced"];
	const persistenceOptions = ["quite_persistent", "persistent", "very_persistent"];
	const qualityOptions = ["acceptable", "good", "distinguished", "very_good", "excellent"];

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.sweetness.trim()) {
			newErrors.sweetness = `${t("new.taste.")} ${t("new.required")}`;
		} else if (!sweetnessOptions.includes(formData.sweetness)) {
			newErrors.sweetness = `${t("new.taste.")} ${t("new.invalid")}`;
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

		if (!formData.saltiness.trim()) {
			newErrors.saltiness = `${t("new.taste.saltiness")} ${t("new.required")}`;
		} else if (!saltinessOptions.includes(formData.saltiness)) {
			newErrors.saltiness = `${t("new.taste.saltiness")} ${t("new.invalid")}`;
		}

		if (sparkling) {
			if (!formData.effervescence.trim()) {
				newErrors.effervescence = `${t("new.effervescence")} ${t("new.required")}`;
			} else if (!effervescenceOptions.includes(formData.effervescence)) {
				newErrors.effervescence = `${t("new.effervescence")} ${t("new.invalid")}`;
			}
		}

		if (!formData.intensity.trim()) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.required")}`;
		} else if (!intensityOptions.includes(formData.intensity)) {
			newErrors.intensity = `${t("new.intensity")} ${t("new.invalid")}`;
		}

		if (!formData.structure.trim()) {
			newErrors.structure = `${t("new.taste.structure")} ${t("new.required")}`;
		} else if (!structureOptions.includes(formData.structure)) {
			newErrors.structure = `${t("new.taste.structure")} ${t("new.invalid")}`;
		}

		if (!formData.balance.trim()) {
			newErrors.balance = `${t("new.taste.balance")} ${t("new.required")}`;
		} else if (!balanceOptions.includes(formData.balance)) {
			newErrors.balance = `${t("new.taste.balance")} ${t("new.invalid")}`;
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
					<Card style={styles.card}>
						<Card.Content>
							<View style={styles.cardHeader}>
								<Text style={styles.sectionTitle}>{t("new.taste.title")}</Text>
								<CancelButton
									setErrors={setErrors}
									setFormData={setFormData}
									defaultFormData={defaultFormData}
								/>
							</View>

							<FormSelect
								field='sweetness'
								error={errors.sweetness}
								onChange={updateFormData}
								value={formData.sweetness}
								options={sweetnessOptions}
								label={t("new.taste.sweetness")}
								i18nPath={`${i18nextPath}.sweetness`}
								description={setDescription(t, "taste", "sweetness", formData.sweetness)}
							/>

							<FormSelect
								field='alcohols'
								error={errors.alcohols}
								value={formData.alcohols}
								onChange={updateFormData}
								options={alcoholsOptions}
								label={t("new.taste.alcohols")}
								i18nPath={`${i18nextPath}.alcohols`}
								description={setDescription(t, "taste", "alcohols", formData.alcohols)}
							/>

							<FormSelect
								field='softness'
								error={errors.softness}
								value={formData.softness}
								onChange={updateFormData}
								options={softnessOptions}
								label={t("new.taste.softness")}
								i18nPath={`${i18nextPath}.softness`}
								description={setDescription(t, "taste", "softness", formData.softness)}
							/>

							<FormSelect
								field='acidity'
								error={errors.acidity}
								value={formData.acidity}
								onChange={updateFormData}
								options={acidityOptions}
								label={t("new.taste.acidity")}
								i18nPath={`${i18nextPath}.acidity`}
								description={setDescription(t, "taste", "acidity", formData.acidity)}
							/>

							<FormSelect
								field='tannicity'
								error={errors.tannicity}
								onChange={updateFormData}
								value={formData.tannicity}
								options={tannicityOptions}
								label={t("new.taste.tannicity")}
								i18nPath={`${i18nextPath}.tannicity`}
								description={setDescription(t, "taste", "tannicity", formData.tannicity)}
							/>

							<FormSelect
								field='saltiness'
								error={errors.saltiness}
								onChange={updateFormData}
								value={formData.saltiness}
								options={saltinessOptions}
								label={t("new.taste.saltiness")}
								i18nPath={`${i18nextPath}.saltiness`}
								description={setDescription(t, "taste", "saltiness", formData.saltiness)}
							/>

							{sparkling ? (
								<FormSelect
									field='effervescence'
									error={errors.effervescence}
									value={formData.effervescence}
									options={effervescenceOptions}
									onChange={updateFormData}
									label={t("new.taste.effervescence")}
									i18nPath={`${i18nextPath}.effervescence`}
									description={setDescription(
										t,
										"taste",
										"effervescence",
										formData.effervescence
									)}
								/>
							) : (
								<></>
							)}

							<FormSelect
								field='balance'
								error={errors.balance}
								value={formData.balance}
								options={balanceOptions}
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
								value={formData.intensity}
								options={intensityOptions}
								i18nPath={`${i18nextPath}.intensity`}
								description={setDescription(t, "taste", "intensity", formData.intensity)}
							/>

							<FormSelect
								field='persistence'
								onChange={updateFormData}
								error={errors.persistence}
								value={formData.persistence}
								options={persistenceOptions}
								label={t("new.taste.persistence")}
								i18nPath={`${i18nextPath}.persistence`}
								description={setDescription(
									t,
									"taste",
									"persistence",
									formData.persistence
								)}
							/>

							<FormSelect
								field='quality'
								error={errors.quality}
								label={t("new.quality")}
								value={formData.quality}
								options={qualityOptions}
								onChange={updateFormData}
								i18nPath={`${i18nextPath}.quality`}
								description={setDescription(t, "taste", "quality", formData.quality)}
							/>

							<FormSelect
								field='structure'
								error={errors.structure}
								onChange={updateFormData}
								value={formData.structure}
								options={structureOptions}
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
							formData={formData}
							validation={validateForm}
							text={t("new.final.short")}
							action={ExamsAPI.createNewTaste}
							path='/(tabs)/new/tasting/new/final'
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
