import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const THEME_PALETTES = {
  light: {
    background: "#f7f8fa",
    surface: "#ffffff",
    card: "#ffffff",
    text: "#1a202c",
    secondaryText: "#4a5568",
    mutedText: "#718096",
    subtleText: "#a0aec0",
    border: "#e2e8f0",
    inputBackground: "#f7f8fa",
    selectedBackground: "#fff5f5",
    selectedBorder: "#e53e3e",
    selectedText: "#e53e3e",
    cancelBackground: "#edf2f7",
    cancelText: "#4a5568",
  },
  dark: {
    background: "#111827",
    surface: "#1f2937",
    card: "#1f2937",
    text: "#f9fafb",
    secondaryText: "#d1d5db",
    mutedText: "#9ca3af",
    subtleText: "#9ca3af",
    border: "#374151",
    inputBackground: "#111827",
    selectedBackground: "#3b1f2b",
    selectedBorder: "#e53e3e",
    selectedText: "#fca5a5",
    cancelBackground: "#374151",
    cancelText: "#e5e7eb",
  },
} as const;

type ThemePalette = (typeof THEME_PALETTES)[keyof typeof THEME_PALETTES];

interface ThemeContextValue {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: ThemePalette;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? THEME_PALETTES.dark : THEME_PALETTES.light;
  const value = useMemo(
    () => ({ isDarkMode, setIsDarkMode, theme }),
    [isDarkMode, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
