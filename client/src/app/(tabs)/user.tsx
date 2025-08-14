import UserAPI from "@/src/services/user";
import { useAuth } from "@/src/hooks/useAuth";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Card, Divider, useTheme } from "react-native-paper";
import { GavelIcon, GearIcon, SignOutIcon, StarIcon, WineIcon } from "phosphor-react-native";
import {
	Animated,
	Linking,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { getInitials } from "@/src/utils/utils";

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
		ratedTastings: 0,
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
					onPress={() => {
						console.log(`User ${user?.uid} settings`);
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
			backgroundColor: theme.colors.background,
			padding: 16,
		},
		profileCard: {
			elevation: 4,
			shadowRadius: 8,
			marginBottom: 20,
			borderRadius: 16,
			shadowOpacity: 0.1,
			shadowColor: theme.colors.primary,
			backgroundColor: theme.colors.pearl,
			shadowOffset: { width: 0, height: 4 }
		},
		profileHeader: {
			paddingVertical: 24,
			alignItems: "center"
		},
		avatarContainer: {
			elevation: 8,
			shadowRadius: 8,
			marginBottom: 16,
			shadowOpacity: 0.3,
			shadowColor: theme.colors.primary,
			shadowOffset: { width: 0, height: 4 }
		},
		userName: {
			fontSize: 28,
			marginBottom: 8,
			color: "#000000",
			textAlign: "center",
			fontFamily: "Epilogue-Bold"
		},
		userEmail: {
			fontSize: 16,
			marginBottom: 16,
			textAlign: "center",
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular"
		},
		statsContainer: {
			paddingVertical: 16,
			flexDirection: "row",
			justifyContent: "space-around"
		},
		statItem: {
			flex: 1,
			alignItems: "center"
		},
		statNumber: {
			fontSize: 24,
			marginBottom: 4,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold"
		},
		statLabel: {
			fontSize: 12,
			textAlign: "center",
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular"
		},
		infoCard: {
			borderRadius: 12,
			marginBottom: 16,
			backgroundColor: theme.colors.surface
		},
		infoRow: {
			paddingVertical: 16,
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 20
		},
		infoIcon: {
			width: 24,
			marginRight: 16,
			alignItems: "center"
		},
		infoLabel: {
			flex: 1,
			fontSize: 14,
			marginBottom: 2,
			fontWeight: "600",
			fontFamily: "Epilogue",
			color: theme.colors.gray
		},
		infoValue: {
			flex: 2,
			fontSize: 16,
			fontFamily: "Epilogue",
			color: theme.colors.text
		},
		actionButtons: {
			gap: 12,
			marginTop: 20
		},
		actionButton: {
			borderRadius: 12,
			paddingVertical: 4
		},
		wineIcon: {
			marginBottom: 8
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
								icon={<WineIcon size={24} weight='fill' color={"#000000"} />}
							/>
							<StatItem
								label='Favorite Tastings'
								color={theme.colors.amber}
								number={stats.favoriteTastings}
								icon={<StarIcon size={24} weight='fill' color={theme.colors.amber} />}
							/>
							<StatItem
								label='Rated Tastings'
								color={theme.colors.green}
								number={stats.ratedTastings}
								icon={<GavelIcon size={24} weight='fill' color={theme.colors.green} />}
							/>
						</View>

						{/* Footer Developer */}
						<View style={{ marginTop: 24, alignItems: "center" }}>
							<Text style={{ fontSize: 12, color: theme.colors.gray, fontFamily: "Epilogue" }}>
								Developed by Riccardo Bruno
							</Text>
							<View style={{ flexDirection: "row", marginTop: 8, gap: 12 }}>
								<TouchableOpacity
									onPress={() => {
										Linking.openURL("mailto:riccbru@sommel.io");
									}}
								>
									<Avatar.Icon
										size={36}
										icon="email"
										style={{ backgroundColor: theme.colors.primary }}
										color={theme.colors.surface}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https://github.com/riccbru");
									}}
								>
									<Avatar.Icon
										size={36}
										icon="github"
										style={{ backgroundColor: theme.colors.primary }}
										color={theme.colors.surface}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https://linkedin.com/in/riccbrun");
									}}
								>
									<Avatar.Icon
										size={36}
										icon="linkedin"
										style={{ backgroundColor: theme.colors.primary }}
										color={theme.colors.surface}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Card>
			</Animated.View>
		</ScrollView>
	);
}
