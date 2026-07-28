import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(null);
function getSystem() {
    if (typeof window === "undefined")
        return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState("system");
    const [resolved, setResolved] = useState("light");
    useEffect(() => {
        const stored = localStorage.getItem("theme") ?? "system";
        setThemeState(stored);
    }, []);
    useEffect(() => {
        const apply = () => {
            const next = theme === "system" ? getSystem() : theme;
            setResolved(next);
            document.documentElement.classList.toggle("dark", next === "dark");
        };
        apply();
        if (theme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            mq.addEventListener("change", apply);
            return () => mq.removeEventListener("change", apply);
        }
    }, [theme]);
    const setTheme = (t) => {
        localStorage.setItem("theme", t);
        setThemeState(t);
    };
    return <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx)
        throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}
