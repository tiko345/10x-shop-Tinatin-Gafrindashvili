import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Read the saved preference and default to light
function getInitialTheme(): Theme {
    try {
        return localStorage.getItem("shop_theme") === "dark"
            ? "dark"
            : "light";
    } catch {
        return "light";
    }
}

function ThemeProvider({ children }: ThemeProviderProps) {
    // Read storage only when this provider first mounts
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        // Apply the theme to the root HTML element
        document.documentElement.classList.toggle("dark", theme === "dark");

        // Match browser controls such as scrollbars to the selected theme
        document.documentElement.style.colorScheme = theme;

        try {
            localStorage.setItem("shop_theme", theme);
        } catch {
            // Keep the toggle working even when storage is unavailable
        }
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}

export default ThemeProvider;