// Context provider untuk manajemen tema warna aplikasi (Light & Dark Mode)

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

// Daftar token warna untuk mode terang dan gelap
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

// Provider pembungkus aplikasi agar seluruh komponen dapat mengakses palet tema aktif
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? THEME_PALETTES.dark : THEME_PALETTES.light;

  // Beralih antara mode terang dan mode gelap
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = useMemo(
    () => ({ isDarkMode, setIsDarkMode, toggleTheme, theme }),
    [isDarkMode, theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Hook untuk membaca tema aktif dan fungsi pengubah tema di komponen anak
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
