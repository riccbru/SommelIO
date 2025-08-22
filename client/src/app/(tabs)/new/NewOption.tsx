import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { CaretRightIcon } from "phosphor-react-native";
import { RelativePathString, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	title: string;
	path: RelativePathString;
};

export default function NewOption({ title, path }: Props) {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const styles = StyleSheet.create({
		card: {
			elevation: 4,
			borderWidth: 2,
			marginBottom: 20,
			borderRadius: 16,
			shadowOpacity: 0.1,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		row: {
			flex: 1,
			height: 80,
			marginTop: 10,
			width: "100%",
			marginBottom: 10,
			alignItems: "center",
			flexDirection: "row",
			paddingHorizontal: 15,

			borderWidth: 1,
			elevation: 5,
			borderRadius: 15,
			borderColor: theme.colors.primary,

			justifyContent: "space-between",
			backgroundColor: theme.colors.card,
		},
		rowLabel: {
			fontSize: 19,
			fontFamily: "Epilogue-Bold",
			color: theme.colors.primary,
		},
		rowDescription: {
			fontSize: 16,
			fontFamily: "Epilogue-Regular",
			color: theme.colors.gray,
		},
	});

	const handlePress = () => {
		router.push(path);
	};

	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
			<View style={styles.row}>
				<View style={{ flexDirection: "column" }}>
					<Text style={styles.rowLabel}>{t(title)}</Text>
					<View style={{ height: 10 }} />
					<Text style={styles.rowDescription}>{t(`${title}_description`)}</Text>
				</View>
				<CaretRightIcon size={24} color={theme.colors.primary} />
			</View>
		</TouchableOpacity>
	);
}
