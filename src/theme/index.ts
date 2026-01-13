import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import { components } from "./components";
import { palette } from "./palette";
import { spacing } from "./spacing";
import { typography } from "./typography";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: palette,
  components,
  ...typography,
  space: spacing,
  radii: {
    none: "0",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "9999px",
  },
  shadows: {
    menu: "0 8px 24px rgba(0, 0, 0, 0.5)", // Menu shadow - defined in palette.shadow.menu
    playerIcon: "0 0 12px rgba(34, 197, 94, 0.5)", // Player icon glow - defined in palette.shadow.playerIcon
  },
  zIndices: {
    base: 0,
    tooltip: 1500, // Higher than menu to ensure tooltips appear above menu containers
    menuIcon: 999,
    menu: 1000,
    overlay: 10000,
  },
  styles: {
    global: {
      body: {
        bg: "surface.base",
        color: "text.primary",
      },
      // Custom dark scrollbar styling for webkit browsers
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#1a1a1a", // surface.overlay
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255, 255, 255, 0.15)", // border.default
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.25)", // border.hover
      },
      // Firefox scrollbar styling
      "*": {
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255, 255, 255, 0.15) #1a1a1a",
      },
    },
  },
});

export default theme;

