import { useContext } from "react";
import { CustomTheme, ThemeContext } from "../contexts/ThemeContext";

export const useTheme = (): CustomTheme => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
