import { useAuth } from "@/hooks/useAuth";
import { StyleSheet, Text, View } from "react-native";

export default function User() {

  const { token, user } = useAuth();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "space-evenly",
      backgroundColor: "#000000",
    },
    text: {
      fontSize: 20,
      fontWeight: 300,
      color: "#ffffff",
      fontFamily: "Epilogue",
    }
  });

  return (
      <View style={styles.container}>
          <Text style={styles.text}>UID: {user?.uid}</Text>
          <Text style={styles.text}>Username: {user?.username}</Text>
          <Text style={styles.text}>Full Name: {user?.full_name}</Text>
          <Text style={styles.text}>Email: {user?.email}</Text>
          <Text style={styles.text}>JWT Access Token: {token}</Text>
      </View>
  );
}