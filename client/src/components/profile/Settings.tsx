import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useLanguage } from "@/src/hooks/useLanguage";
import { InfoIcon, MoonIcon, TranslateIcon } from "phosphor-react-native";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

type Language = "en" | "it" | "fr";

export default function Settings() {
	const theme = useTheme();
	const { t } = useTranslation();
	const labels = ["🇬🇧 EN", "🇮🇹 IT", "🇫🇷 FR"];
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
			{/* <Card style={styles.card}> */}

			<View style={styles.row}>
				<View style={{ alignItems: "center", flexDirection: "row" }}>
					<MoonIcon
						size={28}
						weight={theme.dark ? "fill" : "bold"}
						color={theme.colors.primary}
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
							fontStyle={{ fontSize: 15, color: theme.colors.primary }}
							activeFontStyle={{ fontSize: 15, color: theme.dark ? "#000" : "#fff" }}
							onChange={e => {
								const i = e.nativeEvent.selectedSegmentIndex;
								setLanguage(langs[i]);
							}}
						/>
					</View>
				</View>
			</View>

			{/* Info & About Button */}
			<View style={styles.row}>
				<TouchableOpacity onPress={() => console.log("info & about dev")}>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<InfoIcon size={28} weight='bold' color={theme.colors.primary} />
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{t("profile.info")}</Text>
					</View>
				</TouchableOpacity>
			</View>

			{/* </Card> */}
		</>
	);
}
