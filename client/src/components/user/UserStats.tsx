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

export default function UserStats({ stats }: Props) {
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
			color: theme.colors.red,
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
	});

	return (
		<>
			<View style={styles.statsTitleView}>
				<Text style={styles.statsTitle}>{t("tastings_name").toUpperCase()}</Text>
			</View>
			<View style={styles.statsView}>
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
