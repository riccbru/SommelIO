import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useTheme } from "@/src/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowCircleRightIcon, CheckCircleIcon } from "phosphor-react-native";
import { useState } from "react";

type Props = {
	text: string;
	formData: any;
	validation: () => boolean;
	action: (tid: string, formData: any) => Promise<any>;
};

export default function SaveButton({ text, formData, validation, action }: Props) {
	const theme = useTheme();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const Icon = text === "SAVE" ? CheckCircleIcon : ArrowCircleRightIcon

	const handlePress = async () => {
		const isValid = validation();
		if (isValid) {
			try {
				setLoading(true);
				const tid = await AsyncStorage.getItem("newTid");
				if (!tid) throw new Error("No tasting ID found");
				await action(tid, formData);
				router.replace("/(tabs)/new");
				router.replace(`/(tabs)/wines/${tid}`);
				await AsyncStorage.removeItem("newTid");
			} catch (error) {
				console.log(`NextButton: ${error}`);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<View style={{ alignItems: "center", backgroundColor: theme.colors.background }}>
			<Button
				mode='text'
				onPress={handlePress}
				style={{ width: 150, backgroundColor: theme.colors.green }}
			>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					{loading ? (
						<ActivityIndicator animating color={theme.colors.white} />
					) : (
						<>
							<Text style={{ marginTop: 3, fontFamily: "Epilogue-Bold", color: theme.colors.white }}>
								{text}
							</Text>
							<Icon size={24} style={{ marginLeft: 5 }} color={theme.colors.white} />
						</>
					)}
				</View>
			</Button>
		</View>
	);
}
