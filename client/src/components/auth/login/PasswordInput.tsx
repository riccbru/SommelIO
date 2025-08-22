import React, { useState } from "react";
import { HelperText, useTheme } from "react-native-paper";
import { EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type LoginData = {
	username: string;
	password: string;
};

type PasswordInputProps = {
	loginData: LoginData;
	onSubmit?: () => void;
	error: string;
	setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
};

export default function PasswordInput({ loginData, setLoginData, error, onSubmit }: PasswordInputProps) {
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
					value={loginData.password}
					onSubmitEditing={onSubmit}
					secureTextEntry={!showPassword}
					placeholderTextColor={theme.colors.gray}
					onChangeText={text => setLoginData(prev => ({ ...prev, password: text }))}
					/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.iconButton}
					onPress={() => setShowPassword(prev => !prev)}
					>
					<Icon size={24} color={theme.colors.gray} />
				</TouchableOpacity>
			</View>
			<HelperText type="error" visible={!!error} theme={theme.colors.red} style={{ fontFamily: "Epilogue-Bold" }}>
				{error}
			</HelperText>
		</>
	);
}
