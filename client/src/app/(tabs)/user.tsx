import { useAuth } from "@/src/hooks/useAuth";
import { StyleSheet, Text, View } from "react-native";

export default function User() {

  const { user } = useAuth();
  
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
    },
    boldText: {
      fontSize: 20,
      fontWeight: 700,
      color: "#ffffff",
      fontFamily: "Epilogue",
    }
  });

  return (
      <View style={styles.container}>
        <Text style={styles.boldText}>
          USERNAME: <Text style={styles.text}>{user?.username}</Text>
        </Text>
        <Text style={styles.boldText}>
          FULL NAME: <Text style={styles.text}>{user?.full_name}</Text>
        </Text>
        <Text style={styles.boldText}>
          EMAIL: <Text style={styles.text}>{user?.email}</Text>
        </Text>
        <Text style={styles.boldText}>
          UID: <Text style={styles.text}>{user?.uid}</Text>
        </Text>
      </View>
  );
}