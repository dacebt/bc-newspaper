import type { ComponentStyleConfig } from "@chakra-ui/react";

export const badge: ComponentStyleConfig = {
  baseStyle: {
    px: 2,
    py: 0.5,
    borderRadius: "sm",
    fontSize: "xs",
    fontWeight: "normal",
    border: "1px solid",
    borderColor: "border.default",
    bg: "transparent",
    color: "text.secondary",
  },
  variants: {
    // Tier badge - minimal, uses tier color
    tier: {
      bg: "transparent",
      borderColor: "currentColor",
      fontWeight: "medium",
    },
    // Subtle info badge - minimal visual weight
    subtle: {
      bg: "surface.overlay",
      borderColor: "border.default",
      color: "text.tertiary",
    },
    statusInfo: {
      bg: "status.infoBg",
      borderColor: "status.infoBorder",
      color: "status.info",
      fontWeight: "medium",
    },
    statusSuccess: {
      bg: "status.successBg",
      borderColor: "status.successBorder",
      color: "status.success",
      fontWeight: "medium",
    },
    statusError: {
      bg: "status.errorBg",
      borderColor: "status.errorBorder",
      color: "status.error",
      fontWeight: "medium",
    },
    // Primary action/emphasis - teal-like using theme tokens
    primary: {
      bg: "rgba(76, 201, 240, 0.15)", // Using status.info colors
      borderColor: "rgba(76, 201, 240, 0.4)",
      color: "#4cc9f0",
      fontWeight: "medium",
    },
    // Secondary emphasis - purple-like
    secondary: {
      bg: "rgba(168, 85, 247, 0.15)", // Purple with theme opacity pattern
      borderColor: "rgba(168, 85, 247, 0.4)",
      color: "#a855f7",
      fontWeight: "medium",
    },
    // Warning/destructive - pink using theme warning tokens
    warning: {
      bg: "status.warningBg",
      borderColor: "status.warningBorder",
      color: "status.warning",
      fontWeight: "medium",
    },
  },
  defaultProps: {
    variant: "subtle",
  },
};

