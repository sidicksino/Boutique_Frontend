const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
};

// DARK MODE 

const coffeeThemeDark = {
  primary: "#D7B49E",
  background: "#2B1F1A",
  text: "#F5E8DC",
  border: "#6E4F41",
  white: "#2B1F1A",
  textLight: "#CBB8A5",
  expense: "#E57373",
  income: "#81C784",
  card: "#3E2F28",
  shadow: "#000000",
};

const forestThemeDark = {
  primary: "#81C784",
  background: "#102218",
  text: "#E8F5E9",
  border: "#1B5E20",
  white: "#102218",
  textLight: "#A5D6A7",
  expense: "#EF9A9A",
  income: "#A5D6A7",
  card: "#1A3324",
  shadow: "#000000",
};


const purpleThemeDark = {
  primary: "#CE93D8",
  background: "#1C0F26",
  text: "#F3E5F5",
  border: "#5E35B1",
  white: "#1C0F26",
  textLight: "#D1C4E9",
  expense: "#EF9A9A",
  income: "#81C784",
  card: "#2A1740",
  shadow: "#000000",
};

const oceanThemeDark = {
  primary: "#4FC3F7",
  background: "#0D1B26",
  text: "#E1F5FE",
  border: "#01579B",
  white: "#0D1B26",
  textLight: "#81D4FA",
  expense: "#EF9A9A",
  income: "#80CBC4",
  card: "#102A38",
  shadow: "#000000",
};


export const THEMES = {
  coffee: {
    light: coffeeTheme,
    dark: coffeeThemeDark,
  },
  forest: {
    light: forestTheme,
    dark: forestThemeDark,
  },
  purple: {
    light: purpleTheme,
    dark: purpleThemeDark,
  },
  ocean: {
    light: oceanTheme,
    dark: oceanThemeDark,
  },
};

// 👇 change this to switch theme
export const COLORS = THEMES.forest.light;