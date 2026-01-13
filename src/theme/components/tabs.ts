import type { ComponentStyleConfig } from "@chakra-ui/react";

export const tabs: ComponentStyleConfig = {
  baseStyle: {
    tab: {
      fontWeight: "medium",
      color: "text.secondary",
      transition: "all 150ms ease",
      _focusVisible: {
        boxShadow: "none",
      },
    },
    tablist: {
      gap: 2,
    },
  },
  variants: {
    // Primary = page-level navigation tabs (Overview / Recipe Breakdown / Tracked Inventory)
    primary: {
      tab: {
        borderRadius: 0,
        px: 4,
        py: 3,
        fontSize: "xs",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        borderBottom: "3px solid",
        borderColor: "transparent",
        _hover: {
          color: "text.primary",
          borderColor: "border.hover",
        },
        _selected: {
          color: "text.primary",
          borderColor: "border.focus",
        },
      },
      tablist: {
        borderBottom: "1px solid",
        borderColor: "border.default",
        pb: 2,
        overflowX: "auto",
      },
    },
    // Secondary = item-level tabs (one per selected recipe)
    secondary: {
      tab: {
        borderRadius: "full",
        px: 4,
        py: 2,
        fontSize: "sm",
        border: "1px solid",
        borderColor: "transparent",
        bg: "transparent",
        _hover: {
          color: "text.primary",
          bg: "surface.hoverSubtle",
          borderColor: "border.default",
        },
        _selected: {
          color: "text.primary",
          bg: "surface.overlay",
          borderColor: "border.focus",
          boxShadow: "inset 0 1px 0 var(--chakra-colors-border-default)",
        },
      },
      tablist: {
        borderBottom: "1px solid",
        borderColor: "border.default",
        pb: 2,
        overflowX: "auto",
      },
    },
    // Tertiary = embedded card tabs (Detailed / Summary / Tree / Inventory)
    tertiary: {
      tab: {
        borderRadius: 0,
        px: 3,
        py: 2,
        fontSize: "sm",
        borderBottom: "2px solid",
        borderColor: "transparent",
        _hover: {
          color: "text.primary",
          borderColor: "border.hover",
        },
        _selected: {
          color: "text.primary",
          borderColor: "border.focus",
        },
      },
      tablist: {
        borderBottom: "1px solid",
        borderColor: "border.default",
        pb: 1,
        overflowX: "auto",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};
