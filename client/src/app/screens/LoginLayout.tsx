import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "react-native-paper";
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
import { showAlert } from "@/src/utils/showAlert";

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
        title: "Login failed",
        message: err.message || "Unknown login error",
        onCancel: () => console.log("Cancelled"),
        onConfirm: () => console.log("Confirmed"),
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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthTitle action={"Login"}/>

        <GoogleButton />
        <AppleButton />
        <FacebookButton />
        <LineSeparator />
        
        <AuthInput
          value={loginData.username}
          holder="Username"
          onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
        />
        <PasswordInput
          loginData={loginData}
          setLoginData={setLoginData}
          onSubmit={handleLogin}
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

        <LoginFooter />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
