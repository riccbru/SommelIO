import { useState } from "react";
import Title from "@/src/components/Title";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { showAlert } from "@/src/utils/showAlert";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthButton from "@/src/components/auth/AuthButton";
import DateInput from "@/src/components/auth/signup/DateInput";
import UserModal from "@/src/components/auth/signup/UserModal";
import { AppleButton } from "@/src/components/auth/AppleButton";
import { GoogleButton } from "@/src/components/auth/GoogleButton";
import { LineSeparator } from "@/src/components/auth/LineSeparator";
import { FacebookButton } from "@/src/components/auth/FacebookButton";
import PasswordInput from "@/src/components/auth/signup/PasswordInput";
import { SignupFooter } from "@/src/components/auth/signup/SignupFooter";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

const defaultSignupData = {
	full_name: "",
	username: "",
	email: "",
	birthdate: "",
	password: "",
};

export default function SignupLayout() {

	const theme = useTheme();
	const { t } = useTranslation();
	const { isReady, signup } = useAuth();
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [signupData, setSignupData] = useState(defaultSignupData);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 32,
			justifyContent: "center",
			backgroundColor: theme.colors.background,
		},
		text: {
			color: "#ffffff",
			fontFamily: "Epilogue-Regular",
		},
	});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!signupData.full_name.trim()) {
			newErrors.full_name = `${t("signup.full_name")} ${t("new.required")}`;
		}
		
		if (!signupData.username.trim()) {
			newErrors.username = `Username ${t("new.required")}`;
		}

		if (!signupData.email.trim()) {
			newErrors.email = `Email ${t("new.required")}`;
		}

		if (!signupData.birthdate.trim()) {
			newErrors.birthdate = `${t("signup.birthdate")} ${t("new.required")}`;
		} else if (!/^\d{4}-\d{2}-\d{2}$/.test(signupData.birthdate)) {
			newErrors.birthdate = `${t("signup.birthdate")} ${t("new.invalid")}`;
		}

		if (!signupData.password.trim()) {
			newErrors.password = `Password ${t("new.required")}`;
		} else if (signupData.password.length < 8) {
			newErrors.password = `Password ${t("new.invalid")}`;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSignup = async () => {
		if (!validateForm()) return;
		try {
			await signup(signupData);
			setModal(true);
		} catch (err: any) {
			console.log(err);
		}
	};

	const handlePress = () => {
		setLoading(true);
		setTimeout(() => {
			handleSignup().finally(() => setLoading(false));
		}, 550);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, backgroundColor: theme.colors.background }}
		>
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
				<Title />

				<AuthInput
					holder='Full name'
					value={signupData.full_name}
					error={errors.full_name}
					onChangeText={text => setSignupData(prev => ({ ...prev, full_name: text }))}
				/>

				<AuthInput
					holder='Email'
					isEmail={true}
					value={signupData.email}
					error={errors.email}
					onChangeText={text => setSignupData(prev => ({ ...prev, email: text }))}
				/>

				<DateInput
					value={signupData.birthdate}
					error={errors.birthdate}
					onChangeText={text => setSignupData(prev => ({ ...prev, birthdate: text }))}
				/>

				<AuthInput
					holder='Username'
					value={signupData.username}
					error={errors.username}
					onChangeText={text => setSignupData(prev => ({ ...prev, username: text }))}
				/>
				<PasswordInput
					onSubmit={handlePress}
					signupData={signupData}
					error={errors.password}
					setSignupData={setSignupData}
				/>

				<AuthButton
					action='SIGNUP'
					loading={loading}
					onPress={handlePress}
					disabled={!isReady || loading}
				/>

				<LineSeparator />

				<GoogleButton />
				<AppleButton />
				<FacebookButton />

				<SignupFooter />

				<UserModal modal={modal} setModal={setModal} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
