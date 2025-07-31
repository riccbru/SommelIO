import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  loading: boolean;
  onPress: () => void;
  disabled: boolean;
};

export default function LoginButton({ loading, onPress, disabled }: Props) {

  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: theme.colors.amber
    },
    buttonDisabled: {
      opacity: 0.7
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#ffffff"
    }
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>LOGIN</Text>
      )}
    </TouchableOpacity>
  );
}

