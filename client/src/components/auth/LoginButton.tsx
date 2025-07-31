import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

type Props = {
  loading: boolean;
  onPress: () => void;
  disabled: boolean;
};

export default function LoginButton({ loading, onPress, disabled }: Props) {
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

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#b58638"
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
