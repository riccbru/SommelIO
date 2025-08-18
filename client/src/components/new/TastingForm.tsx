import { useState, useEffect } from "react";
import TastingsAPI from "@/src/services/tastings";
import { Card, useTheme } from "react-native-paper";
import FormInput from "@/src/components/new/FormInput";
import NextButton from "@/src/components/new/NextButton";
import FormSelect from "@/src/components/new/FormSelect";
import ExitButton from "@/src/components/new/ExitButton";
import FormSwitch from "@/src/components/new/FormSwitch";
import CancelButton from "@/src/components/new/CancelButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

type Tasting = {
	wine_denomination: string;
	winemaker: string;
	favorite: boolean;
	wine_category_name: string;
	sample_number: string;
	alcohol_content: string;
	vintage: string;
	wine_temperature: string;
	ambient_temperature: string;
	tasting_date: string;
	tasting_time: string;
	tasting_location: string;
};

const defaultFormData = {
	wine_denomination: "",
	winemaker: "",
	favorite: false,
	wine_category_name: "",
	sample_number: "",
	alcohol_content: "",
	vintage: "",
	wine_temperature: "",
	ambient_temperature: "",
	tasting_date: new Date().toISOString().split("T")[0],
	tasting_time: new Date().toLocaleTimeString("it-IT", {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
	}),
	tasting_location: "",
};

type TastingFormProps = {
	// Mode-specific props
	mode?: "create" | "update";
	initialData?: Tasting;

	// Create mode props
	nextPath?: string;
	nextButtonText?: string;
	showExitButton?: boolean;
	showCancelButton?: boolean;

	// Update mode props
	onSave?: (data: Tasting) => Promise<void> | void;
	onCancel?: () => void;
	saveButtonText?: string;
	cancelButtonText?: string;

	// Common props
	title?: string;
	showCard?: boolean;
	keyboardVerticalOffset?: number;
};

