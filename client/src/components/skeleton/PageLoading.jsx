import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const PageLoading = () => {
  // eslint-disable-next-line no-unused-vars
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen transition-colors duration-300 bg-background",
        darkMode ? "dark" : ""
      )}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-red-500 rounded-full animate-spin"></div>
        <h4 className="text-muted-foreground mt-4">Loading, please wait...</h4>
      </div>
    </div>
  );
};

export default PageLoading;
