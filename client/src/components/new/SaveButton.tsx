import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowCircleRightIcon, CheckCircleIcon } from "phosphor-react-native";

type Props = {
	text: string;
	formData: any;
	validation: () => boolean;
	action: (tid: string, formData: any) => Promise<any>;
};

export default function SaveButton({ text, formData, validation, action }: Props) {
	const theme = useTheme();
	const router = useRouter();

	const handlePress = async () => {
		const isValid = validation();
		if (isValid) {
			try {
				const tid = await AsyncStorage.getItem("newTid");
				if (!tid) throw new Error("No tasting ID found");
				await action(tid, formData);
				router.replace("/(tabs)/new");
				router.replace("/(tabs)/wines?tab=tastings");
				await AsyncStorage.removeItem("newTid");
			} catch (error) {
				console.log(`NextButton: ${error}`);
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
					<Text style={{ marginTop: 3, fontFamily: "Epilogue-Bold", color: "#000000" }}>
						{text}
					</Text>
					{text === "SAVE" ? (
						<CheckCircleIcon size={24} style={{ marginLeft: 5 }} color={"#000000"} />
					) : (
						<ArrowCircleRightIcon size={24} style={{ marginLeft: 5 }} color={"#000000"} />
					)}
				</View>
			</Button>
		</View>
	);
}
