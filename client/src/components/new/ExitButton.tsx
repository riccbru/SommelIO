import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useData } from "@/src/hooks/useData";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { XCircleIcon } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props<T> = {
	defaultFormData: T;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
	setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export default function ExitButton({ defaultFormData, setFormData, setErrors }: Props<T>) {
	const theme = useTheme();
	const router = useRouter();
	const { t } = useTranslation();
	const { refreshTastings } = useData();

	const text = t("new.exit_exam");
	const handlePress = async () => {
		setErrors({});
		refreshTastings();
		setFormData(defaultFormData);
		router.replace("/(tabs)/new");
		router.replace("/(tabs)/wines?tab=tastings");
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
					<XCircleIcon size={24} style={{ marginRight: 5 }} color={theme.colors.black} />
					<Text
						style={{ marginTop: 3, color: theme.colors.black, fontFamily: "Epilogue-Bold" }}
					>
						{text}
					</Text>
				</View>
			</Button>
		</View>
	);
}
