import i18n from "../locales/i18n";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { DataProvider } from "../contexts/DataContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { RefreshProvider } from "../contexts/RefreshContext";
import { LanguageProvider } from "../contexts/LanguageContext";

export default function RootLayout() {
	return (
		<RefreshProvider>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
					<LanguageProvider>
						<AuthProvider>
							<DataProvider>
								<StatusBar style='auto' />
								<Slot />
							</DataProvider>
						</AuthProvider>
					</LanguageProvider>
				</ThemeProvider>
			</I18nextProvider>
		</RefreshProvider>
	);
}
