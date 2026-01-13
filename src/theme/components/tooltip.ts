import type { ComponentStyleConfig } from "@chakra-ui/react";

/**
 * Tooltip component theme configuration.
 * Chakra UI automatically uses zIndices.tooltip from the theme for z-index,
 * which is set to 1500 to ensure tooltips appear above menu containers (z-index: 1000).
 */
export const tooltip: ComponentStyleConfig = {
  baseStyle: {
    bg: "surface.elevated",
    color: "text.primary",
    border: "1px solid",
    borderColor: "border.default",
    borderRadius: "md",
    px: 3,
    py: 2,
    fontSize: "sm",
    fontWeight: "normal",
    boxShadow: "menu",
    // z-index is automatically applied from theme.zIndices.tooltip (1500)
  },
};

