import { View, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { useAuth } from "@/src/hooks/useAuth";

import Title from "@/src/components/auth/Title";
import UsernameInput from "@/src/components/auth/UsernameInput";
import PasswordInput from "@/src/components/auth/PasswordInput";
import LoginButton from "@/src/components/auth/LoginButton";
import { useTheme } from "react-native-paper";

export default function LoginLayout() {

  const theme = useTheme();
  const { isReady, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      justifyContent: "center",
      backgroundColor: theme.colors.background
    }
  });

  const handleLogin = async () => {
    try {
      await login(loginData.username, loginData.password);
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Login fallito", err.message || "Errore sconosciuto");
    }
  };

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      handleLogin().finally(() => setLoading(false));
    }, 550);
  };

  return(
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Title />
        <UsernameInput
          value={loginData.username}
          onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
        />
        <PasswordInput loginData={loginData} setLoginData={setLoginData} />
        <LoginButton disabled={!isReady || loading} loading={loading} onPress={handlePress} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
