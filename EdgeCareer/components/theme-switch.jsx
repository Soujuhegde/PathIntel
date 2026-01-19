"use client";

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme === "dark" ? (
    <button
      onClick={() => setTheme("light")}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-zinc-950 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-800"
    >
      <SunIcon className="w-6 h-6" />
    </button>
  ) : (
    <button
      onClick={() => setTheme("dark")}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-zinc-950 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-800"
    >
      <MoonIcon className="w-6 h-6" />
    </button>
  );
};

export default ThemeSwitch;
