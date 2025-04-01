import React, { createContext, useContext, useState, useEffect } from 'react';
import {useColorScheme} from 'react-native'
import { light_theme, dark_theme } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === 'dark' ? dark_theme : light_theme);
  const toggleTheme = async () => {
    try {
      const newTheme = theme === light_theme ? dark_theme : light_theme;
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme === dark_theme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error al guardar el tema:', error);
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme === 'dark' ? dark_theme : light_theme);
        } else {
          setTheme(systemTheme === 'dark' ? dark_theme : light_theme);
        }
      } catch (error) {
        console.error('Error al cargar el tema:', error);
      }
    };
    loadTheme();
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
