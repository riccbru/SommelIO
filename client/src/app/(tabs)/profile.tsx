import UserAPI from "@/src/services/user";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "@/src/hooks/useTheme";
import { getInitials } from "@/src/utils/utils";
import Stats from "@/src/components/profile/Stats";
import { useNavigation, useRouter } from "expo-router";
import { Avatar, Card, Divider } from "react-native-paper";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import SettingsBottomSheet from "@/src/components/profile/SettingsBottomSheet";
import {
	Animated,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { DevToLogoIcon, GearIcon, SignOutIcon } from "phosphor-react-native";

type UserStats = {
	totalTastings: number;
	favoriteTastings: number;
	ratedTastings: number;
};

const defaultStats: UserStats = {
	totalTastings: 0,
	favoriteTastings: 0,
	ratedTastings: 0,
};

export default function Profile() {
	const theme = useTheme();
	const router = useRouter();
	const navigation = useNavigation();
	const { accessToken, user, logout } = useAuth();

	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(false);
	const bottomSheetRef = useRef<BottomSheetMethods>(null);
	const [fadeAnim] = useState(new Animated.Value(0));
	const [stats, setStats] = useState<UserStats>(defaultStats);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.7}
					style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
					onPress={() => {
						bottomSheetRef.current?.expand();
					}}
				>
					<GearIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity
					activeOpacity={0.7}
					style={{ marginTop: 10, marginBottom: 10, marginRight: 20 }}
					onPress={() => {
						logout();
						router.replace("/login");
					}}
				>
					<SignOutIcon size={30} color={theme.colors.primary} />
				</TouchableOpacity>
			),
		});

		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
		}).start();
	}, [logout, navigation, router, theme, fadeAnim]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 5,
			backgroundColor: theme.colors.background,
		},
		profileCard: {
			elevation: 4,
			borderWidth: 2,
			marginBottom: 20,
			borderRadius: 16,
			shadowOpacity: 0.1,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.card,
		},
		profileHeader: {
			paddingVertical: 24,
			alignItems: "center",
		},
		avatarContainer: {
			elevation: 8,
			shadowRadius: 8,
			marginBottom: 16,
			shadowOpacity: 0.3,
			shadowColor: theme.colors.primary,
			shadowOffset: { width: 0, height: 4 },
		},
		userData: {
			fontSize: 28,
			marginBottom: 8,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		userEmail: {
			fontSize: 16,
			marginBottom: 16,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		divider: {
			width: "80%",
			marginTop: 16,
			marginBottom: 16,
			backgroundColor: theme.colors.primary,
		},
	});

	useEffect(() => {
		const fetchStats = async () => {
			setLoading(true);
			try {
				const response = await UserAPI.getStats(accessToken);
				setStats(response.stats);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, [accessToken, refresh]);

	return (
		<GestureHandlerRootView style={styles.container}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={() => setRefresh(!refresh)} />
				}
			>
				<Animated.View style={{ opacity: fadeAnim }}>
					{/* Profile Header Card */}
					<Card style={styles.profileCard}>
						{!user?.admin ? null : (
							<View style={{ position: "absolute", marginLeft: 10, marginTop: 5 }}>
								<DevToLogoIcon size={28} weight='fill' color={theme.colors.primary} />
							</View>
						)}

						<View style={styles.profileHeader}>
							<View style={styles.avatarContainer}>
								<Avatar.Text
									size={80}
									label={getInitials(user?.full_name || user?.username || "U")}
									style={{
										backgroundColor: theme.colors.primary,
									}}
									labelStyle={{
										color: theme.colors.surface,
										fontSize: 28,
										fontWeight: "700",
									}}
								/>
							</View>

							<Text style={styles.userData}>{user?.username}</Text>
							<Text style={styles.userEmail}>{user?.email}</Text>
							<Text style={styles.userData}>{user?.full_name}</Text>

							<Divider style={styles.divider} />

							{/* Stats Section */}
							<Stats stats={stats} />
						</View>
					</Card>
				</Animated.View>
			</ScrollView>

			{/* Settings BottomSheet */}
			<SettingsBottomSheet bottomSheetRef={bottomSheetRef} />
		</GestureHandlerRootView>
	);
}
