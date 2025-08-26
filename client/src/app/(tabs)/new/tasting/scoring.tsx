import { useState } from "react";
import { Card } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { isRightRange } from "@/src/utils/utils";
import ScoringsAPI from "@/src/services/scorings";
import FormInput from "@/src/components/new/FormInput";
import FormScore from "@/src/components/new/FormScore";
import ExitButton from "@/src/components/new/ExitButton";
import SaveButton from "@/src/components/new/SaveButton";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

type FormData = {
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
	const { t } = useTranslation();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<FormData>(defaultFormData);

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

	const scoreFields: { key: keyof typeof defaultFormData; label: string }[] = [
		{ key: "visual_appearance", label: t("new.scoring.Vappearance") },
		{ key: "visual_color", label: t("new.scoring.Vcolor") },
		{ key: "olfactory_intensity", label: t("new.scoring.Ointensity") },
		{ key: "olfactory_complexity", label: t("new.scoring.Ocomplexity") },
		{ key: "olfactory_quality", label: t("new.scoring.Oquality") },
		{ key: "taste_structure", label: t("new.scoring.Tstructure") },
		{ key: "taste_balance", label: t("new.scoring.Tbalance") },
		{ key: "taste_intensity", label: t("new.scoring.Tintensity") },
		{ key: "taste_persistence", label: t("new.scoring.Tpersistence") },
		{ key: "taste_quality", label: t("new.scoring.Tquality") },
		{ key: "harmony", label: t("new.harmony") },
	];

	const updateFormData = (field: keyof typeof formData, value: string) => {
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
		const errMsg = t("new.scoring.error");
		const newErrors: Record<string, string> = {};

		scoreFields.forEach(({ key, label }) => {
			if (!isRightRange(Number(formData[key]), MIN, MAX)) {
				newErrors[key] = `${label} ${errMsg}`;
			}
		});

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
								<Text style={styles.sectionTitle}>{t("new.scoring.title")}</Text>
								<CancelButton
									setErrors={setErrors}
									setFormData={setFormData}
									defaultFormData={defaultFormData}
								/>
							</View>

							{scoreFields.map(({ key, label }) => (
								<FormScore
									key={key}
									label={label}
									value={Number(formData[key])}
									error={errors[key]}
									onChange={v => updateFormData(key, v)}
								/>
							))}

							<FormInput
								field='notes'
								error={errors.notes}
								label={t("new.notes")}
								value={formData.notes}
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
						<SaveButton
							text={t("new.save_exam")}
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
