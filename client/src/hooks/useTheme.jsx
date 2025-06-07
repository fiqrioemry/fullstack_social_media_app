import { useEffect, useState } from "react";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || true
  );

  const handleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return { handleDarkMode, darkMode };
};

export default useTheme;
