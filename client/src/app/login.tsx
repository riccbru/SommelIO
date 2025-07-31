import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/src/hooks/useAuth";
import PasswordInput from "../components/PasswordInput";

export default function LoginLayout() {
    
  const { login } = useAuth();
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
    setTimeout(async () => {
      try {
        handleLogin();
      } finally {
        setLoading(false);
      }
    }, 650);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login SommelIO🍷</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={loginData.username}
        placeholderTextColor="#808080"
        onChangeText={(text) => setLoginData(prev => ({ ...prev, username: text }))}
      />

      <PasswordInput loginData={loginData} setLoginData={setLoginData} />

      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={handlePress}
      >
        {loading ? 
          <ActivityIndicator color="#ffffff" />
         : 
          <Text style={styles.buttonText}>LOGIN</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    fontWeight: "600",
    color: "#fefeff",
    textAlign: "center"
  },
  input: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      color: "#000000",
      backgroundColor: "#d3d5cb"
  },
  button: {
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: "#b58638"
  },
  buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#ffffff"
  },
});
