import type { ComponentStyleConfig } from "@chakra-ui/react";

export const checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      borderColor: "border.default",
      _checked: {
        bg: "#a855f7", // Purple (matches secondary variant)
        borderColor: "#a855f7",
        color: "bw.0",
        _hover: {
          bg: "rgba(168, 85, 247, 0.8)",
          borderColor: "rgba(168, 85, 247, 0.8)",
        },
      },
      _hover: {
        borderColor: "border.hover",
      },
    },
  },
};
