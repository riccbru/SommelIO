import { useTheme } from "@/src/hooks/useTheme";
import { ArrowSquareOutIcon, Icon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	Icon: Icon;
	label: string;
};

export default function SettingRow({ Icon, label }: Props) {
	const theme = useTheme();

	const styles = StyleSheet.create({
		row: {
			height: 80,
			marginTop: 10,
			marginBottom: 10,
			alignItems: "center",
			flexDirection: "row",
			paddingHorizontal: 15,

			borderWidth: 1,
			elevation: 5,
			borderRadius: 15,
			borderColor: theme.colors.primary,

			justifyContent: "space-between",
			backgroundColor: theme.dark ? theme.colors.background : theme.colors.card,
		},
		rowLabel: {
			fontSize: 16,
			fontFamily: "Epilogue-Bold",
			color: theme.colors.primary,
		},
	});

	return (
		<>
			<TouchableOpacity activeOpacity={0.7} onPress={() => console.log(`clicked ${label}`)}>
				<View style={styles.row}>
					<View style={{ alignItems: "center", flexDirection: "row" }}>
						<Icon
							size={28}
							color={theme.colors.primary}
							weight={theme.dark ? "fill" : "bold"}
						/>
						<View style={{ marginLeft: 5, marginRight: 5 }} />
						<Text style={styles.rowLabel}>{label}</Text>
					</View>
					<ArrowSquareOutIcon size={24} weight='bold' color={theme.colors.primary} />
				</View>
			</TouchableOpacity>
		</>
	);
}
