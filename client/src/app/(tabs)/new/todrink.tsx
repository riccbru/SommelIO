import WinesAPI from "@/src/services/wines";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { TrashIcon } from "phosphor-react-native";
import { useLayoutEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import FormField from "@/src/components/tastings/FormField";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

type NewWine = {
	denomination: string;
	winemaker: string;
	vintage: number;
};

const defaultFormData: NewWine = {
	denomination: "",
	winemaker: "",
	vintage: 0,
};

export default function ToDrink() {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const { refreshWines } = useData();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formData, setFormData] = useState<NewWine>(defaultFormData);

	const handleTrash = async () => {
		setErrors({});
		setFormData(defaultFormData);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
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
			padding: 20,
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
		addButton: {
			height: 40,
			marginTop: 10,
			borderRadius: 15,
			marginBottom: 10,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.amber,
		},
	});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.denomination.trim()) {
			newErrors.denomination = `${t("new.tasting.denomination")} ${t("new.required")}`;
		}

		if (!formData.winemaker.trim()) {
			newErrors.winemaker = `${t("new.tasting.winemaker")} ${t("new.required")}`;
		}

		if (!formData.vintage) {
			newErrors.vintage = `${t("new.tasting.vintage")} ${t("new.required")}`;
		} else if (!/^\d{4}$/.test(formData.vintage.toString().trim())) {
			newErrors.vintage = `${t("new.tasting.vintage")} ${t("new.tasting.vintage_dig_err")}`;
		} else if (formData.vintage < 1000 || formData.vintage > 2025) {
			newErrors.vintage = `${t("new.tasting.vintage")} ${t("new.tasting.vintage_range_err")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleAdd = async () => {
		if (!validateForm()) return;
		try {
			setLoading(true);
			await WinesAPI.createWine(formData);
			refreshWines();
			setFormData(defaultFormData);
			router.replace("/(tabs)/new");
			router.replace("/(tabs)/wines?tab=todrink");
		} catch (error) {
			console.error(`Add failed: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Card style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.sectionTitle}>{t("todrink_title")}</Text>
					</View>
					<FormField
						keyboardType='default'
						error={errors.denomination}
						value={formData.denomination}
						label={t("new.tasting.denomination")}
						onChangeText={text => setFormData({ ...formData, denomination: text })}
					/>

					<FormField
						keyboardType='default'
						error={errors.winemaker}
						value={formData.winemaker}
						label={t("new.tasting.winemaker")}
						onChangeText={text => setFormData({ ...formData, winemaker: text })}
					/>

					<FormField
						keyboardType='numeric'
						error={errors.vintage}
						value={formData.vintage !== 0 ? `${formData.vintage}` : ""}
						label={`${t("new.tasting.vintage")} (YYYY)`}
						onChangeText={text => setFormData({ ...formData, vintage: Number(text) })}
					/>

					<TouchableOpacity
						disabled={loading}
						activeOpacity={0.5}
						style={styles.addButton}
						onPress={handleAdd}
					>
						{loading ? (
							<ActivityIndicator animating color={theme.colors.white} />
						) : (
							<Text
								style={{
									color: theme.colors.white,
									fontFamily: "Epilogue-Regular",
									fontSize: 20,
								}}
							>
								{t("new.add_wine")}
							</Text>
						)}
					</TouchableOpacity>
				</Card>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
