import { Slot } from "expo-router";
import i18n from "../locales/i18n";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { RefreshProvider } from "../contexts/RefreshContext";

export default function RootLayout() {
	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider>
				<LanguageProvider>
					<AuthProvider>
						<RefreshProvider>
							<StatusBar style='auto' />
							<Slot />
						</RefreshProvider>
					</AuthProvider>
				</LanguageProvider>
			</ThemeProvider>
		</I18nextProvider>
	);
}
