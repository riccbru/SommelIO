import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type SignupData = {
    full_name: string;
    username: string;
    email: string;
    birthdate: string;
    password: string;
}

type PasswordInputProps = {
  signupData: SignupData;
  onSubmit?: () => void;
  setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
};

export default function PasswordInput({ signupData, setSignupData, onSubmit }: PasswordInputProps) {

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const Icon = showPassword ? EyeIcon : EyeSlashIcon;

  const styles = StyleSheet.create({
    container: {
      paddingLeft: 16,
      paddingRight: 12,
      marginBottom: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.pearl
    },
    input: {
      flex: 1,
      height: 56,
      color: "#000000"
    },
    iconButton: {
      padding: 3,
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        returnKeyType="done"
        style={styles.input}
        placeholder="Password"
        onSubmitEditing={onSubmit}
        value={signupData.password}
        placeholderTextColor={theme.colors.gray}
        secureTextEntry={!showPassword}
        onChangeText={(text) => setSignupData(prev => ({ ...prev, password: text }))}
      />
      <TouchableOpacity style={styles.iconButton} onPress={() => setShowPassword(prev => !prev)}>
        <Icon size={24} color={theme.colors.gray} />
      </TouchableOpacity>
    </View>
  );
}
