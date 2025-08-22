import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useLanguage } from "@/src/hooks/useLanguage";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
	ArrowUpRightIcon,
	ChatCircleIcon,
	InfoIcon,
	LockKeyIcon,
	MoonIcon,
	TranslateIcon,
} from "phosphor-react-native";

type Language = "en" | "it" | "fr";

export default function Settings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const labels = ["🇮🇹", "🇬🇧", "🇫🇷"];
	const langs: Language[] = ["it", "en", "fr"];
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
					<View style={{ flexDirection: "column" }}>
						<Text style={styles.rowLabel}>{t("profile.lang")}</Text>
						<View style={{ marginTop: 5, marginBottom: 5 }} />
						<SegmentedControl
							values={labels}
							tintColor={theme.colors.primary}
							selectedIndex={langs.indexOf(language)}
							style={{ width: 300, borderRadius: 10, paddingRight: 10 }}
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

			{/* Security & Privacy */}
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => console.log("clicked Security & Privacy")}
			>
				<View style={styles.row}>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<LockKeyIcon
							size={28}
							weight={theme.dark ? "fill" : "bold"}
							color={theme.colors.primary}
						/>
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{t("profile.secpriv")}</Text>
					</View>
					<ArrowUpRightIcon size={24} weight='bold' color={theme.colors.primary} />
				</View>
			</TouchableOpacity>

			{/* Information */}
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => console.log("clicked Information")}>
				<View style={styles.row}
			>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<InfoIcon
							size={28}
							weight={theme.dark ? "fill" : "bold"}
							color={theme.colors.primary}
						/>
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{t("profile.info")}</Text>
					</View>
					<ArrowUpRightIcon size={24} weight='bold' color={theme.colors.primary} />
				</View>
			</TouchableOpacity>

			{/* Contact Us */}
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => console.log("clicked Contact Us")}
			>
				<View style={styles.row}>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<ChatCircleIcon
							size={28}
							weight={theme.dark ? "fill" : "bold"}
							color={theme.colors.primary}
						/>
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{t("profile.contactus")}</Text>
					</View>
					<ArrowUpRightIcon size={24} weight='bold' color={theme.colors.primary} />
				</View>
			</TouchableOpacity>
		</>
	);
}
