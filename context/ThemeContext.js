import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { THEMES } from "../constants/colors";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  //const [COLORS, setCOLORS] = useState(THEMES.coffee.light);
  const [COLORS, setCOLORS] = useState(THEMES.forest.light);

  // Charger le mode depuis AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem("isDarkMode");
      const dark = stored === "true";
      setIsDarkMode(dark);
      //setCOLORS(dark ? THEMES.coffee.dark : THEMES.coffee.light);
      setCOLORS(dark ? THEMES.forest.dark : THEMES.forest.light);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    //setCOLORS(newMode ? THEMES.coffee.dark : THEMES.coffee.light);
    setCOLORS(newMode ? THEMES.forest.dark : THEMES.forest.light);
    await AsyncStorage.setItem("isDarkMode", newMode.toString());
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, COLORS, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