export default function TastingForm({
	mode = "create",
	initialData,
	// Create mode props
	nextPath = "/new/visual",
	nextButtonText = "",
	showExitButton = true,
	showCancelButton = true,

	// Update mode props
	onSave,
	onCancel,
	saveButtonText = "SAVE",
	cancelButtonText = "CANCEL",

	// Common props
	title = "",
	showCard = true,
	keyboardVerticalOffset = 90,
}: TastingFormProps) {
	const theme = useTheme();
	const { t } = useTranslation();
	const [errors, setErrors] = useState<Record<string, string>>({});

	const getInitialFormData = (): Tasting => {
		if (mode === "update" && initialData) {
			return { ...initialData };
		}
		return { ...defaultFormData };
	};

	const [formData, setFormData] = useState<Tasting>(getInitialFormData);

	useEffect(() => {
		if (mode === "update" && initialData) {
			setFormData({ ...initialData });
		}
	}, [mode, initialData]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 5,
			flexDirection: "column",
			backgroundColor: theme.colors.background,
		},
		card: {
			borderWidth: 2,
			borderColor: theme.colors.text,
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

	const updateFormData = (field: keyof Tasting, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const resetForm = () => {
		setFormData(getInitialFormData());
		setErrors({});
	};

	const allowedCategories = ["white", "red", "rosé", "sparkling", "fortified"];

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.wine_denomination.trim()) {
			newErrors.wine_denomination = `${t("new.tasting.denomination")} ${t("new.required")}`;
		}

		if (!formData.winemaker.trim()) {
			newErrors.winemaker = `${t("new.tasting.winemaker")} ${t("new.required")}`;
		}

		if (!formData.wine_category_name.trim()) {
			newErrors.wine_category_name = `${t("new.tasting.category")} ${t("new.required")}`;
		} else if (!allowedCategories.includes(formData.wine_category_name.toLowerCase())) {
			newErrors.wine_category_name = `${t("new.tasting.")} ${t("new.invalid")}`;
		}

		if (!formData.vintage.trim()) {
			newErrors.vintage = `${t("new.tasting.vintage")} ${t("new.required")}`;
		} else if (!/^\d{4}$/.test(formData.vintage.trim())) {
			newErrors.vintage = `${t("new.tasting.vintage")} must be 4 digits (YYYY)`;
		} else if (parseInt(formData.vintage, 10) < 1000 || parseInt(formData.vintage, 10) > 2025) {
			newErrors.vintage = `Vintage year must be in a reasonable range`;
		}

		if (!formData.alcohol_content.trim()) {
			newErrors.alcohol_content = `${t("new.tasting.alcohol")} ${t("new.required")}`;
		} else if (isNaN(parseFloat(formData.alcohol_content))) {
			newErrors.alcohol_content = `${t("new.tasting.alcohol")} ${t("new.number")}`;
		}

		if (!formData.wine_temperature.trim()) {
			newErrors.wine_temperature = `${t("new.tasting.wine_temperature")} ${t("new.required")}`;
		} else if (isNaN(parseFloat(formData.wine_temperature))) {
			newErrors.wine_temperature = `${t("new.tasting.wine_temperature")} ${t("new.number")}`;
		}

		if (!formData.ambient_temperature.trim()) {
			newErrors.ambient_temperature = `${t("new.tasting.ambient_temperature")} ${t("new.required")}`;
		} else if (isNaN(parseFloat(formData.ambient_temperature))) {
			newErrors.ambient_temperature = `${t("new.tasting.ambient_temperature")} ${t("new.number")}`;
		}

		if (!formData.tasting_date || !formData.tasting_date.trim()) {
			newErrors.tasting_date = `${t("new.tasting.date")} ${t("new.required")}`;
		} else if (isNaN(Date.parse(formData.tasting_date))) {
			newErrors.tasting_date = `${t("new.tasting.")} ${t("new.invalid")}`;
		}

		if (!formData.tasting_time || !formData.tasting_time.trim()) {
			newErrors.tasting_time = `${t("new.tasting.time")} ${t("new.required")}`;
		} else if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.tasting_time)) {
			newErrors.tasting_time = `${t("new.tasting.")} ${t("new.invalid")}`;
		}

		if (!formData.tasting_location.trim()) {
			newErrors.tasting_location = `${t("new.tasting.location")} ${t("new.required")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle save for update mode
	const handleSave = async () => {
		if (!validateForm()) return;

		if (onSave) {
			try {
				await onSave(formData);
			} catch (error) {
				console.error("Save failed:", error);
			}
		}
	};

	// Generate next path for create mode
	const getNextPath = () => {
		if (nextPath.includes("?")) {
			return `${nextPath}&wine_category_name=${encodeURIComponent(formData.wine_category_name)}`;
		}
		return `${nextPath}?wine_category_name=${encodeURIComponent(formData.wine_category_name)}`;
	};

	const renderButtons = () => {
		if (mode === "update") {
			return (
				<View style={styles.buttonContainer}>
					{onCancel && (
						<CancelButton
							text={cancelButtonText}
							onPress={onCancel}
							setErrors={setErrors}
							setFormData={() => resetForm()}
							defaultFormData={getInitialFormData()}
						/>
					)}
					<NextButton text={saveButtonText} onPress={handleSave} validation={validateForm} />
				</View>
			);
		}

		// Create mode buttons
		return (
			<View style={styles.buttonContainer}>
				{showExitButton && (
					<ExitButton
						setErrors={setErrors}
						setFormData={setFormData}
						defaultFormData={defaultFormData}
					/>
				)}
				<NextButton
					path={getNextPath()}
					text={t("new.visual.short")}
					validation={validateForm}
					formData={{ ...formData, vintage: Number(formData.vintage) }}
					action={TastingsAPI.createTasting}
				/>
			</View>
		);
	};

	const renderFormContent = () => (
		<>
			{showCard && (
				<View style={styles.cardHeader}>
					<Text style={styles.sectionTitle}>{t("new.tasting.title")}</Text>
					{mode === "create" && showCancelButton && (
						<CancelButton
							setErrors={setErrors}
							setFormData={setFormData}
							defaultFormData={defaultFormData}
						/>
					)}
				</View>
			)}

			<FormInput
				label={t("new.tasting.denomination")}
				field='wine_denomination'
				value={formData.wine_denomination}
				error={errors.wine_denomination}
				onChange={updateFormData}
			/>

			<FormInput
				label={t("new.tasting.winemaker")}
				field='winemaker'
				value={formData.winemaker}
				error={errors.winemaker}
				onChange={updateFormData}
			/>

			<FormSelect
				label={t("new.tasting.category")}
				field='wine_category_name'
				value={formData.wine_category_name}
				error={errors.wine_category_name}
				onChange={updateFormData}
				options={allowedCategories}
			/>

			<FormSwitch
				label={t("new.tasting.favorite")}
				name='favorite'
				formData={formData}
				setFormData={setFormData}
			/>

			<FormInput
				label={t("new.tasting.sample")}
				field='sample_number'
				value={formData.sample_number}
				error={errors.sample_number}
				onChange={updateFormData}
			/>

			<FormInput
				label={`${t("new.tasting.vintage")} (YYYY)`}
				field='vintage'
				value={formData.vintage}
				error={errors.vintage}
				keyboardType='numeric'
				onChange={updateFormData}
			/>

			<FormInput
				label={`${t("new.tasting.alcohol")} (%)`}
				field='alcohol_content'
				value={formData.alcohol_content}
				error={errors.alcohol_content}
				keyboardType='numeric'
				onChange={updateFormData}
			/>

			<FormInput
				label={`${t("new.tasting.wine_temperature")} (°C)`}
				field='wine_temperature'
				value={formData.wine_temperature}
				error={errors.wine_temperature}
				keyboardType='numeric'
				onChange={updateFormData}
			/>

			<FormInput
				label={`${t("new.tasting.ambient_temperature")} (°C)`}
				field='ambient_temperature'
				value={formData.ambient_temperature}
				error={errors.ambient_temperature}
				keyboardType='numeric'
				onChange={updateFormData}
			/>

			<FormInput
				label={`${t("new.tasting.date")} (YYYY-MM-DD)`}
				field='tasting_date'
				value={formData.tasting_date}
				error={errors.tasting_date}
				keyboardType='numbers-and-punctuation'
				onChange={updateFormData}
			/>

			<FormInput
				label={`${t("new.tasting.time")} (HH:mm)`}
				field='tasting_time'
				value={formData.tasting_time}
				error={errors.tasting_time}
				keyboardType='numbers-and-punctuation'
				onChange={updateFormData}
			/>

			<FormInput
				label={t("new.tasting.location")}
				field='tasting_location'
				value={formData.tasting_location}
				error={errors.tasting_location}
				onChange={updateFormData}
			/>
		</>
	);

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={keyboardVerticalOffset}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, backgroundColor: theme.colors.background }}
		>
			<ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
				{showCard ? (
					<Card style={styles.card}>
						<Card.Content>{renderFormContent()}</Card.Content>
					</Card>
				) : (
					<View style={{ padding: 16 }}>{renderFormContent()}</View>
				)}

				{renderButtons()}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
