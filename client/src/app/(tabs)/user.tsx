import { useLayoutEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { SignOut } from "phosphor-react-native";
import { useNavigation, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function User() {

  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleOnPress = () => {
    logout();
    router.replace("/login");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginTop: 5, marginRight: 16 }} onPress={handleOnPress}>
          <SignOut size={25} color="#ffffff" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "space-evenly",
      backgroundColor: theme.colors.background
    },
    text: {
      fontSize: 20,
      fontWeight: 300,
      fontFamily: "Epilogue",
      color: theme.colors.text
    },
    boldText: {
      fontSize: 20,
      fontWeight: 700,
      fontFamily: "Epilogue",
      color: theme.colors.text
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