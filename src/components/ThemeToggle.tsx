import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/site.config";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;
    
    // Use configuration default theme if dark mode is enabled
    if (siteConfig.features.enableDarkMode) {
      if (!root.classList.contains("dark") && !root.classList.contains("light")) {
        root.classList.add("dark");
        setTheme("dark");
      } else {
        const initialTheme = root.classList.contains("dark") ? "dark" : "light";
        setTheme(initialTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (!siteConfig.features.enableDarkMode) return;
    
    const root = document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";
    
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);
  };

  // Don't render if dark mode is disabled
  if (!siteConfig.features.enableDarkMode) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}