import type { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const card: ComponentMultiStyleConfig = {
  parts: ["container", "header", "body", "footer"],
  baseStyle: {
    container: {
      bg: "surface.elevated",
      border: "1px solid",
      borderColor: "border.default",
      borderRadius: "md",
      transition: "all 0.2s",
      _hover: {
        borderColor: "border.hover",
      },
    },
  },
  variants: {
    elevated: {
      container: {
        bg: "surface.overlay",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
      },
    },
    interactive: {
      container: {
        cursor: "pointer",
        _hover: {
          borderColor: "border.focus",
          transform: "translateY(-1px)",
          boxShadow: "lg",
        },
      },
    },
  },
  defaultProps: {
    variant: "elevated",
  },
};

