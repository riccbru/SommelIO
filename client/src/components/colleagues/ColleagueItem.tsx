import { useState } from "react";
import { List } from "react-native-paper";
import { useTheme } from "@/src/hooks/useTheme";
import ColleaguesAPI from "@/src/services/colleagues";
import { CheckIcon, UserPlusIcon } from "phosphor-react-native";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

type User = {
	status: string | null;
	username: string;
	full_name: string;
	uid: string;
};

type Props = {
	user: User;
};

export default function ColleagueItem({ user }: Props) {
	const theme = useTheme();
	const [sent, setSent] = useState(user.status === "pending");
	const Icon = sent ? CheckIcon : UserPlusIcon;

	const styles = StyleSheet.create({
		username: {
			fontSize: 18,
			color: theme.colors.primary,
			fontFamily: "Epilogue-Bold",
		},
		fullName: {
			fontSize: 16,
			color: theme.colors.gray,
			fontFamily: "Epilogue-Regular",
		},
	});

	const handleSendRequest = async (uid: string) => {
		try {
			await ColleaguesAPI.sendRequest(uid);
			setSent(true);
		} catch (error: any) {
			setSent(false);
			console.log(error.message);
		}
	};

	return (
		<>
			<List.Item
				title={<Text style={styles.username}>{user.username}</Text>}
				description={<Text style={styles.fullName}>{user.full_name}</Text>}
				right={props => (
					<TouchableOpacity
						disabled={sent}
						activeOpacity={0.5}
						onPress={() => handleSendRequest(user.uid)}
					>
						<Icon
							size={32}
							weight='bold'
							color={!sent ? theme.colors.gray : theme.colors.green}
						/>
					</TouchableOpacity>
				)}
			/>
		</>
	);
}
