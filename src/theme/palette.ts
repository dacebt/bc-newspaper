// Black & White Theme Palette
// Core color definitions for the Bitcraft theme

export const palette = {
  // Pure black & white base
  bw: {
    0: "#000000", // Pure black
    50: "#0a0a0a", // Near black
    100: "#1a1a1a", // Very dark gray
    200: "#2a2a2a", // Dark gray
    300: "#3a3a3a", // Medium dark gray
    400: "#4a4a4a", // Medium gray
    500: "#5a5a5a", // Mid gray
    600: "#6a6a6a", // Light gray
    700: "#7a7a7a", // Lighter gray
    800: "#8a8a8a", // Even lighter gray
    900: "#ffffff", // Pure white
  },

  // Text colors - white at varying opacities
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.8)",
    tertiary: "rgba(255, 255, 255, 0.6)",
    muted: "rgba(255, 255, 255, 0.4)",
  },

  // Surface/background colors - near-black variants
  surface: {
    base: "#000000", // Pure black background
    elevated: "#0a0a0a", // Slightly lighter for cards/elevated surfaces
    overlay: "#1a1a1a", // Even lighter for modals/overlays
    hover: "rgba(255, 255, 255, 0.05)", // Hover state background
    hoverSubtle: "rgba(255, 255, 255, 0.03)", // Subtle hover state background
  },

  // Background overlay colors for hero sections with gradients
  // Base color: #0f172a (slate-900) - used for hero backgrounds
  overlay: {
    base: "#0f172a", // Slate-900 base color
    light: "rgba(15, 23, 42, 0.25)", // 25% opacity for light gradient overlay
    medium: "rgba(15, 23, 42, 0.5)", // 50% opacity for medium gradient overlay
    dark: "rgba(15, 23, 42, 0.6)", // 60% opacity for dark gradient overlay
    backdrop: "rgba(0, 0, 0, 0.85)", // 85% opacity for tutorial/modals backdrop
    blackLight: "rgba(0, 0, 0, 0.2)", // 20% black opacity for light overlays
    fade: "rgba(255, 255, 255, 0.1)", // 10% white opacity for fade gradients
  },

  // Border colors - white at varying opacities
  border: {
    default: "rgba(255, 255, 255, 0.15)",
    hover: "rgba(255, 255, 255, 0.25)",
    focus: "rgba(255, 255, 255, 0.4)",
  },

  // Action accent (sparingly used for primary actions)
  accent: {
    action: "#ffffff", // White for primary actions
  },

  // Status colors
  status: {
    success: "#22c55e", // Green for success/selected states
    error: "#cc5544", // Red for errors
    errorBg: "rgba(204, 85, 68, 0.12)", // Error alert background
    errorBorder: "rgba(204, 85, 68, 0.4)", // Error alert border
    successBg: "rgba(34, 197, 94, 0.18)", // Success alert background
    successBorder: "rgba(34, 197, 94, 0.35)", // Success alert border
    info: "#4cc9f0", // Cyan for informational states
    infoBg: "rgba(76, 201, 240, 0.15)", // Info alert background
    infoBorder: "rgba(76, 201, 240, 0.4)", // Info alert border
    neutralBg: "rgba(255, 255, 255, 0.04)", // Neutral subtle background
    neutralBorder: "rgba(255, 255, 255, 0.1)", // Neutral subtle border
    warning: "#ec4899", // Warning/required state (pink)
    warningBg: "rgba(236, 72, 153, 0.1)", // Warning alert background
    warningBorder: "rgba(236, 72, 153, 0.5)", // Warning alert border
    required: "#ec4899", // Required items color (matches warning)
    requiredBg: "rgba(236, 72, 153, 0.1)", // Required item background
    requiredBorder: "rgba(236, 72, 153, 0.5)", // Required item border
    completeBg: "rgba(34, 197, 94, 0.1)", // Complete item background
    completeBorder: "rgba(34, 197, 94, 0.5)", // Complete item border
  },

  // Player state colors
  player: {
    selected: "#22c55e", // Green for selected player
    selectedHover: "rgba(34, 197, 94, 0.5)", // Green with opacity for hover effects
    unselectedBorder: "rgba(255, 255, 255, 0.3)", // Border when no player
    unselectedBorderHover: "rgba(255, 255, 255, 0.5)", // Border hover state
    unselectedBgHover: "rgba(255, 255, 255, 0.1)", // Background hover state
    unselectedIcon: "rgba(255, 255, 255, 0.5)", // Icon color when no player
  },

  // Shadow colors
  shadow: {
    menu: "0 8px 24px rgba(0, 0, 0, 0.5)", // Menu shadow
    playerIcon: "0 0 12px rgba(34, 197, 94, 0.5)", // Player icon glow
  },

  // Navigation colors
  nav: {
    active: "#22c55e", // Green for active route (matches player.selected)
    activeBg: "rgba(34, 197, 94, 0.1)", // Subtle background for active route
    inactive: "rgba(255, 255, 255, 0.8)", // Default text color for inactive routes
    disabled: "rgba(255, 255, 255, 0.3)", // Reduced opacity for disabled routes
    hover: "rgba(255, 255, 255, 0.95)", // Slightly brighter on hover
    hoverBg: "rgba(255, 255, 255, 0.1)", // Background hover state
    border: "rgba(255, 255, 255, 0.15)", // Border for navigation items
    borderActive: "#22c55e", // Border for active navigation item
  },

  // UI accent colors for feature cards and decorative surfaces
  // Purple accent (not tied to game tier system)
  ui: {
    surfaceAccent: "#814F87", // Base purple hex for UI accent surfaces
    surfaceAccentBg: "rgba(129, 79, 135, 0.15)", // Translucent purple background
    surfaceAccentBorder: "rgba(129, 79, 135, 0.3)", // Translucent purple border
    surfaceAccentHoverBg: "rgba(129, 79, 135, 0.2)", // Hover state background
    surfaceAccentHoverBorder: "rgba(129, 79, 135, 0.5)", // Hover state border
  },

  // Unified tier colors (0-10) - adapted from BitCraft game tier colors
  // Used for both skills and items. Colors adapted for dark theme while staying in game's color ballpark
  tier: {
    0: {
      base: "#413A64", // Purple-ish (tier 0)
      gradient: "linear-gradient(135deg, #312a54 0%, #514a74 100%)",
    },
    1: {
      base: "#636A74", // Gray (tier 1)
      gradient: "linear-gradient(135deg, #535a64 0%, #737a84 100%)",
    },
    2: {
      base: "#875F45", // Brown/orange (tier 2)
      gradient: "linear-gradient(135deg, #774f35 0%, #976f55 100%)",
    },
    3: {
      base: "#5C6F4D", // Green (tier 3)
      gradient: "linear-gradient(135deg, #4c5f3d 0%, #6c7f5d 100%)",
    },
    4: {
      base: "#49619C", // Blue (tier 4)
      gradient: "linear-gradient(135deg, #39518c 0%, #5971ac 100%)",
    },
    5: {
      base: "#814F87", // Purple (tier 5)
      gradient: "linear-gradient(135deg, #713f77 0%, #915f97 100%)",
    },
    6: {
      base: "#983A44", // Red (tier 6)
      gradient: "linear-gradient(135deg, #882a34 0%, #a84a54 100%)",
    },
    7: {
      base: "#947014", // Gold/yellow (tier 7)
      gradient: "linear-gradient(135deg, #846004 0%, #a48024 100%)",
    },
    8: {
      base: "#538484", // Teal/cyan (tier 8)
      gradient: "linear-gradient(135deg, #437474 0%, #639494 100%)",
    },
    9: {
      base: "#464953", // Dark gray (tier 9)
      gradient: "linear-gradient(135deg, #363943 0%, #565963 100%)",
    },
    10: {
      base: "#97AFBE", // Light blue (tier 10)
      gradient: "linear-gradient(135deg, #879fae 0%, #a7bfce 100%)",
    },
  },

  // Rarity colors - inspired by BitCraft game colors, adapted for dark theme
  // Colors slightly brightened and adjusted for better visibility on dark backgrounds
  // Based on game rarity progression: Common -> Uncommon -> Rare -> Epic -> Legendary -> Mythic
  rarity: {
    common: "#9a7d5a", // Brown/tan - Common items (inspired by #866d49)
    uncommon: "#a56d63", // Reddish brown - Uncommon items (inspired by #955c52)
    rare: "#7a92b3", // Blue-gray - Rare items (inspired by #6a809f)
    epic: "#d5852a", // Orange - Epic items (inspired by #c37513)
    legendary: "#20aed1", // Cyan/blue - Legendary items (inspired by #1096bd)
    mythic: "#8f5df9", // Purple - Mythic items (inspired by #7e4de7)
    // Fallback for unknown rarity values
    default: "rgba(255, 255, 255, 0.15)", // Default border color
  },
} as const;
