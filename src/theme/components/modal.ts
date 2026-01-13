import type { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const modal: ComponentMultiStyleConfig = {
  parts: ["overlay", "dialog", "header", "body", "footer", "closeButton"],
  baseStyle: {
    overlay: {
      bg: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(4px)",
    },
    dialog: {
      bg: "surface.base",
      border: "1px solid",
      borderColor: "border.default",
      borderRadius: "md",
    },
    header: {
      color: "text.primary",
      borderBottom: "1px solid",
      borderBottomColor: "border.default",
    },
    body: {
      color: "text.secondary",
    },
    footer: {
      borderTop: "1px solid",
      borderTopColor: "border.default",
    },
    closeButton: {
      color: "text.secondary",
      _hover: {
        color: "text.primary",
        bg: "surface.overlay",
      },
    },
  },
};

