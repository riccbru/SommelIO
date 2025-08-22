import { View } from "react-native";
import React, { useState } from "react";
import UpdateButton from "../UpdateButton";
import FormInput from "../../new/FormInput";
import FormSelect from "../../new/FormSelect";
import FormSwitch from "../../new/FormSwitch";
import { useTranslation } from "react-i18next";
import TastingsAPI from "@/src/services/tastings";

type Tasting = {
	tid: string;
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

type EditModeShape = {
	tasting: boolean;
	visual: boolean;
	olfactory: boolean;
	taste: boolean;
	final: boolean;
	scoring: boolean;
};

type Props = {
	tasting: Tasting;
	setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TastingUpdate({ tasting, setEditMode, setRefresh }: Props) {
	const format = (tasting: Tasting): Tasting => {
		const formatted = {
			...tasting,
			alcohol_content: tasting.alcohol_content.replace("%", ""),
			wine_temperature: tasting.wine_temperature.replace("°C", ""),
			ambient_temperature: tasting.ambient_temperature.replace("°C", ""),
		};
		return formatted;
	};

	const { t } = useTranslation();
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<Tasting>(format(tasting));

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
			newErrors.wine_category_name = `${t("new.tasting.category")} ${t("new.invalid")}`;
		}

		if (!formData.vintage.toString().trim()) {
			newErrors.vintage = `${t("new.tasting.vintage")} ${t("new.required")}`;
		} else if (!/^\d{4}$/.test(formData.vintage.toString().trim())) {
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
			newErrors.tasting_date = `${t("new.tasting.date")} ${t("new.invalid")}`;
		}

		if (!formData.tasting_time || !formData.tasting_time.trim()) {
			newErrors.tasting_time = `${t("new.tasting.time")} ${t("new.required")}`;
		} else if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(formData.tasting_time)) {
			newErrors.tasting_time = `${t("new.tasting.time")} ${t("new.invalid")}`;
		}

		if (!formData.tasting_location.trim()) {
			newErrors.tasting_location = `${t("new.tasting.location")} ${t("new.required")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		try {
			if (!Object.keys(tasting).length) {
				await TastingsAPI.createTasting(formData);
			}
			await TastingsAPI.updateTasting(tasting.tid, formData);
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, tasting: !prev.tasting }));
		} catch (error) {
			console.error(`Failed updating: ${error}`);
		}
	};

	return (
		<View>
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
				i18nPath='new.tasting.values.category'
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
				value={formData.vintage.toString()}
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

			<UpdateButton onPress={handlePress} />
		</View>
	);
}
