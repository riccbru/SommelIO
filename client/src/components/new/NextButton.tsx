import { View, Text, Platform } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useData } from "@/src/hooks/useData";
import { useTheme } from "@/src/hooks/useTheme";
import { LinkProps, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowCircleRightIcon, CheckCircleIcon } from "phosphor-react-native";
import { useState } from "react";

type Props = {
	path: LinkProps["href"];
	text: string;
	validation: () => boolean;
	formData: any;
	action: (tid?: string, formData: any) => Promise<any>;
	requiresTid?: boolean;
};

export default function NextButton({
	path,
	text,
	validation,
	formData,
	action,
	requiresTid,
}: Props) {
	const theme = useTheme();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { refreshTastings, refreshWines } = useData();
	const Icon = text === "SAVE" ? CheckCircleIcon : ArrowCircleRightIcon;

	const handlePress = async () => {
		const isValid = validation();
		if (isValid) {
			try {
				setLoading(true);
				if (!requiresTid) {
					const response = await action(formData);
					const newTid = response?.data?.tid;
					if (newTid) await AsyncStorage.setItem("newTid", newTid);
				} else {
					const tid = await AsyncStorage.getItem("newTid");
					if (!tid) throw new Error("No tasting ID found");
					await action(tid, formData);
				}
				if (path.toString().includes("/new/tasting/visual")) {
					refreshTastings();
					refreshWines();
				}
				// router.push(path);
				router.replace(path);
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
				disabled={loading}
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
							<Text
								style={{
									...(Platform.OS === "ios" ? { marginTop: 3 } : { marginBottom: 2 }),
									fontFamily: "Epilogue-Bold",
									color: theme.colors.white,
								}}
							>
								{text}
							</Text>
							<Icon size={24} style={{ marginLeft: 3 }} color={theme.colors.white} />
						</>
					)}
				</View>
			</Button>
		</View>
	);
}
