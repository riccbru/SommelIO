import { useAuth } from "@/src/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { getInitials } from "@/src/utils/utils";
import Stats from "@/src/components/user/UserStats";
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
	image_url: string;
};

type UserStats = {
	totalTastings: number;
	favoriteTastings: number;
	ratedTastings: number;
};

type Props = {
	userData: UserInfo | null;
	userStats: UserStats | null;
};

export default function UserProfile({ userData, userStats }: Props) {
	const theme = useTheme();
	const { user } = useAuth();
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
			color: theme.colors.gray,
			fontFamily: "Epilogue-Bold",
		},
		divider: {
			width: "80%",
			marginTop: 16,
			marginBottom: 16,
			backgroundColor: theme.colors.primary,
		},
		devLogo: {
			top: 7,
			right: 12,
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
				message: `${t("shareMex")}\nhttps://google.com`,
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
			{userData?.uid === user?.uid && (
				<TouchableOpacity style={styles.shareButton} onPress={handleShare}>
					<ExportIcon size={28} color={theme.colors.primary} />
				</TouchableOpacity>
			)}

			{!userData?.admin ? null : (
				<View style={styles.devLogo}>
					<DevToLogoIcon size={28} weight='fill' color={theme.colors.primary} />
				</View>
			)}

			<View style={styles.profileHeader}>
				<View style={styles.avatarContainer}>
					{userData?.image_url && userData.image_url.trim() !== "" ? (
						<Avatar.Image
							size={80}
							source={{ uri: userData?.image_url.replace(/\\/g, "") }}
						/>
					) : (
						<Avatar.Text
							size={80}
							label={getInitials(userData?.full_name || userData?.username || "U")}
							style={{
								backgroundColor: theme.colors.primary,
							}}
							labelStyle={{
								color: theme.colors.surface,
								fontSize: 28,
								fontWeight: "700",
							}}
						/>
					)}
				</View>

				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
					<Text style={styles.userData}>{userData?.username}</Text>
					{!userData?.premium ? null : (
						<SealCheckIcon
							size={28}
							weight='fill'
							color={theme.colors.premium}
							style={{ marginLeft: 5, marginBottom: 10 }}
						/>
					)}
				</View>
				<Text style={styles.userEmail}>{userData?.email}</Text>
				<Text style={styles.userData}>{userData?.full_name}</Text>

				<Divider style={styles.divider} />

				{/* Stats Section */}
				<Stats stats={userStats} />
			</View>
		</Card>
	);
}
