import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { AppTheme, ThemeStyles, THEMES } from "./themes";

interface ThemeContextValue {
  theme: AppTheme;
  T: ThemeStyles;
  setTheme: (t: AppTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "space",
  T: THEMES.space,
  setTheme: () => {},
});

function getSavedTheme(): AppTheme {
  try {
    const saved = localStorage.getItem("arcs-secret-theme") as AppTheme | null;
    if (saved && THEMES[saved]) return saved;
  } catch {}
  return "space";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>(getSavedTheme);

  const setTheme = useCallback((t: AppTheme) => {
    setThemeState(t);
    document.body.style.background = THEMES[t].bodyBg;
    try {
      localStorage.setItem("arcs-secret-theme", t);
    } catch {}
  }, []);

  // Apply on mount
  useEffect(() => {
    document.body.style.background = THEMES[theme].bodyBg;
    document.body.style.transition = "background 0.4s ease";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, T: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
