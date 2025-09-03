import { List } from "react-native-paper";
import { useData } from "@/src/hooks/useData";
import { useTheme } from "@/src/hooks/useTheme";
import { LockOpenIcon } from "phosphor-react-native";
import ColleaguesAPI from "@/src/services/colleagues";
import { blockedDescription } from "@/src/utils/utils";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

type Blocked = {
	username: string;
	full_name: string;
	blocked_at: string;
	rid: string;
	uid: string;
	image_url: string;
};

type Props = {
	blocked: Blocked;
};

export default function BlockedColleague({ blocked }: Props) {
	const theme = useTheme();
	const { i18n } = useTranslation();
	const { refreshBlocked } = useData();

	const styles = StyleSheet.create({
		emptyText: {
			fontSize: 16,
			marginTop: 50,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		title: {
			fontSize: 20,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		description: {
			fontSize: 16,
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular",
		},
		image: {
			width: 45,
			height: 45,
			marginLeft: 15,
			marginTop: 5,
			borderWidth: 1,
			borderRadius: 30,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.gray,
		},
	});

	const handlePress = async () => {
		try {
			await ColleaguesAPI.unblockColleague(blocked.rid);
			refreshBlocked();
		} catch (error: any) {
			console.log(error?.message);
		}
	};

	return (
		<List.Item
			title={<Text style={styles.title}>{blocked.username}</Text>}
			descriptionStyle={{ marginTop: 5 }}
			description={
				<Text style={styles.description}>
					{blockedDescription(blocked.full_name, blocked.blocked_at, i18n.language)}
				</Text>
			}
			left={props => (
				<Image style={styles.image} source={{ uri: blocked.image_url.replace(/\\/g, "") }} />
			)}
			right={props => (
				<TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
					<LockOpenIcon
						size={32}
						weight='bold'
						style={{ marginTop: 15 }}
						color={theme.dark ? theme.colors.yellow : theme.colors.amber}
					/>
				</TouchableOpacity>
			)}
		/>
	);
}
