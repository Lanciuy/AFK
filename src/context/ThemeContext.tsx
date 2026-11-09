/**
 * @file src/context/ThemeContext.tsx
 * Context provider untuk manajemen tema aplikasi (Light Mode & Dark Mode).
 * Menyediakan palet warna lengkap dan hook useTheme() untuk seluruh komponen.
 */

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export const THEME_PALETTES = {
  light: {
    background: "#f7f8fa",
    surface: "#ffffff",
    card: "#ffffff",
    text: "#1a202c",
    secondaryText: "#4a5568",
    mutedText: "#718096",
    subtleText: "#a0aec0",
    border: "#e2e8f0",
    inputBackground: "#ffffff",
    selectedBackground: "#fff5f5",
    selectedBorder: "#e53e3e",
    selectedText: "#e53e3e",
    cancelBackground: "#edf2f7",
    cancelText: "#4a5568",
    headerBackground: "#4a154b",
    headerText: "#ffffff",
    badgeBackground: "rgba(255, 255, 255, 0.18)",
    badgeText: "#ffffff",
    primary: "#e53e3e",
    primaryContrast: "#ffffff",
    toggleTrack: "rgba(255, 255, 255, 0.22)",
    toggleIndicator: "#fbbf24",
  },
  dark: {
    background: "#0f172a",
    surface: "#1e293b",
    card: "#1e293b",
    text: "#f8fafc",
    secondaryText: "#cbd5e1",
    mutedText: "#94a3b8",
    subtleText: "#64748b",
    border: "#334155",
    inputBackground: "#0f172a",
    selectedBackground: "#3b1728",
    selectedBorder: "#ef4444",
    selectedText: "#fca5a5",
    cancelBackground: "#334155",
    cancelText: "#e2e8f0",
    headerBackground: "#0f172a",
    headerText: "#ffffff",
    badgeBackground: "rgba(255, 255, 255, 0.12)",
    badgeText: "#f8fafc",
    primary: "#ef4444",
    primaryContrast: "#ffffff",
    toggleTrack: "rgba(255, 255, 255, 0.16)",
    toggleIndicator: "#818cf8",
  },
} as const;

export type ThemePalette = (typeof THEME_PALETTES)[keyof typeof THEME_PALETTES];

interface ThemeContextValue {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  theme: ThemePalette;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * ThemeProvider membungkus hierarki root aplikasi agar state tema dapat diakses
 * oleh seluruh screen dan child component secara reaktif.
 */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? THEME_PALETTES.dark : THEME_PALETTES.light;

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = useMemo(
    () => ({ isDarkMode, setIsDarkMode, toggleTheme, theme }),
    [isDarkMode, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook kustom useTheme mempermudah konsumsi state tema dan memastikan
 * komponen dipanggil dalam cakupan ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
