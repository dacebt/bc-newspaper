import type { ComponentStyleConfig } from "@chakra-ui/react";

export const table: ComponentStyleConfig = {
  baseStyle: {
    th: {
      color: "text.tertiary",
      textTransform: "none",
      fontWeight: "semibold",
      fontSize: "sm",
      borderBottomColor: "border.default",
      letterSpacing: "normal",
    },
    td: {
      color: "text.secondary",
      borderBottomColor: "border.default",
    },
  },
  variants: {
    simple: {
      tbody: {
        tr: {
          _hover: {
            bg: "surface.overlay",
          },
        },
      },
    },
  },
};

