import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useData } from "@/src/hooks/useData";
import { useTheme } from "@/src/hooks/useTheme";
import { LinkProps, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowCircleRightIcon, CheckCircleIcon } from "phosphor-react-native";

type Props = {
	path: LinkProps["href"];
	text: string;
	validation: () => boolean;
	formData: any;
	action: (formData: any) => Promise<any>;
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
	const { refreshTastings, refreshWines } = useData();

	const handlePress = async () => {
		const isValid = validation();
		if (isValid) {
			try {
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
				router.push(path);
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
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{ marginTop: 3, fontFamily: "Epilogue-Bold", color: theme.colors.black }}
					>
						{text}
					</Text>
					{text === "SAVE" ? (
						<CheckCircleIcon size={24} style={{ marginLeft: 5 }} color={theme.colors.black} />
					) : (
						<ArrowCircleRightIcon
							size={24}
							style={{ marginLeft: 5 }}
							color={theme.colors.black}
						/>
					)}
				</View>
			</Button>
		</View>
	);
}
