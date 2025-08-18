import { Slot } from "expo-router";
import i18n from "../locales/i18n";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

export default function RootLayout() {
	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider>
				<LanguageProvider>
					<AuthProvider>
						<StatusBar style='auto' />
						<Slot />
					</AuthProvider>
				</LanguageProvider>
			</ThemeProvider>
		</I18nextProvider>
	);
}
