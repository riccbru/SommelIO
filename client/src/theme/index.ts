import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const customColors = {
    amber: "#b58638",
    gray: "#808080",
    pearl: "#d3d5cb",
}

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...customColors,
    ...MD3LightTheme.colors,
    background: '#ffffff',
    primary: '#000000',
    surface: '#ffffff',
    onSurface: '#000000',
    onBackground: '#000000',
    text: '#000000',
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...customColors,
    ...MD3DarkTheme.colors,
    background: '#000000',
    primary: '#ffffff',
    surface: '#000000',
    onSurface: '#ffffff',
    onBackground: '#ffffff',
    text: '#ffffff',
  },
};
