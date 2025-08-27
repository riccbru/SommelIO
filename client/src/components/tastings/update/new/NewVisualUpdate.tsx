import FormInput from "@/src/components/new/FormInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UpdateButton from "../../UpdateButton";
import FormSelect from "@/src/components/new/FormSelect";
import { setDescription } from "@/src/utils/utils";
import { View } from "react-native";
import ExamsAPI from "@/src/services/exams";

type VisualExam = {
	limpidity: string;
	color_family: string;
	color_shade: string;
	consistency: string;
	chains_number: string;
	rise_speed: string;
	bubble_size: string;
	bubble_persistence: string;
	notes: string;
};

type EditModeShape = {
	tasting: boolean;
	visual: boolean;
	olfactory: boolean;
	taste: boolean;
	final: boolean;
	scoring: boolean;
};

const defaultVisualExam: VisualExam = {
	limpidity: "",
	color_family: "",
	color_shade: "",
	consistency: "",
	bubble_size: "",
	chains_number: "",
	rise_speed: "",
	bubble_persistence: "",
	notes: "",
};

type Props = {
	tid: string;
	sparkling: boolean;
	exam: VisualExam;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
};

export default function NewVisualUpdate({ tid, sparkling, exam, setRefresh, setEditMode }: Props) {
	const { t } = useTranslation();
	const i18nextPath = "new.visual.values";
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<VisualExam>(exam || defaultVisualExam);

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
		yellow: ["greenish_yellow", "straw_yellow", "golden_yellow", "amber", "mogan"],
		red: ["amaranth_red", "ruby_red", "carmine_red", "garnet", "orange_red"],
		rosé: ["pink_peach", "copper_red", "salmon_pink", "coral_pink", "peony_rosé"],
	};
	const limpidityOptions = ["veiled", "quite_limpid", "limpid", "crystal_clear", "brilliant"];
	const consistencyOptions = ["flowing", "consistent", "oily"];
	const chainsNumberOptions = ["very_few", "quite_numerous", "numerous"];
	const riseSpeedOptions = ["rapid", "average", "slow"];
	const bubblesizeOptions = ["large", "quite_fine", "fine"];
	const bubblePersistenceOptions = ["fading", "quite_persistent", "persistent"];

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.limpidity?.trim()) {
			newErrors.limpidity = `${t("new.visual.limpidity")} ${t("new.required")}`;
		} else if (!limpidityOptions.includes(formData.limpidity)) {
			newErrors.limpidity = `${t("new.visual.limpidity")} ${t("new.invalid")}`;
		}

		if (!formData.color_family?.trim()) {
			newErrors.color_family = `${t("new.visual.color")} ${t("new.required")}`;
		} else if (!colorFamilyOptions.includes(formData.color_family)) {
			newErrors.color_family = `${t("new.visual.color")} ${t("new.invalid")}`;
		}

		if (!formData.color_shade?.trim()) {
			newErrors.color_shade = `${t("new.visual.shade")} ${t("new.required")}`;
		}
		const validShades = colorShadesOptions[formData.color_family] || [];
		if (!validShades.includes(formData.color_shade)) {
			newErrors.color_shade = `${t("new.visual.shade")} ${t("new.invalid")}`;
		}

		if (!formData.consistency?.trim()) {
			newErrors.consistency = `${t("new.visual.consistency")} ${t("new.required")}`;
		} else if (!consistencyOptions.includes(formData.consistency)) {
			newErrors.consistency = `${t("new.visual.consistency")} ${t("new.invalid")}`;
		}

		if (sparkling) {
			if (!formData.chains_number?.trim()) {
				newErrors.chains_number = `${t("new.visual.chains_number")} ${t("new.required")}`;
			}
			if (!chainsNumberOptions.includes(formData.chains_number)) {
				newErrors.bubble_number = `${t("new.visual.chains_number")} ${t("new.invalid")}`;
			}

			if (!formData.rise_speed?.trim()) {
				newErrors.rise_speed = `${t("new.visual.rise_speed")} ${t("new.required")}`;
			}
			if (!riseSpeedOptions.includes(formData.rise_speed)) {
				newErrors.rise_speed = `${t("new.visual.rise_speed")} ${t("new.invalid")}`;
			}

			if (!formData.bubble_size?.trim()) {
				newErrors.bubble_size = `${t("new.visual.bubble_size")} ${t("new.required")}`;
			}
			if (!bubblesizeOptions.includes(formData.bubble_size)) {
				newErrors.bubble_size = `${t("new.visual.bubble_size")} ${t("new.invalid")}`;
			}

			if (!formData.bubble_persistence?.trim()) {
				newErrors.bubble_persistence = `${t("new.visual.bubble_persistence")} ${t("new.required")}`;
			}
			if (!bubblePersistenceOptions.includes(formData.bubble_persistence)) {
				newErrors.bubble_persistence = `${t("new.visual.bubble_persistence")} ${t("new.invalid")}`;
			}
		} else {
			setFormData(prev => ({ ...prev, bubble_size: "" }));
			setFormData(prev => ({ ...prev, chains_number: "" }));
			setFormData(prev => ({ ...prev, rise_speed: "" }));
			setFormData(prev => ({ ...prev, bubble_persistence: "" }));
		}

		if (!formData.notes) {
			setFormData(prev => ({ ...prev, notes: "" }));
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePress = async () => {
		if (!validateForm()) return;
		const res = validateForm();
		if (!res) console.log("∫ƒ(π)dπ");
		try {
			if (!Object.keys(exam).length) {
				await ExamsAPI.createNewVisual(tid, formData);
			}
			await ExamsAPI.updateNewExam(tid, formData, "visual");
			setRefresh(prev => !prev);
			setEditMode(prev => ({ ...prev, visual: !prev.visual }));
		} catch (error: any) {
			console.error(`Failed updating: ${error.message}`);
		}
	};

	return (
		<View>
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
				value={formData.color_family}
				label={t("new.visual.color")}
				i18nPath={`${i18nextPath}.color`}
				onChange={(field, value) => {
					updateFormData(field, value);
					updateFormData("color_shade", "");
				}}
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
				description={setDescription(t, "visual", "consistency", formData.consistency)}
			/>

			{sparkling ? (
				<FormSelect
					field='chains_number'
					onChange={updateFormData}
					error={errors.chains_number}
					options={chainsNumberOptions}
					value={formData.chains_number}
					label={t("new.visual.chains_number")}
					i18nPath={`${i18nextPath}.chains_number`}
					description={setDescription(t, "visual", "effervescence", formData.chains_number)}
				/>
			) : (
				<></>
			)}

			{sparkling ? (
				<FormSelect
					field='rise_speed'
					onChange={updateFormData}
					error={errors.rise_speed}
					options={riseSpeedOptions}
					value={formData.rise_speed}
					label={t("new.visual.rise_speed")}
					i18nPath={`${i18nextPath}.rise_speed`}
					description={setDescription(t, "visual", "effervescence", formData.rise_speed)}
				/>
			) : (
				<></>
			)}

			{sparkling ? (
				<FormSelect
					field='bubble_size'
					onChange={updateFormData}
					error={errors.bubble_size}
					options={bubblesizeOptions}
					value={formData.bubble_size}
					label={t("new.visual.bubble_size")}
					i18nPath={`${i18nextPath}.bubble_size`}
					description={setDescription(t, "visual", "effervescence", formData.bubble_size)}
				/>
			) : (
				<></>
			)}

			{sparkling ? (
				<FormSelect
					field='bubble_persistence'
					onChange={updateFormData}
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

			<UpdateButton onPress={handlePress} />
		</View>
	);
}
