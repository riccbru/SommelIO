import { useTranslation } from "react-i18next";
import Stats from "@/src/components/user/Stats";
import { useTheme } from "@/src/hooks/useTheme";
import { getInitials } from "@/src/utils/utils";
import { Avatar, Card, Divider } from "react-native-paper";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DevToLogoIcon, ExportIcon, SealCheckIcon } from "phosphor-react-native";

type UserInfo = {
	admin: boolean;
	premium: boolean;
	username: string;
	email: string;
	full_name: string;
	uid: string;
};

type UserStats = {
	totalTastings: number;
	favoriteTastings: number;
	ratedTastings: number;
};

type Props = {
	user: UserInfo | null;
	stats: UserStats;
};

export default function UserProfile({ user, stats }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const styles = StyleSheet.create({
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
		devLogo: {
			top: 5,
			right: 10,
			position: "absolute",
		},
		shareButton: {
			top: 10,
			left: 10,
			position: "absolute",
		},
	});

	const handleShare = async () => {
		try {
			const result = await Share.share({
				message: `${t("shareMex")}\nhttps://google.com/`,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	return (
		<Card style={styles.profileCard}>
			{/* Share Button (Top-right of card) */}
			<TouchableOpacity style={styles.shareButton} onPress={handleShare}>
				<ExportIcon size={24} color={theme.colors.primary} />
			</TouchableOpacity>

			{!user?.admin ? null : (
				<View style={styles.devLogo}>
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

				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
					<Text style={styles.userData}>{user?.username}</Text>
					{!user?.premium ? null : (
						<SealCheckIcon
							size={28}
							weight='fill'
							color={theme.colors.premium}
							style={{ marginLeft: 5, marginBottom: 10 }}
						/>
					)}
				</View>
				<Text style={styles.userEmail}>{user?.email}</Text>
				<Text style={styles.userData}>{user?.full_name}</Text>

				<Divider style={styles.divider} />

				{/* Stats Section */}
				<Stats stats={stats} />
			</View>
		</Card>
	);
}
