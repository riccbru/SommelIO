import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

type OlfactoryExam = {
	intensity: string;
	complexity: string;
	quality: string;
	description: {
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
	};
	notes: string;
};

type Props = {
	exam: OlfactoryExam;
};

export default function OlfactoryDetails({ exam }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	if (!exam || Object.keys(exam).length === 0) {
		return <Text>{}</Text>;
	}

	const styles = StyleSheet.create({
		row: {
			marginBottom: 5,
			flexDirection: "row",
			alignItems: "center",
		},
		label: {
			flex: 1,
			marginLeft: 10,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		value: {
			flex: 1,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		descriptorsHeader: {
			marginTop: 10,
			marginLeft: 10,
			marginBottom: 5,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		descriptorRow: {
			marginBottom: 3,
			paddingLeft: 25,
			flexDirection: "row",
			alignItems: "center",
		},
		descriptorLabel: {
			flex: 1,
			marginLeft: 5,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		descriptorValue: {
			flex: 1,
			textAlign: "center",
			color: theme.colors.primary,
		},
		notes: {
			marginTop: 10,
		},
		notesRow: {
			marginTop: 15,
			paddingTop: 10,
			borderTopWidth: 1,
			borderTopColor: theme.colors.gray,
		},
		notesTitle: {
			marginTop: 10,
			marginLeft: 10,
			marginBottom: 4,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		notesText: {
			lineHeight: 20,
			marginLeft: 15,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	});

	const booleanFields = [
		{ label: t("new.olfactory.aromatic"), value: exam.description.aromatic },
		{ label: t("new.olfactory.vinous"), value: exam.description.vinous },
		{ label: t("new.olfactory.floral"), value: exam.description.floral },
		{ label: t("new.olfactory.fruity"), value: exam.description.fruity },
		{ label: t("new.olfactory.grassy"), value: exam.description.grassy },
		{ label: t("new.olfactory.mineral"), value: exam.description.mineral },
		{ label: t("new.olfactory.fragrant"), value: exam.description.fragrant },
		{ label: t("new.olfactory.spicy"), value: exam.description.spicy },
		{ label: t("new.olfactory.toasted"), value: exam.description.toasted },
		{ label: t("new.olfactory.ethereal"), value: exam.description.ethereal },
	];

	return (
		<View>
			<View style={styles.row}>
				<Text style={styles.label}>{t("new.intensity")}</Text>
				<Text style={styles.value}>
					{t(`new.olfactory.values.intensity.${exam.intensity}`).toUpperCase()}
				</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>{t("new.olfactory.complexity")}</Text>
				<Text style={styles.value}>
					{t(`new.olfactory.values.complexity.${exam.complexity}`).toUpperCase()}
				</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>{t("new.quality")}</Text>
				<Text style={styles.value}>
					{t(`new.olfactory.values.quality.${exam.quality}`).toUpperCase()}
				</Text>
			</View>

			<Text style={styles.descriptorsHeader}>{t("new.olfactory.descriptors")}</Text>
			{booleanFields.map(({ label, value }) => (
				<View key={label} style={styles.descriptorRow}>
					<Text style={styles.descriptorLabel}>{label}</Text>
					<Text style={styles.descriptorValue}>{value ? "X" : "-"}</Text>
				</View>
			))}

			{exam.notes && (
				<View style={styles.notesRow}>
					<Text style={styles.notesTitle}>{t("new.notes")}</Text>
					<Text style={styles.notesText}>{exam.notes}</Text>
				</View>
			)}
		</View>
	);
}
