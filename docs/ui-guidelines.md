# Obsidian Stark UI Design Guidelines

## Philosophy
The Echo UI represents "Institutional Clarity and Long-Term Endurance." It is designed to feel like a high-security terminal and futuristic strategic command center rather than a simple consumer web application.

---

## Color Palette (Obsidian Stark Theme)
*   **Obsidian Background (`#050505`)**: Dominant deep black backdrop. Reduces eye strain during long analytical reading sessions.
*   **Carbon Surface (`#121212`)**: Secondary background layer for components and floating glass panels.
*   **Neon Green Primary (`#39FF14`)**: Used for system status indicators, successful actions, active text, and telemetry charts.
*   **Muted Violet Secondary (`#8B5CF6`)**: Secondary highlight color used to indicate passive context and comparative chart baselines.
*   **Stark Text (`#FAFAFA`)**: Default body text color providing high readability.
*   **Alert Red (`#EF4444`)**: Used to represent destructive actions, clearance restrictions, or audio stream termination.

---

## Typography
*   **Sans-Serif (`Inter`, `Space Grotesk`)**: Pristine body typography used for layout text, metadata, and core information labels.
*   **Monospaced (`JetBrains Mono`, `Fira Code`)**: Used for technical identifiers, transcript segments, telemetry, and SHA-256 cryptographic proof keys.

---

## Layout & Motion Mechanics
*   **Spring-Loaded Sidebar**: Converted to GPU-accelerated Framer Motion spring physics (`stiffness: 260`, `damping: 24`). Translates smoothly from contracted state (80px width) to fully expanded state (288px width) on hover without reflow.
*   **Global Scrollbar Hiding**: Global scrollbar tracks are suppressed (`display: none !important`) to enforce pristine terminal aesthetic control.
*   **Glassmorphism**: Component borders use a `1px solid rgba(255, 255, 255, 0.05)` backdrop filter with a `10px` corner radius to create layered visual depth.

---

## Advanced Strategic Charts Design System
*   **SVG Sparklines**: Embedded micro-trends without surrounding axes to display clean growth trends (e.g. Institutional IQ cards).
*   **Dynamic Ribbons**: Smooth cubic-bezier flow paths visualizing ranking variations over time.
*   **Network Navigator**: Custom 2D canvas nodes displaying particle-physics-based relational lines between people and projects.
*   **Conditional Heatmap Matrix**: Uses high-contrast variable background colors based on cell value percentages (`rgba(57, 255, 20, value)`).
*   **Waterfall Audit Paths**: Uses staggered bar columns illustrating progressive audit changes.
*   **Radial Gauges**: SVG-rendered telemetry indicators representing system latency levels.