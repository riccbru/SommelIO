import { View, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { useAuth } from "@/src/hooks/useAuth";

import Title from "@/src/components/auth/Title";
import UsernameInput from "@/src/components/auth/UsernameInput";
import PasswordInput from "@/src/components/auth/PasswordInput";
import LoginButton from "@/src/components/auth/LoginButton";

export default function LoginLayout() {
  const { isReady, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

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
    }, 650);
  };

  return (
    <View style={styles.container}>
      <Title />
      <UsernameInput
        value={loginData.username}
        onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
      />
      <PasswordInput loginData={loginData} setLoginData={setLoginData} />
      <LoginButton loading={loading} onPress={handlePress} disabled={!isReady || loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    backgroundColor: "#000000"
  }
});
