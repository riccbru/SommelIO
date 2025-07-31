import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useAuth } from "@/src/hooks/useAuth";

export default function LoginLayout() {
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(loginData.username, loginData.password);
    } catch (err: any) {
      Alert.alert("Login fallito", err.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benvenuto 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={loginData.username}
        onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={loginData.password}
        onChangeText={(text) => setLoginData(prev => ({ ...prev, password: text }))}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Accedi</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e002d",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fefeff",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0c1537",
    color: "#fefeff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#b58638",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
