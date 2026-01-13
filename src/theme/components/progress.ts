import type { ComponentStyleConfig } from "@chakra-ui/react";

export const progress: ComponentStyleConfig = {
  baseStyle: {
    filledTrack: {
      bg: "#4cc9f0", // Cyan (matches primary/status.info)
    },
    track: {
      bg: "surface.overlay",
    },
  },
};
