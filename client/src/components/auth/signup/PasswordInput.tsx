import React, { useState } from "react";
import { HelperText, useTheme } from "react-native-paper";
import { EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type SignupData = {
	full_name: string;
	username: string;
	email: string;
	birthdate: string;
	password: string;
};

type PasswordInputProps = {
	signupData: SignupData;
	error: string;
	onSubmit?: () => void;
	setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
};

export default function PasswordInput({
	signupData,
	setSignupData,
	error,
	onSubmit,
}: PasswordInputProps) {
	const theme = useTheme();
	const [showPassword, setShowPassword] = useState(false);
	const Icon = showPassword ? EyeIcon : EyeSlashIcon;

	const styles = StyleSheet.create({
		container: {
			paddingLeft: 16,
			paddingRight: 12,
			borderRadius: 12,
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: theme.colors.pearl,
		},
		input: {
			flex: 1,
			height: 56,
			color: "#000000",
			fontFamily: "Epilogue-Regular",
		},
		iconButton: {
			padding: 3,
			marginLeft: 8,
		},
	});

	return (
		<>
			<View style={styles.container}>
				<TextInput
					returnKeyType='done'
					style={styles.input}
					placeholder='Password'
					value={signupData.password}
					onSubmitEditing={onSubmit}
					secureTextEntry={!showPassword}
					placeholderTextColor={theme.colors.gray}
					onChangeText={text => setSignupData(prev => ({ ...prev, password: text }))}
				/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.iconButton}
					onPress={() => setShowPassword(prev => !prev)}
				>
					<Icon size={24} color={theme.colors.gray} />
				</TouchableOpacity>
			</View>
			<HelperText
				type='error'
				visible={!!error}
				theme={theme.colors.red}
				style={{ fontFamily: "Epilogue-Bold" }}
			>
				{error}
			</HelperText>
		</>
	);
}
