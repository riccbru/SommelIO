import { useColorScheme } from "react-native";
import { CustomColors } from "../theme/colors";
import { DarkTheme, LightTheme } from "../theme";
import { MD3Theme, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import type { MD3Colors } from "react-native-paper/lib/typescript/types";

export interface CustomTheme extends MD3Theme {
	isDark: boolean;
	toggleTheme: () => void;
	colors: MD3Colors & CustomColors;
}

export const ThemeContext = createContext<CustomTheme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const THEME_KEY = "@theme";
	const systemColorScheme = useColorScheme();
	const [isDark, setIsDark] = useState(systemColorScheme === "dark");

	useEffect(() => {
		const loadThemePreference = async () => {
			try {
				const stored = await AsyncStorage.getItem(THEME_KEY);
				if (stored !== null) {
					setIsDark(stored === "true");
				} else {
					const systemIsDark = systemColorScheme === "dark";
					setIsDark(systemIsDark);
					await AsyncStorage.setItem(THEME_KEY, systemIsDark.toString());
				}
			} catch (error) {
				console.log(`Error loading theme preference: ${error}`);
			}
		};

		loadThemePreference();
	}, [systemColorScheme]);

	const toggleTheme = async () => {
		const newIsDark = !isDark;
		setIsDark(newIsDark);

		try {
			await AsyncStorage.setItem(THEME_KEY, newIsDark.toString());
		} catch (error) {
			console.log(`Error saving theme preference: ${error}`);
		}
	};

	const baseTheme = isDark ? DarkTheme : LightTheme;

	const theme: CustomTheme = {
		...baseTheme,
		toggleTheme,
		isDark,
	};

	return (
		<ThemeContext.Provider value={theme}>
			<PaperProvider theme={baseTheme}>{children}</PaperProvider>
		</ThemeContext.Provider>
	);
};
