import { colors, CustomColors } from "./colors";
import { MD3Theme, MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const LightTheme: MD3Theme & { colors: CustomColors } = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		...colors,
		background: "#ffffff",
		primary: "#000000",
		surface: "#ffffff",
		onSurface: "#000000",
		onBackground: "#000000",
		card: "#e0e0e0",
		notCard: "#252329",
	},
};

export const DarkTheme: MD3Theme & { colors: CustomColors } = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		...colors,
		background: "#000000",
		primary: "#ffffff",
		surface: "#000000",
		onSurface: "#ffffff",
		onBackground: "#ffffff",
		card: "#252329",
		notCard: "#f7f3f9",
	},
};
