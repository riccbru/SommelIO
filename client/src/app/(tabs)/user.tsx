import { useAuth } from "@/src/hooks/useAuth";
import { useData } from "@/src/hooks/useData";
import { useTheme } from "@/src/hooks/useTheme";
import { useNavigation, useRouter } from "expo-router";
import UserProfile from "@/src/components/user/UserData";
import { GearIcon, SignOutIcon } from "phosphor-react-native";
import { useLayoutEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingsBottomSheet from "@/src/components/user/SettingsBottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Animated, RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function User() {
	const theme = useTheme();
	const router = useRouter();
	const navigation = useNavigation();
	const { user, logout } = useAuth();
	const { loading, stats, refreshStats } = useData();
	const [fadeAnim] = useState(new Animated.Value(0));
	const bottomSheetRef = useRef<BottomSheetMethods>(null);

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
					<GearIcon
						size={32}
						weight={theme.dark ? "fill" : "regular"}
						color={theme.colors.primary}
					/>
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

	return (
		<GestureHandlerRootView style={styles.container}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshStats} />}
			>
				<Animated.View style={{ opacity: fadeAnim }}>
					{/* User Profile Card */}
					<UserProfile userData={user} userStats={stats} />
				</Animated.View>
			</ScrollView>

			{/* Settings BottomSheet */}
			<SettingsBottomSheet bottomSheetRef={bottomSheetRef} />
		</GestureHandlerRootView>
	);
}
