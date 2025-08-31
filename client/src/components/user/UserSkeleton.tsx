import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { Card, Divider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { GavelIcon, StarIcon, WineIcon } from "phosphor-react-native";

export default function UserSkeleton() {
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
			marginBottom: 8,
			textAlign: "center",
		},
		userEmail: {
			marginBottom: 16,
			textAlign: "center",
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
		statsTitleView: {
			alignItems: "center",
		},
		statsTitle: {
			color: theme.colors.gray,
			fontFamily: "Epilogue-Bold",
		},
		statsView: {
			paddingVertical: 16,
			flexDirection: "row",
			justifyContent: "space-between",
		},
		statItem: {
			flex: 1,
			alignItems: "center",
		},
		statLabel: {
			fontSize: 12,
			marginTop: 5,
			textAlign: "center",
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular",
		},
	});

	return (
		<Card style={styles.profileCard}>
			<SkeletonPlaceholder
				backgroundColor={theme.colors.background}
				highlightColor={theme.colors.card}
			>
				{/* Share Button */}
				<View style={styles.shareButton}>
					<View style={{ width: 24, height: 26 }} />
				</View>

				{/* DEV Logo */}
				<View style={styles.devLogo}>
					<View style={{ width: 28, height: 18, marginTop: 5 }} />
				</View>
			</SkeletonPlaceholder>

			<View style={styles.profileHeader}>
				<View style={styles.avatarContainer}>
					{/* Image */}
					<SkeletonPlaceholder
						backgroundColor={theme.colors.background}
						highlightColor={theme.colors.card}
					>
						<View style={{ width: 80, height: 80, borderRadius: 50 }} />
					</SkeletonPlaceholder>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
					<View style={styles.userData}>
						{/* Username */}
						<SkeletonPlaceholder
							backgroundColor={theme.colors.background}
							highlightColor={theme.colors.card}
						>
							<View style={{ width: 120, height: 28, borderRadius: 4 }} />
						</SkeletonPlaceholder>
					</View>
					{/* Premium badge */}
					<SkeletonPlaceholder
						backgroundColor={theme.colors.background}
						highlightColor={theme.colors.card}
					>
						<View
							style={{
								width: 28,
								height: 28,
								borderRadius: 50,
								marginLeft: 5,
								marginBottom: 8,
							}}
						/>
					</SkeletonPlaceholder>
				</View>

				{/* Email */}
				<View style={styles.userEmail}>
					<SkeletonPlaceholder
						backgroundColor={theme.colors.background}
						highlightColor={theme.colors.card}
					>
						<View style={{ width: 190, height: 20 }} />
					</SkeletonPlaceholder>
				</View>

				{/* Full name */}
				<View style={styles.userData}>
					<SkeletonPlaceholder
						backgroundColor={theme.colors.background}
						highlightColor={theme.colors.card}
					>
						<View style={{ width: 250, height: 28 }} />
					</SkeletonPlaceholder>
				</View>

				<Divider style={styles.divider} />

				<View style={styles.statsTitleView}>
					<Text style={styles.statsTitle}>{t("tastings_name").toUpperCase()}</Text>
				</View>

				<View style={styles.statsView}>
					{/* Favorite Tastings */}
					<View style={styles.statItem}>
						<StarIcon size={24} weight='fill' color={theme.colors.amber} />
						<SkeletonPlaceholder
							backgroundColor={theme.colors.background}
							highlightColor={theme.colors.card}
						>
							<View style={{ width: 20, height: 29, marginTop: 5 }} />
						</SkeletonPlaceholder>
						<Text style={styles.statLabel}>
							{t("profile.tastings.favorite").replace(" ", "\n")}
						</Text>
					</View>

					{/* Total Tastings */}
					<View style={styles.statItem}>
						<WineIcon size={24} weight='fill' color={theme.colors.red} />
						<SkeletonPlaceholder
							backgroundColor={theme.colors.background}
							highlightColor={theme.colors.card}
						>
							<View style={{ width: 20, height: 29, marginTop: 5 }} />
						</SkeletonPlaceholder>
						<Text style={styles.statLabel}>
							{t("profile.tastings.total").replace(" ", "\n")}
						</Text>
					</View>

					{/* Rated Tastings */}
					<View style={styles.statItem}>
						<GavelIcon size={24} weight='fill' color={theme.colors.green} />
						<SkeletonPlaceholder
							backgroundColor={theme.colors.background}
							highlightColor={theme.colors.card}
						>
							<View style={{ width: 20, height: 29, marginTop: 5 }} />
						</SkeletonPlaceholder>
						<Text style={styles.statLabel}>
							{t("profile.tastings.rated").replace(" ", "\n")}
						</Text>
					</View>
				</View>
			</View>
		</Card>
	);
}
