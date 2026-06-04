"use client"

import { useTheme } from "@/components/ThemeContext"

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Dark mode icon — UCL Starball glowing */}
      <span className="theme-toggle__icon theme-toggle__icon--dark">
        <img
          src="/ucl-dark-mode-svg.png"
          alt="Dark Mode"
          width="26"
          height="26"
          className="ucl-glow"
        />
      </span>
      {/* Light mode icon — UCL Starball normal */}
      <span className="theme-toggle__icon theme-toggle__icon--light">
        <img
          src="/ucl-light-mode-svg.png"
          alt="Light Mode"
          width="26"
          height="26"
        />
      </span>
    </button>
  )
}
