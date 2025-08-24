import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { BellIcon, UserPlusIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Colleagues() {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => console.log("add colleague")}
					style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
				>
					<UserPlusIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => console.log("add colleague")}
					style={{ marginTop: 10, marginBottom: 10, marginRight: 20 }}
				>
					<BellIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
		});
	}, [navigation, theme]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 30,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{t("colleagues.title")}</Text>
		</View>
	);
}
