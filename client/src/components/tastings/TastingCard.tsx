import { useTheme } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NotePencilIcon, XCircleIcon } from "phosphor-react-native";

type EditModeShape = {
	tasting: boolean;
	visual: boolean;
	olfactory: boolean;
	taste: boolean;
	final: boolean;
};

type Props = {
	uuid: string;
	name: keyof EditModeShape;
	subtitle: string;
	editMode: EditModeShape;
	setEditMode: React.Dispatch<React.SetStateAction<EditModeShape>>;
};

export default function TastingCard({ uuid, name, subtitle, editMode, setEditMode }: Props) {
	const theme = useTheme();

	const Icon = editMode[name] ? XCircleIcon : NotePencilIcon;

	const styles = StyleSheet.create({
		subtitleRow: {
			marginBottom: 10,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		subtitle: {
			fontSize: 18,
			marginBottom: 13,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		leftIcon: {
			marginRight: 10,
		},
	});

	const handlePress = () => {
		setEditMode(prev => ({
			...prev,
			[name]: !prev[name],
		}));
	};

	return (
		<View style={styles.subtitleRow}>
			<Text style={styles.subtitle}>{subtitle}</Text>
			<View style={styles.subtitleRow}>
				<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
					<Icon
						size={32}
						weight={"regular"}
						color={!editMode[name] ? theme.colors.primary : theme.colors.red}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
