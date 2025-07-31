import React, { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#d3d5cb",
    marginBottom: 16,
    paddingRight: 12,
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: 56,
    color: "#000000",
  },
  iconButton: {
    padding: 4,
    marginLeft: 8,
    color: "#000000",
  },
});
