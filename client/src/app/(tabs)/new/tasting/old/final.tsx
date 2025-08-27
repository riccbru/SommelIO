import { useState } from "react";
import { Card } from "react-native-paper";
import ExamsAPI from "@/src/services/exams";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import FormInput from "@/src/components/new/FormInput";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import NextButton from "@/src/components/new/NextButton";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { setDescription } from "@/src/utils/utils";

type FinalExam = {
	evolutionary_state: string;
	harmony: string;
	pairings: string;
	notes: string;
};

const defaultFormData = {
	evolutionary_state: "",
	harmony: "",
	pairings: "",
	notes: "",
};

export default function Final() {
	const theme = useTheme();
	const { t } = useTranslation();
	const i18nextPath = "new.final.values";
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<FinalExam>(defaultFormData);

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

	const evolutionaryStateOptions = ["immature", "young", "ready", "mature", "old"];
	const harmonyOptions = ["disharmonious", "quite_harmonious", "harmonious"];
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!evolutionaryStateOptions.includes(formData.evolutionary_state)) {
			newErrors.evolutionary_state = `${t("new.final.evolution")} ${t("new.required")}`;
		}

		if (!harmonyOptions.includes(formData.harmony)) {
			newErrors.harmony = `${t("new.harmony")} ${t("new.required")}`;
		}

		if (!formData.pairings?.trim()) {
			newErrors.pairings = `${t("new.final.pairings")} ${t("new.required")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	return (
		<>
			<KeyboardAvoidingView
				keyboardVerticalOffset={90}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1, backgroundColor: theme.colors.background }}
			>
				<ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
					<Card style={styles.card}>
						<Card.Content>
							<View style={styles.cardHeader}>
								<Text style={styles.sectionTitle}>{t("new.final.title")}</Text>
								<CancelButton
									setErrors={setErrors}
									setFormData={setFormData}
									defaultFormData={defaultFormData}
								/>
							</View>

							<FormSelect
								onChange={updateFormData}
								field='evolutionary_state'
								label={t("new.final.evolution")}
								error={errors.evolutionary_state}
								options={evolutionaryStateOptions}
								value={formData.evolutionary_state}
								i18nPath={`${i18nextPath}.evolution`}
								description={setDescription(
									t,
									"final",
									"evolution",
									formData.evolutionary_state
								)}
							/>

							<FormSelect
								field='harmony'
								error={errors.harmony}
								label={t("new.harmony")}
								value={formData.harmony}
								options={harmonyOptions}
								onChange={updateFormData}
								i18nPath={`${i18nextPath}.harmony`}
								description={setDescription(t, "final", "harmony", formData.harmony)}
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
							text={t("new.scoring.short")}
							action={ExamsAPI.createFinal}
							path='/(tabs)/new/tasting/old/scoring'
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
