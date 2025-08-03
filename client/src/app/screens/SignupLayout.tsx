import { useState } from "react";
import { useTheme } from "react-native-paper";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import AuthTitle from "@/src/components/auth/AuthTitle";
import AuthInput from "@/src/components/auth/AuthInput";
import PasswordInput from "@/src/components/auth/signup/PasswordInput";
import AuthButton from "@/src/components/auth/AuthButton";
import { useAuth } from "@/src/hooks/useAuth";
import { LineSeparator } from "@/src/components/auth/LineSeparator";
import { GoogleButton } from "@/src/components/auth/GoogleButton";
import { FacebookButton } from "@/src/components/auth/FacebookButton";
import { SignupFooter } from "@/src/components/auth/signup/SignupFooter";
import DateInput from "@/src/components/auth/signup/DateInput";
import { useRouter } from "expo-router";
import { AppleButton } from "@/src/components/auth/AppleButton";

export default function SignupLayout() {

    const defaultSignupData = {
        full_name: "",
        username: "",
        email: "",
        birthdate: "",
        password: "",
    }

    const theme = useTheme();
    const router = useRouter();
    const { isReady, signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [signupData, setSignupData] = useState(defaultSignupData);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 32,
            justifyContent: "center",
            backgroundColor: theme.colors.background
        }, 
        text: {
            color: "#ffffff"
        }
    });

    const handleSignup = async () => {
        try {
          signup(signupData);
          router.replace("/login");
        } catch (err: any) {
          Alert.alert("Signup failed", err.message || "Errore sconosciuto");
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
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <AuthTitle action={"Signup"}/>

                <GoogleButton />
                <AppleButton />
                <FacebookButton />
                <LineSeparator />
                
                <AuthInput
                    holder="Full name"
                    value={signupData.full_name}
                    onChangeText={(text) => setSignupData(prev => ({ ...prev, full_name: text }))}
                />
                <AuthInput
                    holder="Username"
                    value={signupData.username}
                    onChangeText={(text) => setSignupData(prev => ({ ...prev, username: text }))}
                />
                <AuthInput
                    holder="Email"
                    value={signupData.email}
                    onChangeText={(text) => setSignupData(prev => ({ ...prev, email: text }))}
                />
    
                <DateInput
                    value={signupData.birthdate}
                    onChangeText={(text) => setSignupData(prev => ({ ...prev, birthdate: text }))}
                />
    
                <PasswordInput
                    onSubmit={handlePress}
                    signupData={signupData}
                    setSignupData={setSignupData}
                />
    
                <AuthButton 
                    action="SIGNUP"
                    loading={loading}
                    onPress={handlePress}
                    disabled={!isReady || loading}
                />
        
                <SignupFooter />
        
            </ScrollView>
        </KeyboardAvoidingView>
    )
}