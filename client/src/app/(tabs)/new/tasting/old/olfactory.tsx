import { useLayoutEffect, useState } from "react";
import { Card } from "react-native-paper";
import { useNavigation, usePathname } from "expo-router";
import ExamsAPI from "@/src/services/exams";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { setDescription } from "@/src/utils/utils";
import FormInput from "@/src/components/new/FormInput";
import ExitButton from "@/src/components/new/ExitButton";
import FormSelect from "@/src/components/new/FormSelect";
import NextButton from "@/src/components/new/NextButton";
import FormSwitch from "@/src/components/new/FormSwitch";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { TrashIcon } from "phosphor-react-native";

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
	const pathname = usePathname();
	const navigation = useNavigation();
	const i18nextPath = "new.olfactory.values";
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<OlfactoryExam>(defaultFormData);

	const handleTrash = async () => {
		setErrors({});
		setFormData(defaultFormData);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: t("old_tasting_name_description"),
			headerTitleStyle: {
				fontSize: 18,
				color: theme.colors.primary,
				fontFamily: "Epilogue-Regular",
			},
			headerRight: () => (
				<TouchableOpacity activeOpacity={0.5} onPress={handleTrash}>
					<TrashIcon size={28} weight='fill' color={theme.colors.red} />
				</TouchableOpacity>
			),
		});
	}, [navigation, t, theme]);

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
			marginLeft: 25,
			marginRight: 25,
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
					<Card style={styles.card}>
						<Card.Content>
							<View style={styles.cardHeader}>
								<Text style={styles.sectionTitle}>{t("new.olfactory.title")}</Text>
							</View>

							<FormSelect
								field='intensity'
								error={errors.intensity}
								onChange={updateFormData}
								label={t("new.intensity")}
								value={formData.intensity}
								options={intensityOptions}
								i18nPath={`${i18nextPath}.intensity`}
								description={setDescription(
									t,
									"olfactory",
									"intensity",
									formData.intensity
								)}
							/>

							<FormSelect
								field='complexity'
								error={errors.complexity}
								onChange={updateFormData}
								value={formData.complexity}
								options={complexityOptions}
								label={t("new.olfactory.complexity")}
								i18nPath={`${i18nextPath}.complexity`}
								description={setDescription(
									t,
									"olfactory",
									"complexity",
									formData.complexity
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
								description={setDescription(t, "olfactory", "quality", formData.quality)}
							/>

							{descriptors.map((el, index) => (
								<FormSwitch
									key={index}
									formData={formData}
									setFormData={setFormData}
									label={t(`new.olfactory.${el}`)}
									name={el as keyof OlfactoryExam}
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
							text={t("new.taste.short")}
							action={ExamsAPI.createOlfactory}
							path='/(tabs)/new/tasting/old/taste'
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
