import { useAuth } from "@/src/hooks/useAuth";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import UserProfile from "@/src/components/user/UserProfile";
import UserSkeleton from "@/src/components/user/UserSkeleton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingsBottomSheet from "@/src/components/user/SettingsBottomSheet";
import { CaretRightIcon, GearIcon, SignOutIcon } from "phosphor-react-native";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
	Animated,
	Platform,
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
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { user, logout } = useAuth();
	const { loading, stats, refreshStats } = useData();
	const [fadeAnim] = useState(new Animated.Value(0));
	const bottomSheetRef = useRef<BottomSheetMethods>(null);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				return Platform.OS !== "ios" ? (
					<></>
				) : (
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							bottomSheetRef.current?.expand();
						}}
					>
						<GearIcon
							size={32}
							weight={theme.dark ? "fill" : "regular"}
							color={theme.colors.primary}
						/>
					</TouchableOpacity>
				);
			},
			headerRight: () => (
				<>
					{Platform.OS === "ios" ? (
						<></>
					) : (
						<>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => {
									bottomSheetRef.current?.expand();
								}}
							>
								<GearIcon
									size={32}
									weight={theme.dark ? "fill" : "regular"}
									color={theme.colors.primary}
								/>
							</TouchableOpacity>
							<View style={{ marginRight: 10 }} />
						</>
					)}
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							logout();
							router.replace("/login");
						}}
					>
						<SignOutIcon size={30} color={theme.colors.primary} />
					</TouchableOpacity>
				</>
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

	return (
		<GestureHandlerRootView style={styles.container}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={loading.stats} onRefresh={refreshStats} />}
			>
				<Animated.View style={{ opacity: fadeAnim }}>
					{/* User Profile Card */}
					{loading.stats ? (
						<UserSkeleton />
					) : (
						<UserProfile userData={user} userStats={stats} />
					)}

					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => router.push("/(tabs)/profile/blocked")}
					>
						<View style={[styles.profileCard, { height: 60 }]}>
							<View
								style={{
									padding: 15,
									alignItems: "center",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{
										fontSize: 20,
										fontFamily: "Epilogue-Regular",
										color: theme.colors.primary,
									}}
								>
									{t("profile.blocked")}
								</Text>
								<CaretRightIcon size={28} weight='bold' color={theme.colors.primary} />
							</View>
						</View>
					</TouchableOpacity>
				</Animated.View>
			</ScrollView>

			{/* Settings BottomSheet */}
			<SettingsBottomSheet bottomSheetRef={bottomSheetRef} />
		</GestureHandlerRootView>
	);
}
