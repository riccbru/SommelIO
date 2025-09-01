import { useState } from "react";
import { Card } from "react-native-paper";
import ExamsAPI from "@/src/services/exams";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useLocalSearchParams, usePathname } from "expo-router";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { setDescription } from "@/src/utils/utils";

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

const defaultFormData = {
	limpidity: "",
	color_family: "",
	color_shade: "",
	consistency: "",
	bubble_size: "",
	bubble_number: "",
	bubble_persistence: "",
	notes: "",
};

export default function Visual() {
	const theme = useTheme();
	const { t } = useTranslation();
	const pathname = usePathname();
	const i18nextPath = "new.visual.values";
	const [errors, setErrors] = useState<Record<string, string>>({});
	const { wine_category_name } = useLocalSearchParams();
	const category = (wine_category_name || "").toString().toLowerCase();
	const categoryToColorFamily: Record<string, string> = {
		white: "yellow",
		red: "red",
		rosé: "rosé",
	};

	const [formData, setFormData] = useState<VisualExam>({
		...defaultFormData,
		color_family: categoryToColorFamily[category] || defaultFormData.color_family,
	});

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

		if (category === "sparkling") {
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
								<Text style={styles.sectionTitle}>{t("new.visual.title")}</Text>
								<CancelButton
									setErrors={setErrors}
									setFormData={setFormData}
									defaultFormData={defaultFormData}
								/>
							</View>

							<FormSelect
								field='limpidity'
								error={errors.limpidity}
								onChange={updateFormData}
								value={formData.limpidity}
								options={limpidityOptions}
								label={t("new.visual.limpidity")}
								i18nPath={`${i18nextPath}.limpidity`}
								description={setDescription(t, "visual", "limpidity", formData.limpidity)}
							/>

							<FormSelect
								field='color_family'
								error={errors.color_family}
								options={colorFamilyOptions}
								label={t("new.visual.color")}
								value={formData.color_family}
								onChange={(field, value) => {
									updateFormData(field, value);
									updateFormData("color_shade", "");
								}}
								i18nPath={`${i18nextPath}.color`}
							/>

							<FormSelect
								field='color_shade'
								onChange={updateFormData}
								error={errors.color_shade}
								value={formData.color_shade}
								label={t("new.visual.shade")}
								i18nPath={`${i18nextPath}.shade`}
								options={colorShadesOptions[formData.color_family]}
								description={setDescription(t, "visual", "color", formData.color_shade)}
							/>

							<FormSelect
								field='consistency'
								onChange={updateFormData}
								error={errors.consistency}
								value={formData.consistency}
								options={consistencyOptions}
								label={t("new.visual.consistency")}
								i18nPath={`${i18nextPath}.consistency`}
								description={setDescription(
									t,
									"visual",
									"consistency",
									formData.consistency
								)}
							/>

							{category === "sparkling" ? (
								<FormSelect
									field='bubble_size'
									onChange={updateFormData}
									error={errors.bubble_size}
									options={bubblesizeOptions}
									value={formData.bubble_size}
									label={t("new.visual.bubble_size")}
									i18nPath={`${i18nextPath}.bubble_size`}
									description={setDescription(
										t,
										"visual",
										"effervescence",
										formData.bubble_size
									)}
								/>
							) : (
								<></>
							)}

							{category === "sparkling" ? (
								<FormSelect
									field='bubble_number'
									onChange={updateFormData}
									error={errors.bubble_number}
									options={bubbleNumberOptions}
									value={formData.bubble_number}
									label={t("new.visual.bubble_number")}
									i18nPath={`${i18nextPath}.bubble_number`}
									description={setDescription(
										t,
										"visual",
										"effervescence",
										formData.bubble_number
									)}
								/>
							) : (
								<></>
							)}

							{category === "sparkling" ? (
								<FormSelect
									onChange={updateFormData}
									field='bubble_persistence'
									error={errors.bubble_persistence}
									options={bubblePersistenceOptions}
									value={formData.bubble_persistence}
									label={t("new.visual.bubble_persistence")}
									i18nPath={`${i18nextPath}.bubble_persistence`}
									description={setDescription(
										t,
										"visual",
										"effervescence",
										formData.bubble_persistence
									)}
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
						</Card.Content>
					</Card>

					<View style={styles.buttonContainer}>
						<ExitButton
							path={pathname}
							setErrors={setErrors}
							setFormData={setFormData}
							defaultFormData={defaultFormData}
						/>
						<NextButton
							requiresTid
							formData={formData}
							validation={validateForm}
							action={ExamsAPI.createVisual}
							text={t("new.olfactory.short")}
							path='/(tabs)/new/tasting/old/olfactory'
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
