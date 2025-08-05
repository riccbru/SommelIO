import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useTheme } from "react-native-paper";
import { UserPlusIcon } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Friends() {

  const theme = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginRight: 20 }} onPress={() => console.log("add colleague")}>
          <UserPlusIcon size={32} color={theme.dark ? "#ffffff" : "#000000"} />
        </TouchableOpacity>
      )
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background
    },
    text: {
      fontSize: 30,
      fontWeight: 300,
      fontFamily: "Epilogue",
      color: theme.colors.text
    }
  });

  return (
    <View style={styles.container}>
        <Text style={styles.text}>colleagues</Text>
    </View>
  );
}