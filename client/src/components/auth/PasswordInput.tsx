import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import { Eye, EyeSlash } from "phosphor-react-native";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type LoginData = {
  username: string;
  password: string;
}

type PasswordInputProps = {
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
};

export default function PasswordInput({ loginData, setLoginData }: PasswordInputProps) {

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

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
        style={styles.input}
        placeholder="Password"
        value={loginData.password}
        placeholderTextColor="#808080"
        secureTextEntry={!showPassword}
        onChangeText={(text) => setLoginData(prev => ({ ...prev, password: text }))}
      />
      <TouchableOpacity style={styles.iconButton} onPress={() => setShowPassword(prev => !prev)}>
        {showPassword ? (
          <Eye size={24} />
        ) : (
          <EyeSlash size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
}
