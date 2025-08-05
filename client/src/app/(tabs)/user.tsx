import { useLayoutEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "react-native-paper";
import { useNavigation, useRouter } from "expo-router";
import { SignOutIcon, GearIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function User() {

  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }} onPress={() => {
          console.log("profile settings")
        }}>
          <GearIcon size={32} color={theme.dark ? "#ffffff" : "#000000"} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginRight: 20 }} onPress={() => {
          logout();
          router.replace("/login");
        }}>
          <SignOutIcon size={30} color={theme.dark ? "#ffffff" : "#000000"} />
        </TouchableOpacity>
      )
    });
  }, [logout, navigation, router, theme]);
  
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