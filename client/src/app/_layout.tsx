import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "../theme";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return(
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar style="auto" />
        <Slot />
      </AuthProvider>
    </PaperProvider>
  );
}
