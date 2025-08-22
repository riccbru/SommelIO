import { useState } from "react";
import { router } from "expo-router";
import Title from "@/src/components/Title";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthButton from "@/src/components/auth/AuthButton";
import { LineSeparator } from "@/src/components/auth/LineSeparator";
import { LoginFooter } from "@/src/components/auth/login/LoginFooter";
import PasswordInput from "@/src/components/auth/login/PasswordInput";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import ProviderSSO from "@/src/components/auth/ProviderSSO";

const defaultLoginData = {
	username: "",
	password: "",
};

export default function LoginLayout() {
	const theme = useTheme();
	const { t } = useTranslation();
	const { isReady, login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [loginData, setLoginData] = useState(defaultLoginData);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 32,
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
	});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!loginData.username.trim()) {
			newErrors.username = `Username ${t("new.required")}`;
		}

		if (!loginData.password.trim()) {
			newErrors.password = `Password ${t("new.required")}`;
		} else if (loginData.password.length < 8) {
			newErrors.password = `Password ${t("new.invalid")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = async () => {
		try {
			await login(loginData.username, loginData.password);
			router.replace("/(tabs)");
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handlePress = () => {
		if (!validateForm()) return;
		setLoading(true);
		setTimeout(() => {
			handleLogin().finally(() => setLoading(false));
		}, 550);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, backgroundColor: theme.colors.background }}
		>
			<ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container}>
				<Title />

				<AuthInput
					holder='Username'
					value={loginData.username}
					error={errors.username}
					onSubmit={handleLogin}
					onChangeText={text => setLoginData(prev => ({ ...prev, username: text }))}
				/>

				<PasswordInput
					loginData={loginData}
					error={errors.password}
					onSubmit={handleLogin}
					setLoginData={setLoginData}
				/>

				<View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
					<View style={{ flex: 1 }}>
						<AuthButton
							action='LOGIN'
							loading={loading}
							onPress={handlePress}
							disabled={!isReady || loading}
						/>
					</View>
				</View>

				<LineSeparator />

				<ProviderSSO />

				<LoginFooter />

				<View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity activeOpacity={0.7} onPress={() => router.replace("/forgot")}>
							<Text
								style={{
									color: theme.colors.gray,
									fontFamily: "Epilogue-Regular",
									textDecorationLine: "underline",
								}}
							>
								Forgot password?
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
