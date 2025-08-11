import UserAPI from "@/src/services/user";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Card, Divider, useTheme } from "react-native-paper";
import { GavelIcon, GearIcon, SignOutIcon, StarIcon, WineIcon } from "phosphor-react-native";
import {
	Animated,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function User() {
	const theme = useTheme();
	const router = useRouter();
	const { accessToken, user, logout } = useAuth();
	const navigation = useNavigation();
	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));
	const [stats, setStats] = useState({
		totalTastings: 0,
		favoriteTastings: 0,
		averageRating: 0.0,
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
					onPress={() => {
						console.log("profile settings");
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

		// Fade in animation
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
		}).start();
	}, [logout, navigation, router, theme, fadeAnim]);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
			padding: 16,
		},
		profileCard: {
			marginBottom: 20,
			backgroundColor: theme.colors.pearl,
			borderRadius: 16,
			elevation: 4,
			shadowColor: theme.colors.primary,
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.1,
			shadowRadius: 8,
		},
		profileHeader: {
			alignItems: "center",
			paddingVertical: 24,
		},
		avatarContainer: {
			marginBottom: 16,
			elevation: 8,
			shadowColor: theme.colors.primary,
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.3,
			shadowRadius: 8,
		},
		userName: {
			fontSize: 28,
			marginBottom: 8,
			fontWeight: "700",
			color: "#000000",
			textAlign: "center",
			fontFamily: "Epilogue",
		},
		userEmail: {
			fontSize: 16,
			fontFamily: "Epilogue",
			color: theme.colors.gray,
			textAlign: "center",
			marginBottom: 16,
		},
		statsContainer: {
			flexDirection: "row",
			justifyContent: "space-around",
			paddingVertical: 16,
		},
		statItem: {
			alignItems: "center",
			flex: 1,
		},
		statNumber: {
			fontSize: 24,
			fontWeight: "700",
			fontFamily: "Epilogue",
			color: theme.colors.primary,
			marginBottom: 4,
		},
		statLabel: {
			fontSize: 12,
			fontFamily: "Epilogue",
			color: theme.colors.gray,
			textAlign: "center",
		},
		infoCard: {
			marginBottom: 16,
			backgroundColor: theme.colors.surface,
			borderRadius: 12,
		},
		infoRow: {
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: 16,
			paddingHorizontal: 20,
		},
		infoIcon: {
			marginRight: 16,
			width: 24,
			alignItems: "center",
		},
		infoLabel: {
			fontSize: 14,
			fontWeight: "600",
			fontFamily: "Epilogue",
			color: theme.colors.gray,
			marginBottom: 2,
			flex: 1,
		},
		infoValue: {
			fontSize: 16,
			fontFamily: "Epilogue",
			color: theme.colors.text,
			flex: 2,
		},
		actionButtons: {
			marginTop: 20,
			gap: 12,
		},
		actionButton: {
			borderRadius: 12,
			paddingVertical: 4,
		},
		wineIcon: {
			marginBottom: 8,
		},
	});

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map(word => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

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

						<Text style={styles.userEmail}>{user?.email}</Text>
						<Text style={styles.userEmail}>{user?.uid}</Text>

						<Divider style={{ width: "90%", marginBottom: 16 }} />

						{/* Stats Section */}
						<View style={styles.statsContainer}>
							<StatItem
								label='Total Tastings'
								color={"#000000"}
								number={stats.totalTastings}
								icon={<WineIcon size={24} color={"#000000"} />}
							/>
							<StatItem
								label='Favorite Tastings'
								color={theme.colors.amber}
								number={stats.favoriteTastings}
								icon={<StarIcon size={24} color={theme.colors.amber} />}
							/>
							<StatItem
								label='Average Rating'
								color={theme.colors.green}
								number={stats.averageRating}
								icon={<GavelIcon size={24} color={theme.colors.green} />}
							/>
						</View>
					</View>
				</Card>
			</Animated.View>
		</ScrollView>
	);
}
