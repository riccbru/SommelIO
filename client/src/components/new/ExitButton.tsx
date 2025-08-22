import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { XCircleIcon } from "phosphor-react-native";
import { Button, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useRefresh } from "@/src/hooks/useRefresh";
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
	const { setRefresh } = useRefresh();

	const text = t("new.exit_exam");
	const handlePress = async () => {
		setErrors({});
		setRefresh(prev => !prev);
		setFormData(defaultFormData);
		router.replace("/(tabs)/new");
		router.replace("/(tabs)/tastings");
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
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<XCircleIcon size={24} style={{ marginRight: 5 }} color={"#000000"} />
					<Text style={{ marginTop: 3, color: "#000000", fontFamily: "Epilogue-Bold" }}>
						{text}
					</Text>
				</View>
			</Button>
		</View>
	);
}
