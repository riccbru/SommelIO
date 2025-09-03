export const colors = {
	card: "" as string,
	notCard: "" as string,
	// CUSTOM COLORS
	amber: "#b58638",
	black: "#000000",
	darkGreen: "#145214",
	facebook: "#2c64f6",
	gray: "#808080",
	green: "#67ce67",
	pearl: "#d3d5cb",
	purple: "#c62f7c",
	premium: "#4193ef",
	red: "#cc4b4b",
	white: "#ffffff",
	yellow: "#e9d502",
} as const;

export type CustomColors = typeof colors;
