import UserAPI from "@/src/services/user";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import ColleaguesAPI from "@/src/services/colleagues";
import UserProfile from "@/src/components/user/UserProfile";
import { Divider, Modal, Portal } from "react-native-paper";
import { useEffect, useLayoutEffect, useState } from "react";
import UserSkeleton from "@/src/components/user/UserSkeleton";
import ConfirmButton from "@/src/components/colleagues/ConfirmActionButton";
import { ProhibitIcon, TrashIcon, WarningIcon } from "phosphor-react-native";
import { useLocalSearchParams, useNavigation, usePathname, useRouter } from "expo-router";
import {
	Animated,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type UserInfoType = {
	admin: boolean;
	premium: boolean;
	username: string;
	email: string;
	full_name: string;
	uid: string;
	image_url: string;
};

const defaultUserInfo: UserInfoType = {
	admin: false,
	premium: false,
	username: "",
	full_name: "",
	email: "",
	uid: "",
	image_url: "",
};

type UserStatsType = {
	totalTastings: number;
	favoriteTastings: number;
	ratedTastings: number;
};

const defaultUserStats: UserStatsType = {
	totalTastings: 0,
	favoriteTastings: 0,
	ratedTastings: 0,
};

export default function ColleagueDetail() {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const pathname = usePathname();
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));
	const { cid, public: isPublic } = useLocalSearchParams<{ cid: string, public?: string }>();
	const { refreshColleagues, refreshBlocked } = useData();
	const [user, setUser] = useState<UserInfoType>(defaultUserInfo);
	const [stats, setStats] = useState<UserStatsType>(defaultUserStats);

	const styles = StyleSheet.create({
		scrollview: {
			flex: 1,
			padding: 10,
			backgroundColor: theme.colors.background,
		},
		card: {
			borderWidth: 2,
			borderRadius: 20,
			alignItems: "center",
			justifyContent: "center",
			borderColor: theme.colors.primary,
		},
		text: {
			fontSize: 15,
			fontFamily: "Epilogue-Bold",
			color: theme.colors.primary,
		},
		modalContent: {
			margin: 30,
			padding: 25,
			borderWidth: 5,
			borderRadius: 50,
			borderColor: theme.colors.yellow,
			backgroundColor: theme.colors.background,
		},
		modalContainer: {
			gap: 15,
			alignItems: "center",
			flexDirection: "column",
		},
		modalTitle: {
			fontSize: 20,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		touchables: {
			width: 150,
			borderRadius: 15,
			paddingVertical: 10,
			paddingHorizontal: 15,
		},
		buttonsLayout: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
		},
		buttonsText: {
			fontSize: 18,
			marginTop: 3,
			marginLeft: 3,
			fontFamily: "Epilogue-Bold",
		},
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			title: user.username,
			headerTitleStyle: {
				fontSize: 20,
				color: theme.colors.primary,
				fontFamily: "Epilogue-Regular",
			},
			headerRight: () => (
				<TouchableOpacity activeOpacity={0.3} onPress={() => setModal(true)}>
					<WarningIcon size={32} weight='fill' color={theme.colors.yellow} />
				</TouchableOpacity>
			),
		});
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim, navigation, theme, user]);

	useEffect(() => {
		console.log(pathname);
		const fetchUserStats = async () => {
			setLoading(true);
			try {
				const response = await UserAPI.fetchUserStats(cid);
				setUser(response.user);
				setStats(response.stats);
			} catch (error) {
				console.error("Error fetching tasting:", error);
			} finally {
				setLoading(false);
			}
		};
		if (cid) {
			fetchUserStats();
		}
	}, [cid, refresh]);

	const handleConfirm = async (action: "block" | "remove") => {
		if (action.toLowerCase() === "block") {
			await ColleaguesAPI.blockColleague(cid);
		} else if (action.toLowerCase() === "remove") {
			await ColleaguesAPI.removeColleague(cid);
		} else {
			console.log(`Action ${action} not supported`);
		}
		refreshBlocked();
		refreshColleagues();
		router.back();
	};

	return (
		<>
			<ScrollView
				style={styles.scrollview}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={() => setRefresh(!refresh)} />
				}
			>
				{loading ? <UserSkeleton /> : <UserProfile userData={user} userStats={stats} />}

				<View style={{ flexDirection: "column", justifyContent: "center" }}></View>
			</ScrollView>
			<Portal>
				<Modal
					dismissable
					visible={modal}
					onDismiss={() => setModal(false)}
					contentContainerStyle={styles.modalContent}
				>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>
							{t("colleagues.actions")}
							<Text style={{ fontFamily: "Epilogue-Bold" }}>{user.username}</Text>
						</Text>
						<Divider bold style={{ marginBottom: 10, width: "95%" }} />

						<ConfirmButton
							Icon={ProhibitIcon}
							bgColor={theme.colors.yellow}
							label={t("colleagues.block")}
							confirmLabel={t("colleagues.confirm")}
							onConfirm={() => handleConfirm("block")}
							textColor={theme.dark ? theme.colors.gray : theme.colors.primary}
							iconColor={theme.dark ? theme.colors.gray : theme.colors.primary}
						/>

						<ConfirmButton
							Icon={TrashIcon}
							bgColor={theme.colors.red}
							label={t("colleagues.remove")}
							iconColor={theme.colors.primary}
							textColor={theme.colors.primary}
							onConfirm={() => handleConfirm("remove")}
							confirmLabel={t("colleagues.confirm")}
						/>
					</View>
				</Modal>
			</Portal>
		</>
	);
}
