import { Slot } from "expo-router";
import i18n from "../locales/i18n";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { I18nextProvider } from "react-i18next";
import { DarkTheme, LightTheme } from "../theme";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

	return (
		<I18nextProvider i18n={i18n}>
			<PaperProvider theme={theme}>
				<AuthProvider>
					<StatusBar style='auto' />
					<Slot />
				</AuthProvider>
			</PaperProvider>
		</I18nextProvider>
	);
}
