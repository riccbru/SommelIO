import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { FingerprintIcon } from "phosphor-react-native";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

export function BiometricButton() {

    const theme = useTheme();
    const [biometricSupported, setBiometricSupported] = useState(false);

    const handlePress = async () => {

        // const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        // const iris = supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS);
        // const fingerprint = supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);
        // const facial_recognition = supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
        // const possibilities = `\nIRIS:\t\t\t${iris}\nFINGERPRINT:\t\t${fingerprint}\nFACIAL RECOGNITION:\t${facial_recognition}`;
        // console.log(possibilities);

        // const result = await LocalAuthentication.authenticateAsync({
        //     cancelLabel: 'Cancel',
        //     disableDeviceFallback: false,
        //     fallbackLabel: 'Enter Password',
        //     promptMessage: 'Login with Face ID or Fingerprint',
        // });
        // if (result.success) {
        //     console.log("Unlocked");
        // }

        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!hasHardware || !isEnrolled) {
              Alert.alert("Errore", "Face ID non disponibile");
              return;
            }
        
            const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
            const faceIDAvailable = supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
        
            const result = await LocalAuthentication.authenticateAsync({
                cancelLabel: "Annulla",
                fallbackLabel: "Usa codice",
                disableDeviceFallback: false,
                promptMessage: faceIDAvailable ? "Accedi con Face ID" : "Accedi con codice",
            });
        
            if (result.success) console.log("Unlocked");
        
        } catch (err) {
            console.error("Biometric login failed:", err);
            Alert.alert("Errore", "Autenticazione fallita.");
        }
    }

    const styles = StyleSheet.create({
        button: {
          padding: 10,
          borderRadius: 12,
          alignItems: "center"
        },
    });

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            const value = compatible && enrolled
            setBiometricSupported(value);
        })();
  }, []);

    return (
        <TouchableOpacity
            disabled={false}
            style={styles.button}
            onPress={handlePress}
        >
            <FingerprintIcon size={32} color="#ffffff"/>
        </TouchableOpacity>
    );
}