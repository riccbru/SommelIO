import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "react-native-paper";
import { showAlert } from "@/src/utils/showAlert";
import AuthTitle from "@/src/components/auth/AuthTitle";
import AuthInput from "@/src/components/auth/AuthInput";
import AuthButton from "@/src/components/auth/AuthButton";
import DateInput from "@/src/components/auth/signup/DateInput";
import UserModal from "@/src/components/auth/signup/UserModal";
import { AppleButton } from "@/src/components/auth/AppleButton";
import { GoogleButton } from "@/src/components/auth/GoogleButton";
import { LineSeparator } from "@/src/components/auth/LineSeparator";
import { FacebookButton } from "@/src/components/auth/FacebookButton";
import PasswordInput from "@/src/components/auth/signup/PasswordInput";
import { SignupFooter } from "@/src/components/auth/signup/SignupFooter";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

export default function SignupLayout() {

    const defaultSignupData = {
        full_name: "",
        username: "",
        email: "",
        birthdate: "",
        password: "",
    }

    const theme = useTheme();
    const { isReady, signup } = useAuth();
    const [modal, setModal] = useState(false);
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
            await signup(signupData);
            setModal(true);
        } catch (err: any) {
            showAlert({
                confirmText: "OK",
                cancelText: "Close",
                title: "Signup Error",
                message: err.message || "Unknown signup error",
            });
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
            keyboardVerticalOffset={90}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: theme.colors.background }}
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
                    holder="Email"
                    isEmail={true}
                    value={signupData.email}
                    onChangeText={(text) => setSignupData(prev => ({ ...prev, email: text }))}
                />
    
                <DateInput
                    value={signupData.birthdate}
                    onChangeText={(text) => setSignupData(prev => ({ ...prev, birthdate: text }))}
                />

                <AuthInput
                    holder="Username"
                    value={signupData.username}
                    onChangeText={(text) => setSignupData(prev => ({ ...prev, username: text }))}
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

                <UserModal modal={modal} setModal={setModal} />
                
            </ScrollView>
        </KeyboardAvoidingView>
    )
}