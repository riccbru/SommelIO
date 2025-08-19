import { useTheme } from "@/src/hooks/useTheme";
import { IconProps } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = {
	Icon: React.ComponentType<IconProps>;
	number: number;
	label: string;
	color: string;
};

export default function StatItem({ Icon, number, label, color }: Props) {
	const theme = useTheme();
	const styles = StyleSheet.create({
		statItem: {
			flex: 1,
			alignItems: "center",
		},
		statNumber: {
			fontSize: 25,
			marginTop: 8,
			marginRight: 5,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
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
		<View style={styles.statItem}>
			<Icon size={24} weight='fill' color={color} />
			<Text style={styles.statNumber}> {number}</Text>
			<Text style={styles.statLabel}>{label}</Text>
		</View>
	);
}
