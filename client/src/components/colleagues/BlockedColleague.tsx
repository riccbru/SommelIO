import { List } from "react-native-paper";
import { useData } from "@/src/hooks/useData";
import { useTheme } from "@/src/hooks/useTheme";
import { LockOpenIcon } from "phosphor-react-native";
import ColleaguesAPI from "@/src/services/colleagues";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

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
	const { refreshBlocked } = useData();

	const styles = StyleSheet.create({
		emptyText: {
			fontSize: 16,
			marginTop: 50,
			textAlign: "center",
			color: theme.colors.primary,
			fontFamily: "Epilogue-Regular",
		},
		username: {
			fontSize: 20,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		fullName: {
			fontSize: 16,
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular",
		},
		image: {
			width: 45,
			height: 45,
			marginLeft: 15,
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
			title={<Text style={styles.username}>{blocked.username}</Text>}
			description={<Text style={styles.fullName}>{blocked.full_name}</Text>}
			// blocked_at
			left={props => (
				<Image style={styles.image} source={{ uri: blocked.image_url.replace(/\\/g, "") }} />
			)}
			right={props => (
				<TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
					<LockOpenIcon
						size={32}
						weight='regular'
						style={{ marginTop: 3 }}
						color={theme.colors.yellow}
					/>
				</TouchableOpacity>
			)}
		/>
	);
}
