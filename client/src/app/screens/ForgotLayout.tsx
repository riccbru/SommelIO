import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/src/hooks/useAuth";
import AuthButton from "@/src/components/auth/AuthButton";
import { StyleSheet, View } from "react-native";
import AuthInput from "@/src/components/auth/AuthInput";
import { useTranslation } from "react-i18next";

export default function ForgotLayout() {

    const { isReady } = useAuth();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }
    });

    const validateForm = (): boolean => {
        let newError = "";

        if (!email.trim()) {
            newError = `Email ${t("new.required")}`;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newError = `Email ${t("new.invalid")}`;
        }

        setError(newError);
        return !newError.length;
    }

    const handlePress = async () => {
        const res = validateForm();
        console.log(res);
        router.replace("/login");
    }

    return (
        <View style={styles.container}>
            <View style={{ width: 260 }}>
                <AuthInput
                    holder='Email'
                    isEmail={true}
                    value={email}
                    error={error}
                    onChangeText={text => setEmail(text)}
                    />
                <AuthButton
                    action='RESET PASSWORD'
                    loading={false}
                    onPress={handlePress}
                    disabled={!isReady || loading}
                    />
            </View>
        </View>
    )
}