import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useLanguage } from "@/src/hooks/useLanguage";
import {
	ArrowUpRightIcon,
	ChatCircleIcon,
	InfoIcon,
	LockKeyIcon,
	MoonIcon,
	SunIcon,
	TranslateIcon,
} from "phosphor-react-native";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

type Language = "en" | "it" | "fr";

export default function Settings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const labels = ["🇬🇧", "🇮🇹", "🇫🇷"];
	const langs: Language[] = ["en", "it", "fr"];
	const { language, setLanguage } = useLanguage();

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
			paddingHorizontal: 15,
			alignItems: "center",
			flexDirection: "row",

			borderWidth: 1,
			elevation: 5,
			borderRadius: 15,
			borderColor: theme.colors.primary,

			justifyContent: "space-between",
			backgroundColor: theme.colors.card,
		},
		rowLabel: {
			fontSize: 16,
			fontFamily: "Epilogue-Bold",
			color: theme.colors.primary,
		},
	});

	return (
		<>
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
					{/* <GlobeIcon size={28} weight="bold" color={theme.colors.primary} /> */}
					<TranslateIcon size={28} weight='bold' color={theme.colors.primary} />
					<View style={{ marginLeft: 5, marginRight: 5 }} />
					<View style={{ flexDirection: "column" }}>
						<Text style={styles.rowLabel}>{t("profile.lang")}</Text>
						<View style={{ marginTop: 5, marginBottom: 5 }} />
						<SegmentedControl
							values={labels}
							selectedIndex={langs.indexOf(language)}
							style={{ width: 300, borderRadius: 10 }}
							tintColor={theme.dark ? "#fff" : "#000"}
							fontStyle={{ fontSize: 28, color: theme.colors.primary }}
							activeFontStyle={{ fontSize: 28, color: theme.dark ? "#000" : "#fff" }}
							onChange={e => {
								const i = e.nativeEvent.selectedSegmentIndex;
								setLanguage(langs[i]);
							}}
						/>
					</View>
				</View>
			</View>

			{/* Information */}
			<TouchableOpacity activeOpacity={0.7} onPress={() => console.log("clicked Information")}>
				<View style={styles.row}>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<InfoIcon size={28} weight='bold' color={theme.colors.primary} />
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{t("profile.info")}</Text>
					</View>
					<ArrowUpRightIcon size={24} weight='bold' color={theme.colors.primary} />
				</View>
			</TouchableOpacity>

			{/* Security & Privacy */}
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => console.log("clicked Security & Privacy")}
			>
				<View style={styles.row}>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<LockKeyIcon size={28} weight='bold' color={theme.colors.primary} />
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{t("profile.secpriv")}</Text>
					</View>
					<ArrowUpRightIcon size={24} weight='bold' color={theme.colors.primary} />
				</View>
			</TouchableOpacity>

			{/* Contact Us */}
			<TouchableOpacity activeOpacity={0.7} onPress={() => console.log("clicked Contact Us")}>
				<View style={styles.row}>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<ChatCircleIcon size={28} weight='bold' color={theme.colors.primary} />
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{t("profile.contactus")}</Text>
					</View>
					<ArrowUpRightIcon size={24} weight='bold' color={theme.colors.primary} />
				</View>
			</TouchableOpacity>
		</>
	);
}
