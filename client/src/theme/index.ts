import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const customColors = {
	amber: "#b58638",
	black: "#000000",
	darkGreen: "#145214",
	facebook: "#2c64f6",
	gray: "#808080",
	green: "#67ce67",
	pearl: "#d3d5cb",
	premium: "#4193ef",
	red: "#cc4b4b",
	white: "#ffffff",
};

export const LightTheme = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		...customColors,
		background: "#ffffff",
		primary: "#000000",
		surface: "#ffffff",
		onSurface: "#000000",
		onBackground: "#000000",
		// card: "#f7f3f9",
		card: "#e0e0e0",
		notCard: "#252329",
	},
};

export const DarkTheme = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		...customColors,
		background: "#000000",
		primary: "#ffffff",
		surface: "#000000",
		onSurface: "#ffffff",
		onBackground: "#ffffff",
		card: "#252329",
		notCard: "#f7f3f9",
	},
};
