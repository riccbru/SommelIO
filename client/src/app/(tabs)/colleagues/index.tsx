import { useLayoutEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { BellIcon, UserPlusIcon } from "phosphor-react-native";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useData } from "@/src/hooks/useData";
import { Searchbar } from "react-native-paper";
import ColleaguesList from "@/src/components/colleagues/ColleaguesList";

export default function Colleagues() {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState("");
	const { loading, colleagues, refreshColleagues } = useData();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log("add colleague")}>
					<UserPlusIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log("add colleague")}>
					<BellIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
		});
	}, [navigation, theme]);

	const styles = StyleSheet.create({
		centeredContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		searchBarContainer: {
			marginLeft: 5,
			marginRight: 5,
			marginTop: 10,
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 22,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		container: {
			backgroundColor: theme.colors.background,
		},
		colleaguesContainer: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: theme.colors.background,
		},
	});

	return (
		<>
			{!colleagues.length ? (
				<View style={styles.centeredContainer}>
					<Text style={styles.text}>{t("wine_notFound")}</Text>
				</View>
			) : (
				<>
					<View style={styles.container}>
						<View style={styles.searchBarContainer}>
							<Searchbar
								value={searchQuery}
								onChangeText={setSearchQuery}
								placeholder={t("colleagues.searchbar")}
								style={{ marginTop: 5, marginBottom: 5 }}
							/>
						</View>
					</View>
					<ScrollView
						style={styles.colleaguesContainer}
						keyboardShouldPersistTaps='handled'
						refreshControl={
							<RefreshControl refreshing={loading} onRefresh={refreshColleagues} />
						}
					>
						<ColleaguesList colleagues={colleagues} searchQuery={searchQuery} />
					</ScrollView>
				</>
			)}
		</>
	);
}
