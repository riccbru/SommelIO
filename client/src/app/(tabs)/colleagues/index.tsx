import { useNavigation } from "expo-router";
import { useData } from "@/src/hooks/useData";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { BellIcon } from "phosphor-react-native";
import ColleaguesAPI from "@/src/services/colleagues";
import { useLayoutEffect, useState, useMemo } from "react";
import ColleagueItem from "@/src/components/colleagues/ColleagueItem";
import ColleaguesList from "@/src/components/colleagues/ColleaguesList";
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Result = {
	username: string;
	full_name: string;
	uid: string;
};

export default function Colleagues() {
	const theme = useTheme();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState("");
	const [apiResult, setApiResult] = useState<Result[]>([]);
	const { loading, colleagues, refreshColleagues } = useData();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		searchBarContainer: {
			marginHorizontal: 5,
			marginTop: 10,
			backgroundColor: theme.colors.background,
		},
		searchbar: {
			marginVertical: 5,
		},
		centeredContainer: {
			flex: 1,
			marginTop: 50,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		text: {
			fontSize: 22,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		colleaguesContainer: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: theme.colors.background,
		},
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => console.log("Check notifications")}
				>
					<BellIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
		});
	}, [navigation, theme]);

	const filteredColleagues = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return colleagues;
		return colleagues.filter(
			c =>
				c.colleague.username.toLowerCase().includes(query) ||
				c.colleague.full_name.toLowerCase().includes(query)
		);
	}, [searchQuery, colleagues]);

	const handleSearchBarChange = (text: string) => {
		setSearchQuery(text);
		if (!text.trim()) {
			setApiResult([]);
		}
	};

	const handleSubmit = async () => {
		if (!searchQuery.trim()) {
			setApiResult([]);
			return;
		}
		try {
			const users = await ColleaguesAPI.searchColleague(searchQuery.trim());
			setApiResult(users);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const displayList = apiResult.length ? apiResult : filteredColleagues;

	return (
		<View style={styles.container}>
			<View style={styles.searchBarContainer}>
				<Searchbar
					value={searchQuery}
					style={styles.searchbar}
					onSubmitEditing={handleSubmit}
					onChangeText={handleSearchBarChange}
					placeholder={t("colleagues.searchbar")}
				/>
			</View>

			<ScrollView
				style={styles.colleaguesContainer}
				keyboardShouldPersistTaps='handled'
				refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshColleagues} />}
			>
				{!displayList.length ? (
					<View style={styles.centeredContainer}>
						<Text style={styles.text}>{t("wine_notFound")}</Text>
					</View>
				) : (
					<>
						{apiResult.length ? (
							apiResult.map((user, index) => <ColleagueItem key={index} user={user} />)
						) : (
							<ColleaguesList colleagues={filteredColleagues} searchQuery='' />
						)}
					</>
				)}
			</ScrollView>
		</View>
	);
}
