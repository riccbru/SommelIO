import { Text, View } from "react-native";
import { useTheme } from "@/src/hooks/useTheme";
import { useLocalSearchParams } from "expo-router";
import UserProfile from "@/src/components/user/UserData";

export default function ColleagueDetail() {
	const theme = useTheme();
	const { cid } = useLocalSearchParams<{ cid: string }>();

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.colors.background,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ color: theme.colors.primary }}>{cid}</Text>
		</View>
	);
}
