import * as RNLocalize from "react-native-localize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "it" | "fr";
const STORAGE_KEY = "@app_language";
const SUPPORTED_LANGUAGES: Language[] = ["en", "it", "fr"];

interface LanguageContextProps {
	language: Language;
	setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
	language: "en",
	setLanguage: () => {},
});

const getSystemLanguage = (): Language => {
	const locales = RNLocalize.getLocales();
	if (Array.isArray(locales)) {
		const code = locales[0].languageCode.toUpperCase();
		if (SUPPORTED_LANGUAGES.includes(code as Language)) return code as Language;
	}
	return "en"; // fallback
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [language, setLanguageState] = useState<Language>("en");

	useEffect(() => {
		const loadLanguage = async () => {
			const saved = await AsyncStorage.getItem(STORAGE_KEY);
			if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
				setLanguageState(saved as Language);
			} else {
				setLanguageState(getSystemLanguage());
			}
		};
		loadLanguage();
	}, []);

	const setLanguage = async (lang: Language) => {
		setLanguageState(lang);
		await AsyncStorage.setItem(STORAGE_KEY, lang);
	};

	const values = { language, setLanguage };

	return <LanguageContext.Provider value={values}>{children}</LanguageContext.Provider>;
};
