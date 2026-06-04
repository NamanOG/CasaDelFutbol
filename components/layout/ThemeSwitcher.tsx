"use client"

import { useTheme } from "@/components/ThemeContext"

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex border border-hairline bg-surface p-1 rounded-none text-[10px] font-mono select-none items-center">
      <button
        onClick={() => theme !== "light" && toggleTheme()}
        className={`px-3 py-1.5 transition-all duration-200 uppercase tracking-widest cursor-pointer ${
          theme === "light"
            ? "bg-text text-canvas font-bold"
            : "text-text-muted hover:text-text"
        }`}
        aria-label="Switch to Day Match mode (Light)"
      >
        Day Match
      </button>
      <button
        onClick={() => theme !== "dark" && toggleTheme()}
        className={`px-3 py-1.5 transition-all duration-200 uppercase tracking-widest cursor-pointer ${
          theme === "dark"
            ? "bg-text text-canvas font-bold"
            : "text-text-muted hover:text-text"
        }`}
        aria-label="Switch to Night Match mode (Dark)"
      >
        Night Match
      </button>
    </div>
  )
}
