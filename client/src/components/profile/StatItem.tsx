import { IconProps } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = {
	Icon: React.ComponentType<IconProps>;
	number: number;
	label: string;
	color: string;
};

export default function StatItem({ Icon, number, label, color }: Props) {
	const styles = StyleSheet.create({
		statItem: {
			flex: 1,
			alignItems: "center",
		},
		statNumber: {
			fontSize: 25,
			marginTop: 3,
			fontFamily: "Epilogue-Bold",
		},
		statLabel: {
			fontSize: 12,
			marginTop: 3,
			color: "#808080",
			textAlign: "center",
			fontFamily: "Epilogue-Regular",
		},
	});
	return (
		<View style={styles.statItem}>
			<Icon size={24} weight='fill' color={color} />
			<Text style={[styles.statNumber, { color }]}> {number}</Text>
			<Text style={styles.statLabel}>{label}</Text>
		</View>
	);
}
