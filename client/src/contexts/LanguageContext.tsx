import i18n from "@/src/locales/i18n";
import * as RNLocalize from "react-native-localize";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Language = "en" | "it" | "fr";
type LanguageContextType = {
	language: Language;
	setLanguage: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [language, setLanguageState] = useState<Language>("en");

	const setLanguage = async (lang: Language) => {
		i18n.changeLanguage(lang);
		setLanguageState(lang);
		await AsyncStorage.setItem("@language", lang);
	};

	useEffect(() => {
		const loadLanguage = async () => {
			const saved = await AsyncStorage.getItem("@language");
			if (saved === "en" || saved === "it" || saved === "fr") {
				setLanguage(saved as Language);
				return;
			}

			const locales = RNLocalize.getLocales();
			const deviceLang = locales[0]?.languageCode ?? "en";
			const normalized: Language = ["en", "it", "fr"].includes(deviceLang)
				? (deviceLang as Language)
				: "en";
			setLanguage(normalized);
		};

		loadLanguage();
	}, []);

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
