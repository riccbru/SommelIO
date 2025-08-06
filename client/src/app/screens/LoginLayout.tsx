import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "react-native-paper";
import { showAlert } from "@/src/utils/showAlert";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthTitle from "@/src/components/auth/AuthTitle";
import AuthButton from "@/src/components/auth/AuthButton";
import { AppleButton } from "@/src/components/auth/AppleButton";
import { GoogleButton } from "@/src/components/auth/GoogleButton";
import { LineSeparator } from "@/src/components/auth/LineSeparator";
import { LoginFooter } from "@/src/components/auth/login/LoginFooter";
import { FacebookButton } from "@/src/components/auth/FacebookButton";
import PasswordInput from "@/src/components/auth/login/PasswordInput";
import { BiometricButton } from "@/src/components/auth/login/BiometricButton";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";

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
      showAlert({
        confirmText: "OK",
        cancelText: "Close",
        title: "Login Error",
        message: err.message || "Unknown login error",
      });
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
      keyboardVerticalOffset={90}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <AuthTitle action={"Login"}/>
        
        <AuthInput
          holder="Username"
          value={loginData.username}
          onSubmit={handleLogin}
          onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
        />
        <PasswordInput
          loginData={loginData}
          onSubmit={handleLogin}
          setLoginData={setLoginData}
        />
        <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <AuthButton
              action="LOGIN"
              loading={loading}
              onPress={handlePress}
              disabled={!isReady || loading}
            />
          </View>
          <BiometricButton />
        </View>

        <LineSeparator />
        <GoogleButton></GoogleButton>
        <AppleButton></AppleButton>
        <FacebookButton></FacebookButton>

        <LoginFooter />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
