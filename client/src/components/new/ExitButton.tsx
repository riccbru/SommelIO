import { useRouter } from "expo-router";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-paper";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { XCircleIcon } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props<T> = {
	path: string;
	defaultFormData: T;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
	setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function ExitButton({ path, defaultFormData, setFormData, setErrors }: Props<T>) {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const { refreshTastings } = useData();

	const text = t("new.exit_exam");
	const handlePress = async () => {
		setErrors({});
		refreshTastings();
		setFormData(defaultFormData);
		const tid = await AsyncStorage.getItem("newTid");
		if (path === "/new/tasting/old" || path === "/new/tasting/new") {
			router.back();
		} else {
			router.replace("/(tabs)/new");
			router.replace("/(tabs)/wines?tab=tastings");
			if (tid) {
				router.push(`/(tabs)/wines/${tid}`);
			}
		}
		await AsyncStorage.removeItem("newTid");
	};

	return (
		<View style={{ alignItems: "center", backgroundColor: theme.colors.background }}>
			<Button
				mode='text'
				onPress={handlePress}
				style={{ width: 150, backgroundColor: theme.colors.red }}
			>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<XCircleIcon size={24} style={{ marginRight: 3 }} color={theme.colors.white} />
					<Text style={{ ...(Platform.OS === 'ios' ? { marginTop: 3 } : { marginBottom: 2 }), color: theme.colors.white, fontFamily: "Epilogue-Bold" }}>
						{text}
					</Text>
				</View>
			</Button>
		</View>
	);
}
