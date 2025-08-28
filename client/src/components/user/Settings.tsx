import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useLanguage } from "@/src/hooks/useLanguage";
import SettingRow from "@/src/components/user/SettingRow";
import { View, Text, StyleSheet, Switch } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
	ChatCircleIcon,
	HandHeartIcon,
	InfoIcon,
	LockKeyIcon,
	MoonIcon,
	TranslateIcon,
} from "phosphor-react-native";

type Language = "it" | "fr" | "en";

export default function Settings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const labels = ["🇮🇹", "🇫🇷", "🇬🇧"];
	const langs: Language[] = ["it", "fr", "en"];
	const { language, setLanguage } = useLanguage();

	const settingsRow = [
		{ Icon: LockKeyIcon, label: t("profile.secpriv") },
		{ Icon: InfoIcon, label: t("profile.info") },
		{ Icon: ChatCircleIcon, label: t("profile.contactus") },
		{ Icon: HandHeartIcon, label: t("profile.contribute") },
	];

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
			height: 80,
			marginTop: 10,
			marginBottom: 10,
			alignItems: "center",
			flexDirection: "row",
			paddingHorizontal: 15,

			borderWidth: 1,
			elevation: 5,
			borderRadius: 15,
			borderColor: theme.colors.primary,

			justifyContent: "space-between",
			backgroundColor: theme.dark ? theme.colors.background : theme.colors.card,
		},
		rowLabel: {
			fontSize: 16,
			fontFamily: "Epilogue-Bold",
			color: theme.colors.primary,
		},
	});

	return (
		<>
			{/* Dark Theme Switch */}
			<View style={styles.row}>
				<View style={{ alignItems: "center", flexDirection: "row" }}>
					<MoonIcon
						size={28}
						color={theme.colors.primary}
						weight={theme.dark ? "fill" : "bold"}
					/>
					<View style={{ marginLeft: 5, marginRight: 5 }} />
					<Text style={styles.rowLabel}>{t("profile.dark")}</Text>
				</View>
				<Switch value={theme.isDark} onValueChange={theme.toggleTheme} />
			</View>

			{/* Language Segmented Control */}
			<View style={styles.row}>
				<View style={{ alignItems: "center", flexDirection: "row" }}>
					<TranslateIcon size={28} weight='bold' color={theme.colors.primary} />
					<View style={{ marginLeft: 5, marginRight: 5 }} />
					<View style={{ flexDirection: "column", marginLeft: 0 }}>
						<Text style={styles.rowLabel}>{t("profile.lang")}</Text>
						<View style={{ marginTop: 5, marginBottom: 5 }} />
						<SegmentedControl
							values={labels}
							tintColor={theme.colors.white}
							backgroundColor={theme.colors.card}
							selectedIndex={langs.indexOf(language)}
							style={{ width: 290, borderRadius: 10 }}
							fontStyle={{ fontSize: 28, color: theme.colors.primary }}
							activeFontStyle={{ fontSize: 28, color: theme.colors.background }}
							onChange={e => {
								const i = e.nativeEvent.selectedSegmentIndex;
								setLanguage(langs[i]);
							}}
						/>
					</View>
				</View>
			</View>

			{settingsRow.map((el, index) => (
				<SettingRow key={index} Icon={el.Icon} label={el.label} />
			))}
		</>
	);
}
