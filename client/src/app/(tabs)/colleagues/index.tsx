import { useNavigation } from "expo-router";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useLayoutEffect, useState } from "react";
import ColleaguesAPI from "@/src/services/colleagues";
import { Modal, Portal, Searchbar } from "react-native-paper";
import { BellIcon, UserPlusIcon } from "phosphor-react-native";
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
	const [modal, setModal] = useState(false);
	const [text, setText] = useState(t("colleagues.addModal"));
	const [result, setResult] = useState<Result[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [colleagueSearch, setColleagueSearch] = useState("");
	const { loading, colleagues, refreshColleagues } = useData();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity activeOpacity={0.5} onPress={() => setModal(true)}>
					<UserPlusIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => console.log("check notifications")}
				>
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
		searchbar: {
			marginTop: 5,
			marginBottom: 5,
		},
		colleaguesContainer: {
			flex: 1,
			flexDirection: "column",
			backgroundColor: theme.colors.background,
		},
		modalContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "rgba(0, 0, 0, 0.8)",
		},
		modalCard: {
			width: 350,
			height: 350,
			padding: 15,
			borderWidth: 2,
			borderRadius: 20,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		username: {
			fontSize: 20,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		fullName: {
			fontSize: 16,
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular",
		},
	});

	const hideModal = async () => {
		setResult([]);
		setModal(false);
		setColleagueSearch("");
		setText(t("colleagues.addModal"));
	};

	const handleSearch = async () => {
		try {
			const users = await ColleaguesAPI.searchColleague(colleagueSearch);
			if (!users.length) setText(t("colleagues.notFound"));
			setResult(users);
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.searchBarContainer}>
					<Searchbar
						value={searchQuery}
						style={styles.searchbar}
						onChangeText={setSearchQuery}
						placeholder={t("colleagues.searchbar")}
					/>
				</View>
			</View>

			{!colleagues.length ? (
				<View style={styles.centeredContainer}>
					<Text style={styles.text}>{t("wine_notFound")}</Text>
				</View>
			) : (
				<ScrollView
					style={styles.colleaguesContainer}
					keyboardShouldPersistTaps='handled'
					refreshControl={
						<RefreshControl refreshing={loading} onRefresh={refreshColleagues} />
					}
				>
					<ColleaguesList colleagues={colleagues} searchQuery={searchQuery} />
				</ScrollView>
			)}

			<Portal>
				<Modal dismissable visible={modal} onDismiss={hideModal}>
					<View style={styles.modalContainer}>
						<View style={styles.modalCard}>
							<Searchbar
								value={colleagueSearch}
								style={styles.searchbar}
								onSubmitEditing={handleSearch}
								onChangeText={setColleagueSearch}
								placeholder={t("colleagues.add_searchbar")}
							/>
							<ScrollView>
								{!result.length ? (
									<View style={{ justifyContent: "center", alignItems: "center" }}>
										<Text
											style={{
												fontSize: 20,
												marginTop: 50,
												fontFamily: "Epilogue-Bold",
												color: theme.colors.primary,
											}}
										>
											{text}
										</Text>
									</View>
								) : (
									<>
										{result.map((el, index) => (
											<ColleagueItem key={index} user={el} />
										))}
									</>
								)}
							</ScrollView>
						</View>
					</View>
				</Modal>
			</Portal>
		</>
	);
}
