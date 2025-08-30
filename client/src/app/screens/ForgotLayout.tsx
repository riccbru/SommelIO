import { useState } from "react";
import { router } from "expo-router";
import Title from "@/src/components/Title";
import { useAuth } from "@/src/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthButton from "@/src/components/auth/AuthButton";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ForgotLayout() {
	const theme = useTheme();
	const { isReady } = useAuth();
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string>("");

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		button: {
			height: 46,
			borderWidth: 1,
			borderRadius: 12,
			alignItems: "center",
			justifyContent: "center",
			borderColor: theme.colors.background,
			backgroundColor: theme.colors.primary,
		},
		text: {
			color: theme.colors.background,
			fontFamily: "Epilogue-Regular",
		},
	});

	const validateForm = (): boolean => {
		let newError = "";

		if (!email.trim()) {
			newError = `Email ${t("new.required")}`;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newError = `Email ${t("new.invalid")}`;
		}

		setError(newError);
		return !newError.length;
	};

	const handleReset = async () => {
		setLoading(true);
		const res = validateForm();
		console.log(res);
		setLoading(false);
	};

	const handlePress = async () => {
		router.replace("/login");
	};

	return (
		<View style={styles.container}>
			<Title />
			<View style={{ width: 260 }}>
				<AuthInput
					holder='Email'
					isEmail={true}
					value={email}
					error={error}
					onChangeText={text => setEmail(text)}
				/>
				<AuthButton
					action='RESET PASSWORD'
					loading={false}
					onPress={handleReset}
					disabled={!isReady || loading}
				/>
				<View style={{ height: 10 }} />
				<TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={handlePress}>
					<Text style={styles.text}>Back to login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
