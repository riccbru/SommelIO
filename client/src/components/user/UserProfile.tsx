import Stats from "@/src/components/user/Stats";
import { useTheme } from "@/src/hooks/useTheme";
import { getInitials } from "@/src/utils/utils";
import { DevToLogoIcon, SealCheckIcon } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";

type UserInfo = {
	admin: boolean;
	premium: boolean;
	username: string;
	email: string;
	full_name: string;
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
	});

	return (
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
