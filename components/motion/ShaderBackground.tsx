"use client"

export function ShaderBackground() {
  return (
    <div className="shader-background" aria-hidden="true">
      {/* Subtle background pitch-line motif */}
      <svg
        className="absolute inset-0 w-full h-full stroke-[var(--color-hairline)] opacity-20 dark:opacity-30 select-none pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {/* Pitch boundary */}
        <rect x="50" y="50" width="900" height="900" fill="none" strokeWidth="1" />
        
        {/* Center line */}
        <line x1="50" y1="500" x2="950" y2="500" strokeWidth="1" />
        
        {/* Center circle */}
        <circle cx="500" cy="500" r="120" fill="none" strokeWidth="1" />
        <circle cx="500" cy="500" r="4" fill="currentColor" />

        {/* Penalty area top */}
        <rect x="300" y="50" width="400" height="150" fill="none" strokeWidth="1" />
        {/* Goal area top */}
        <rect x="400" y="50" width="200" height="50" fill="none" strokeWidth="1" />
        {/* Penalty arc top */}
        <path d="M 400 200 A 120 120 0 0 0 600 200" fill="none" strokeWidth="1" />

        {/* Penalty area bottom */}
        <rect x="300" y="800" width="400" height="150" fill="none" strokeWidth="1" />
        {/* Goal area bottom */}
        <rect x="400" y="900" width="200" height="50" fill="none" strokeWidth="1" />
        {/* Penalty arc bottom */}
        <path d="M 400 800 A 120 120 0 0 1 600 800" fill="none" strokeWidth="1" />

        {/* Corner arcs */}
        <path d="M 50 80 A 30 30 0 0 0 80 50" fill="none" strokeWidth="1" />
        <path d="M 920 50 A 30 30 0 0 0 950 80" fill="none" strokeWidth="1" />
        <path d="M 50 920 A 30 30 0 0 1 80 950" fill="none" strokeWidth="1" />
        <path d="M 920 950 A 30 30 0 0 1 950 920" fill="none" strokeWidth="1" />
      </svg>
      {/* Keep the noise filter layer but with a subtle style */}
      <div className="bg-noise" />
    </div>
  )
}
