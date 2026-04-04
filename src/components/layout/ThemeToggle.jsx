import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";
import useLocalStorage from "../../utils/useLocalStorage";

function ThemeToggle() {
  // Persist theme preference in localStorage
  // Default: true (dark mode) — since our app was originally dark-only
  const [darkMode, setDarkMode] = useLocalStorage("findash-dark-mode", true);

  // Sync the "dark" class on <html> whenever darkMode changes
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      id="theme-toggle"
      onClick={() => setDarkMode((prev) => !prev)}
      className="rounded-lg p-2 text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;
