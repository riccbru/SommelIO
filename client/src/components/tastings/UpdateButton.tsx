import { useTranslation } from "react-i18next";
import { PencilSimpleIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
	onPress: () => void;
};

export default function UpdateButton({ onPress }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();

	const styles = StyleSheet.create({
		button: {
			maxWidth: 250,
			borderWidth: 1,
			borderRadius: 15,
			alignSelf: "center",
			paddingVertical: 10,
			paddingHorizontal: 15,
			backgroundColor: theme.colors.green,
		},
		buttonView: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
		},
		buttonText: {
			fontSize: 20,
			marginTop: 3,
			marginLeft: 3,
			fontFamily: "Epilogue-Regular",
		},
	});

	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<View style={styles.buttonView}>
				<PencilSimpleIcon size={24} weight='bold' />
				<Text style={styles.buttonText}>{t("tastings.edit")}</Text>
			</View>
		</TouchableOpacity>
	);
}
