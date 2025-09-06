import { useState } from "react";
import { ActivityIndicator, List } from "react-native-paper";
import { useTheme } from "@/src/hooks/useTheme";
import ColleaguesAPI from "@/src/services/colleagues";
import { CheckIcon, UserPlusIcon } from "phosphor-react-native";
import { Image, StyleSheet, TouchableOpacity, Text, Platform } from "react-native";

type User = {
	status: string | null;
	username: string;
	full_name: string;
	uid: string;
	image_url: string;
};

type Props = {
	user: User;
};

export default function ColleagueItem({ user }: Props) {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
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

	const handleSendRequest = async (uid: string) => {
		try {
			setLoading(true);
			await ColleaguesAPI.sendRequest(uid);
			setSent(true);
		} catch (error: any) {
			setSent(false);
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<List.Item
				title={<Text style={styles.username}>{user.username}</Text>}
				description={<Text style={styles.fullName}>{user.full_name}</Text>}
				left={props => (
					<Image source={{ uri: user.image_url?.replace(/\\/g, "") }} style={styles.image} />
				)}
				right={props => (
					<TouchableOpacity
						disabled={sent}
						activeOpacity={0.5}
						onPress={() => handleSendRequest(user.uid)}
					>
						{loading ? (
							<ActivityIndicator
								animating
								color={theme.colors.gray}
								style={{ marginTop: Platform.OS === "ios" ? 0 : 10 }}
							/>
						) : (
							<Icon
								size={32}
								weight='bold'
								style={{ marginTop: Platform.OS === "ios" ? 0 : 10 }}
								color={!sent ? theme.colors.gray : theme.colors.green}
							/>
						)}
					</TouchableOpacity>
				)}
			/>
		</>
	);
}
