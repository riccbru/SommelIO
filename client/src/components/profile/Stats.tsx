import StatItem from "./StatItem";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";
import { GavelIcon, StarIcon, WineIcon } from "phosphor-react-native";

type UserStats = {
	totalTastings: number;
	favoriteTastings: number;
	ratedTastings: number;
};

type Props = {
	stats: UserStats;
};

export default function Stats({ stats }: Props) {
	const theme = useTheme();
	const { t } = useTranslation();
	const items = [
		{
			Icon: StarIcon,
			color: theme.colors.amber,
			number: stats.favoriteTastings,
			label: t("profile.tastings.favorite").replace(" ", "\n"),
		},
		{
			Icon: WineIcon,
			color: theme.colors.primary,
			number: stats.totalTastings,
			label: t("profile.tastings.total").replace(" ", "\n"),
		},
		{
			Icon: GavelIcon,
			color: theme.colors.green,
			number: stats.ratedTastings,
			label: t("profile.tastings.rated").replace(" ", "\n"),
		},
	];

	const styles = StyleSheet.create({
		statsContainer: {
			paddingVertical: 16,
			flexDirection: "row",
			justifyContent: "space-around",
		},
	});

	return (
		<>
			<View style={{ alignItems: "center" }}>
				<Text style={{ color: theme.colors.gray }}>{t("tastings_name").toUpperCase()}</Text>
			</View>
			<View style={styles.statsContainer}>
				{items.map((el, index) => (
					<StatItem
						key={index}
						Icon={el.Icon}
						number={el.number}
						label={el.label}
						color={el.color}
					/>
				))}
			</View>
		</>
	);
}
