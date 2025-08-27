import UserAPI from "@/src/services/user";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import UserProfile from "@/src/components/user/UserData";
import { useEffect, useLayoutEffect, useState } from "react";
import { ProhibitIcon, TrashIcon } from "phosphor-react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
	Animated,
	RefreshControl,
	ScrollView,
	StyleSheet,
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
};

const defaultUserInfo: UserInfoType = {
	admin: false,
	premium: false,
	username: "",
	full_name: "",
	email: "",
	uid: "",
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
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));
	const { cid } = useLocalSearchParams<{ cid: string }>();
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
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<TouchableOpacity
						activeOpacity={0.3}
						onPress={() => console.log(`block colleague ${user.username}`)}
					>
						<ProhibitIcon size={32} weight='bold' color={theme.colors.primary} />
					</TouchableOpacity>
					<View style={{ marginRight: 10 }} />
					<TouchableOpacity
						activeOpacity={0.3}
						onPress={() => console.log(`remove colleague ${user.username}`)}
					>
						<TrashIcon size={32} weight='bold' color={theme.colors.red} />
					</TouchableOpacity>
				</View>
			),
		});
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim, navigation, theme, user]);

	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				const [response] = await Promise.all([UserAPI.fetchUserStats(cid), delay]);
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

	return (
		<ScrollView
			style={styles.scrollview}
			refreshControl={
				<RefreshControl refreshing={loading} onRefresh={() => setRefresh(!refresh)} />
			}
		>
			<Animated.View style={{ opacity: fadeAnim }}>
				<UserProfile userData={user} userStats={stats} />
			</Animated.View>

			<View style={{ flexDirection: "column", justifyContent: "center" }}></View>
		</ScrollView>
	);
}
