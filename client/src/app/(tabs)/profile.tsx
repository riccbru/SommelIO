import UserAPI from "@/src/services/user";
import { useAuth } from "@/src/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { getInitials } from "@/src/utils/utils";
import { useLanguage } from "@/src/hooks/useLanguage";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Card, Divider, SegmentedButtons } from "react-native-paper";
import {
	DevToLogoIcon,
	GavelIcon,
	GearIcon,
	SignOutIcon,
	StarIcon,
	WineIcon,
} from "phosphor-react-native";
import {
	Animated,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "@/src/hooks/useTheme";

type Stats = {
	totalTastings: number;
	favoriteTastings: number;
	ratedTastings: number;
};

const defaultStats: Stats = {
	totalTastings: 0,
	favoriteTastings: 0,
	ratedTastings: 0,
};

export default function Profile() {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { language, setLanguage } = useLanguage();
	const { accessToken, user, logout } = useAuth();

	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));
	const [stats, setStats] = useState<Stats>(defaultStats);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
					onPress={() => {
						console.log(`User settings`);
					}}
				>
					<GearIcon size={32} color={theme.colors.primary} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity
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
			padding: 16,
			backgroundColor: theme.colors.background,
		},
		profileCard: {
			elevation: 4,
			borderWidth: 2,
			marginBottom: 20,
			borderRadius: 16,
			shadowOpacity: 0.1,
			borderColor: theme.colors.primary,
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
		userName: {
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
		statsContainer: {
			paddingVertical: 16,
			flexDirection: "row",
			justifyContent: "space-around",
		},
		statItem: {
			flex: 1,
			alignItems: "center",
		},
		statNumber: {
			fontSize: 24,
			marginBottom: 4,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		statLabel: {
			fontSize: 12,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		infoCard: {
			borderRadius: 12,
			marginBottom: 16,
		},
		infoRow: {
			paddingVertical: 16,
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 20,
		},
		infoIcon: {
			width: 24,
			marginRight: 16,
			alignItems: "center",
		},
		infoLabel: {
			flex: 1,
			fontSize: 14,
			marginBottom: 2,
			fontWeight: "600",
			fontFamily: "Epilogue",
			color: theme.colors.primary,
		},
		infoValue: {
			flex: 2,
			fontSize: 16,
			fontFamily: "Epilogue",
			color: theme.colors.primary,
		},
		actionButtons: {
			gap: 12,
			marginTop: 20,
		},
		actionButton: {
			borderRadius: 12,
			paddingVertical: 4,
		},
		wineIcon: {
			marginBottom: 8,
		},
		settingsCard: {
			padding: 12,
			marginTop: 16,
		},
		row: {
			paddingVertical: 8,
			marginLeft: 15,
			marginRight: 15,
			marginTop: 10,
			marginBottom: 10,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		rowLabel: {
			fontSize: 16,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
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

	const StatItem = ({ icon, number, label, color = theme.colors.primary }: any) => (
		<View style={styles.statItem}>
			<View style={styles.wineIcon}>{icon}</View>
			<Text style={[styles.statNumber, { color }]}>{number}</Text>
			<Text style={styles.statLabel}>{label}</Text>
		</View>
	);

	return (
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
					{!user?.admin ? (
						<></>
					) : (
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

						<Text style={styles.userName}>{user?.username}</Text>
						<Text style={styles.userName}>{user?.full_name}</Text>

						<Divider
							style={{
								width: "80%",
								marginTop: 16,
								marginBottom: 16,
								backgroundColor: theme.colors.primary,
							}}
						/>

						{/* Stats Section */}
						<View style={styles.statsContainer}>
							<StatItem
								color={theme.colors.primary}
								number={stats.totalTastings}
								label={t("profile.tastings.total").replace(" ", "\n")}
								icon={<WineIcon size={24} weight='fill' color={theme.colors.primary} />}
							/>
							<StatItem
								color={theme.colors.amber}
								number={stats.favoriteTastings}
								label={t("profile.tastings.favorite").replace(" ", "\n")}
								icon={<StarIcon size={24} weight='fill' color={theme.colors.amber} />}
							/>
							<StatItem
								color={theme.colors.green}
								number={stats.ratedTastings}
								label={t("profile.tastings.rated").replace(" ", "\n")}
								icon={<GavelIcon size={24} weight='fill' color={theme.colors.green} />}
							/>
						</View>
					</View>
				</Card>

				{/* Dark Theme Switch */}
				<Card style={styles.profileCard}>
					<View style={styles.row}>
						<Text style={styles.rowLabel}>{t("profile.dark")}</Text>
						<Switch value={theme.isDark} onValueChange={theme.toggleTheme} />
					</View>

					<Divider />

					{/* Language Selector */}
					<View style={styles.row}>
						<View style={{ flex: 1, flexDirection: "column" }}>
							<Text style={styles.rowLabel}>{t("profile.lang")}</Text>
							<SegmentedButtons
								value={language}
								style={{ marginTop: 8 }}
								onValueChange={val => setLanguage(val)}
								buttons={[
									{ value: "en", label: "🇬🇧" },
									{ value: "it", label: "🇮🇹" },
									{ value: "fr", label: "🇫🇷" },
								]}
							/>
						</View>
					</View>

					<Divider />

					{/* Info & About Button */}
					<TouchableOpacity style={styles.row} onPress={() => console.log("info & about dev")}>
						<Text style={styles.rowLabel}>{t("profile.info")}</Text>
					</TouchableOpacity>
				</Card>
			</Animated.View>
		</ScrollView>
	);
}
