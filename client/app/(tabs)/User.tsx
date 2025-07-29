import { StyleSheet, Text, View } from "react-native";

export default function User() {

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
        },
        text: {
          fontSize: 30,
          fontWeight: 300,
          color: "#ffffff",
          fontFamily: "Epilogue",
        },
        link: {
          fontSize: 20,
          color: "#9e9eff",
          textDecorationLine: "underline",
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>profilo utente</Text>
        </View>
    );
}