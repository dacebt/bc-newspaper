import { Box, type BoxProps } from '@chakra-ui/react';
import { getTextureLayers } from '../styles/paperTexture';

interface PaperWrapperProps extends BoxProps {
  children: React.ReactNode;
}

/**
 * PaperWrapper - The outer container with background, border, and shadow
 */
export function PaperWrapper({ children, ...props }: PaperWrapperProps) {
  return (
    <Box
      bg="paper.bg"
      color="paper.ink"
      maxW="1200px"
      w="100%"
      p={{ base: 6, md: 10 }}
      border="1px"
      borderColor="paper.rule"
      boxShadow="paper"
      position="relative"
      {...props}
    >
      {children}
    </Box>
  );
}

/**
 * PaperTextureLayer - Absolute overlay with texture effects
 */
export function PaperTextureLayer() {
  const textureStyles = getTextureLayers();

  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      opacity={textureStyles.opacity}
      mixBlendMode={textureStyles.mixBlendMode as 'multiply' | 'soft-light' | 'normal'}
      backgroundImage={textureStyles.backgroundImage.join(', ')}
      backgroundSize={textureStyles.backgroundSize.join(', ')}
      backgroundRepeat={textureStyles.backgroundRepeat.join(', ')}
      borderRadius="inherit"
      zIndex={0}
    />
  );
}

/**
 * PaperContent - Content container that sits above the texture
 */
export function PaperContent({ children }: { children: React.ReactNode }) {
  return (
    <Box position="relative" zIndex={1}>
      {children}
    </Box>
  );
}
